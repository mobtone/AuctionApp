import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuctionContext } from '../../contexts/AuctionProvider';
import { UserContext } from '../../contexts/UserProvider';
import Header from '../../components/Header/Header';
import AuctionDetails from '../../components/AuctionDetails/AuctionDetails';
import BidList from '../../components/BidList/BidList';
import PlaceBidForm from '../../components/PlaceBidForm/PlaceBidForm';

const Auction = () => {
    const { id } = useParams();
    const { fetchAuctionById, currentAuction, bids } = useContext(AuctionContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if(id){
        fetchAuctionById(id)};
    }, [id, fetchAuctionById]);

    if (!currentAuction) 
        return (<><Header/>
                <p>Auktionen kunde inte hittas.</p>
                </>

    );
    const isCreator = user && currentAuction.username === user.username;
    const isLoggedIn = !!user;


    return (
        <div className="auction-page">
            <Header />
          
            <AuctionDetails auction={currentAuction} />
            
            {isLoggedIn && !isCreator && (
                <PlaceBidForm auction={currentAuction} auctionId={id}/>
            )}

            <BidList bids={bids} />

            {!isLoggedIn && (
                <div className="login-prompt">
                    <p>Logga in för att lägga bud på denna auktion</p>
        </div>
    )}
    </div>
    )
};

export default Auction;

// import { useParams, useEffect } from 'react';
// import { useContext } from 'react';
// import { AuctionContext } from '../../contexts/AuctionProvider';
// import Header from '../../components/Header/Header';
// import AuctionDetails from '../../components/AuctionDetails/AuctionDetails';
// import BidList from '../../components/BidList/BidList';
// import PlaceBidForm from '../../components/PlaceBidForm/PlaceBidForm';
// import { AuthorizationContext } from '../../contexts/AuthorizationProvider';

// const Auction = () => {
//     const { auctionId } = useParams(); // Hämta dynamiskt ID från URL
//     const { fetchAuctionById, currentAuction, bids } = useContext(AuctionContext);
//     const {user} = useContext(AuthorizationContext);

//     useEffect(() => {
//             fetchAuctionById(auctionId); // Hämta auktionen baserat på ID
//     }, [id]);

//     if (!currentAuction) return <p>Auktionen kunde inte hittas.</p>;

//     const isCreator = currentAuction.username === user.username;

//     return (
//         <div className="auction-page">
//             <Header />
//             <AuctionDetails auction={currentAuction} />
            
//             {!isCreator && user &&(
//                 <PlaceBidForm auction={currentAuction} />
//             )}

//             <BidList bids={bids} />
//         </div>
//     );
// };

// export default Auction;


// // import { useNavigate } from 'react-router-dom';
// // import { useContext, useEffect, useState, useParams} from 'react';
// // import AuctionDetails from '../../components/AuctionDetails/AuctionDetails';
// // import BidList from '../../components/BidList/BidList';
// // import PlaceBidForm from '../../components/PlaceBidForm/PlaceBidForm';
// // import { AuctionContext } from '../../contexts/AuctionProvider';
// // import { AuthorizationContext } from '../../contexts/AuthorizationProvider';
// // import Header from '../../components/Header/Header';
// // // import { getAuctionById, getBidsByAuctionId } from '../../services/AuctionService';

// // const Auction = () => {
// //     const { id } = useParams();
// //     const authContext = useContext(AuthorizationContext);
// //     const [auction, setAuction] = useState(null);
// //     const {removeAuction} = useContext(AuctionContext);
// //     const [bids, setBids] = useState();
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             //hämtar auktionsdata via AuctionService
// //             const auctionData = await fetchAuctionById(id);
// //             console.log("Auktionsdata:", auctionData); // För felsökning
// //             setAuction(auctionData);
            
// //             //hämtar bud om auktionen är öppen
// //             if (new Date(auctionData.closingTime) > new Date()) {
// //                 const bidData = await getBidsByAuctionId(id);
// //                 setBids(bidData);
// //             }
// //         };
        
// //         fetchData();
// //     }, [id]);

// //     if (!auction) return null;

// //     //kontrollerar om auktionen är öppen
// //     const isOpen = new Date(auction.closingTime) > new Date();
    
// //     //kontrollerar om användaren är skaparen av auktionen
// //     const isCreator = user && auction && user.username === auction.username;

// //     //för att veta om priset ska kunna ändras kontrolleras om det finns bud på auktionen
// //     const hasBids = bids && bids.length > 0;

// //     const handleEditAuction = () =>{
// //         navigate(`/edit-auction/${currentAuction.auctionId}`);
// //     };

// //     const handleDeleteAuction = async () =>{
// //         if (hasBids) {
// //             alert("Du kan inte ta bort en auktion som har bud");
// //             return;
// //         }
        
// //         if(window.confirm("Är du säker på att du vill ta bort auktionen?")){
// //             try {
// //                 await removeAuction(auction.auctionId, user.token);
// //                 alert("Auktionen har tagits bort");
// //                 navigate('/');
// //             }
// //             catch (error){
// //                 console.error("Fel vid borttagning av auktion:", error);
// //                 alert("Kunde inte ta bort auktionen");
// //             }
// //         }
// //     }

// //     return (
// //         <div className="auction-page">
// //             {authContext && authContext.token && <Header/>}
// //             <AuctionDetails auction={auction} />

// //             {isCreator && (
// //                 <div className="auction-auctions">
// //                     <button className="editButton"
// //                     onClick={handleEditAuction}>Uppdatera auktion</button>
// //                     <button className="deleteButton"
// //                     onClick={handleDeleteAuction}
// //                     disabled={hasBids}>Ta bort auktion</button>
// //                 {hasBids && ( <p className="infoText">Auktioner med bud kan inte tas bort</p>
// //                 )}
// //                 </div>
// //             )}

// //             {isOpen ? (
// //                 <div className="bid-section">
// //                     <BidList bids={bids} />
                    
// //                     {user && !isCreator && (
// //                         <PlaceBidForm auction={auction} />
// //                     )}
// //                 </div>
// //             ) : (
// //                 <div className="winning-bid">
// //                     <h3>Högsta vinnande budet: {auction.bidAmount || auction.startingPrice} kr</h3>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default Auction;