import { useContext, useEffect } from "react";
import { AuctionContext } from "../../contexts/AuctionProvider";
import { UserContext } from "../../contexts/UserProvider";

const UserBidsList = () =>{

    const{user} = useContext(UserContext);
    const {userBids, fetchUserBids , removeBid } = useContext(AuctionContext);

    useEffect(() =>{
        if (user && user.token){
            fetchUserBids(user.token);
        }
    }, [user]);

    const handleDeleteBid = async (bidId, auctionClosingTime) =>{
        const now= new Date();
        const closingTime = new Date(auctionClosingTime);

        if (now > closingTime) {
            alert("Du kan inte ta bort ett bud från en avslutad auktion");
            return;
        }
        try{
            await removeBid(bidId, user.token);
            alert("Budet har tagits bort");
        } catch (error) {
            alert(error.message || "Kunde inte ta bort budet");
        }
    }

    if (!user || user.token) return <p>Logga in för att se dina bud</p>;

    return (
        <div className="userBids">

            <h2>Mina bud</h2>
            {userBids.length === 0 ? (
                <p>Du har inga aktiva bud</p>

            ) : ( 
                <ul>
                    {userBids.map((bid) => (
                        <li key={bid.bidId}>

                            <p>Auktion: {bid.auctionTitle}</p>
                            <p>Budbelopp: {bid.amount} kr</p>
                            <button onClick={() => handleDeleteBid(bid.bidId, bid.auctionClosingTime)}>Ta bort bud</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default UserBidsList;