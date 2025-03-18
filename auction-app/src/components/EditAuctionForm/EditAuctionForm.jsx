import {useState, useEffect, useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { AuctionContext } from '../../contexts/AuctionProvider';
import Header from '../Header/Header';
//import './EditAuctionForm.css';

const EditAuctionForm = () => {
    const {auctionId} = useParams();
    const navigate = useNavigate();
    const {updateUserAuction, fetchAuctionById, currentAuction, bids} = useContext(AuctionContext);

    const [formData, setFormData] = useState({
        auctionName: '',
        auctionDescription: '',
        startingPrice: '',
        openingTime: '',
        closingTime: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAuction = async () =>{
            try{
                await fetchAuctionById(auctionId);
                setLoading(false);
            } catch (error) {
                setError ("Kunde inte hämta auktionen");
                setLoading(false);
            }
        };
        loadAuction();
    }, [auctionId, fetchAuctionById]);

    useEffect(()=>{
        if (currentAuction){
            const formatDate = (dateString)=>{
                const date = new Date(dateString);
                return date.toISOString().slice(0,16) //ger formatet YYY-mm-dd-t-HH:MM som i apit
            
            };

            setFormData({
                auctionName: currentAuction.auctionName || '',
                auctionDescription: currentAuction.auctionDescription || '',
                startingPrice: currentAuction.startingPrice || '',
                openingTime: formatDate(currentAuction.openingTime) || '',
                closingTime: formatDate(currentAuction.closingTime) || ''
            });
        }
    }, [currentAuction]);

    const hasBids = bids && bids.length > 0;

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if (new Date(formData.closingTime) <= new Date (formData.openingTime)){
    alert("Stängningstiden måste vara senare än öppningstiden");
    return;
        }

        try{
            setLoading(true);

            //här skapas formData-objekt och pris exkluderas om auktionen redan har bud
            const dataToUpdate = {
                auctionName: formData.auctionName,
                auctionDescription: formData.auctionDescription,
                openingTime: formData.openingTime,
                closingTime: formData.closingTime
            };
            if (!hasBids){
                dataToUpdate.startingPrice = parseFloat(formData.startingPrice);
            }

            await updateUserAuction(auctionId, dataToUpdate);
            alert("Auktionen har uppdaterats");
            navigate("/my-auctions");
            } catch (error) {
                setError(`Fel vid uppdatering: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }

        if (loading) return <div>Laddar...</div>;
        if (error) return <div>Error: {error}</div>;

        return(
            <>
            <Header/>
            <div className="form-group">
    <label htmlFor="auctionName">Titel</label>
    <input 
        id="auctionName"
        type="text" 
        value={formData.auctionName} 
        onChange={(e) => setFormData({...formData, auctionName: e.target.value})} 
        required 
    />
</div>

<div className="form-group">
    <label htmlFor="auctionDescription">Beskrivning</label>
    <textarea 
        id="auctionDescription"
        value={formData.auctionDescription} 
        onChange={(e) => setFormData({...formData, auctionDescription: e.target.value})} 
        required 
    />
</div>

// Startpris ska vara inaktiverat endast om det finns bud
<div className="form-group">
    <label htmlFor="startingPrice">Startpris</label>
    <input 
        id="startingPrice"
        type="number" 
        value={formData.startingPrice} 
        onChange={(e) => setFormData({...formData, startingPrice: e.target.value})} 
        disabled={hasBids} 
        required 
    />
    {hasBids && <p className="note">Priset kan inte ändras när auktionen har bud</p>}
</div>
            </>
        )
    }

    export default EditAuctionForm;