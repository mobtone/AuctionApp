import {useState} from 'react';
import './CreateAuctionForm.css'
import { createAuction } from '../../services/AuctionService';
import { getUserIdFromToken } from '../../utils/tokenHelper';
//import { UserContext } from '../../contexts/UserProvider';

const CreateAuctionForm = () => {
    

    const [formData, setFormData] = useState({

        auctionName: '',
        auctionDescription: '',
        startingPrice: '',
        openingTime: '',
        closingTime: ''

    });

    const handleSubmit = async (e) => {
        e.preventDefault(); //förhindrar att formuläret lämnas tomt
       
        if(new Date(formData.closingTime) <= new Date(formData.openingTime)){
            alert("Stängningstiden måste vara senare än öppningstiden")
            return;
        }
        try{

            
            const dataToSend = {
                ...formData, 
                startingPrice:parseFloat(formData.startingPrice)
            };

        await createAuction(dataToSend);
        alert("Auktionen har skapats");

        setFormData({
                auctionName: '',
                auctionDescription: '',
                startingPrice: '',
                openingTime: '',
                closingTime: ''
        });
    } catch (error) {
        alert(error.message);
    }
}

    return (
        <>
         <div className="createAuctionForm">
            <h2>Skapa ny auktion</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Titel" value={formData.auctionName} onChange={(e) => setFormData({ ...formData, auctionName: e.target.value })} required />
                <textarea placeholder="Beskrivning" value={formData.auctionDescription} onChange={(e) => setFormData({ ...formData, auctionDescription: e.target.value })} required />
                <input type="number" placeholder="Startpris" value={formData.startingPrice} onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })} required />
                <input type="datetime-local" placeholder="Öppningstid" value={formData.openingTime} onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })} required />
                <input type="datetime-local" placeholder="Stängningstid" value={formData.closingTime} onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })} required />
                <button type="submit">Skapa auktion</button>
            </form>
        </div>
        </>
    )
}

export default CreateAuctionForm;