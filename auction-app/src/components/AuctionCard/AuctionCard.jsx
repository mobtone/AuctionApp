import './AuctionCard.css'
import { Link } from 'react-router-dom';
import { AuctionContext } from '../../contexts/AuctionProvider';
import { useState, useContext } from 'react';

const AuctionCard = ({auction, showEditOptions = false}) =>{

    const {removeAuction, bids, fetchAuctionById } = useContext(AuctionContext);
    const [loading, setLoading] = useState(false);

    const checkBids = async () =>{
        await fetchAuctionById(auction.auctionId);
        return bids && bids.length > 0;
    };

    const handleDelete = async () => {
        try{
            setLoading(true);
            const hasBids = await checkBids();

            if (hasBids) {
                alert("Kan inte ta bort auktion med bud");
                setLoading(false);
                return;
            }
            if (window.confirm("Är du säker på att du vill ta bort auktionen?")){
                await removeAuction(auction.auctionId);
                alert("Auktionen har tagits bort");
            }
        } catch (error){
            alert(`Fel vid borttagning av auktion: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }
    
    return(
        <>
        <div className ="auctionCard">
            <h2>{auction.auctionName}</h2>
            <p>{auction.auctionDescription}</p>
            <p>Startpris: {auction.startingPrice} kr</p>
            <p><b>Öppnar:</b> <br/> {new Date(auction.openingTime).toLocaleDateString()} kl: {new Date(auction.openingTime).toLocaleTimeString()}</p>
            
            <p><b>Stänger:</b><br/> {new Date(auction.closingTime).toLocaleDateString()} kl: {new Date(auction.closingTime).toLocaleTimeString()}</p>

            <div className="auctionCardLinks">
            <Link to = {`/auctions/${auction.auctionId}`}>Visa Detaljer</Link>

            {showEditOptions && (
                <>
                <Link to={`/edit-auction/${auction.auctionId}`}>Redigera</Link>
                <button onClick = {handleDelete} disabled={loading} className ={loading?"disabled" : ""}>
                    {loading ? "Bearbetar..." : "Ta bort"}</button></>
            )}
            </div>
            </div>
            </>
    );
}

export default AuctionCard;