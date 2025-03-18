import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserProvider';
import { AuctionContext } from '../../contexts/AuctionProvider';
import './PlaceBidForm.css';

const PlaceBidForm = () => {
    const [amount, setAmount] = useState("");
    const { user } = useContext(UserContext);
    const { currentAuction, makeBid, currentAuctionId } = useContext(AuctionContext);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    //gör att formuläret inte visas om användaren inte är inloggad eller är auktionsskaparen
    if (!user || user.username === currentAuction.username) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            //använder makeBid för att koppla auctionId till rätt auktion
            const response = await makeBid(parseFloat(amount));
            
            if (response.success) {
                setAmount("");
                setError("");
            } else {
                setError(response.message || "Kunde inte lägga budet");
            }
        } catch (error) {
            setError(error.message || "Fel vid budläggning");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="placeBidForm">
            <h3>Lägg ett bud</h3>
            <form onSubmit={handleSubmit}>
                <div className="bidForm">
                    <label htmlFor="bidAmount">Ditt bud</label>
                    <input
                        id="bidAmount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Ange belopp"
                        min={currentAuction.currentHighestBid || currentAuction.startingPrice + 1}
                        required
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Lägger bud..." : "Lägg Bud"}
                    </button>
                    {error && <p className="error">{error}</p>}
                </div>
            </form>
        </div>
    );
};

export default PlaceBidForm;


// import { useContext, useState } from 'react';
// //import{userParams} from 'react-router-dom'
// import { UserContext } from '../../contexts/UserProvider';
// import { AuctionContext } from '../../contexts/AuctionProvider';

// const PlaceBidForm = () => {
//     const [amount, setAmount] = useState("");
//     const { user } = useContext(UserContext);
//     const {currentAuction, makeBid, currentAuctionId} = useContext(AuctionContext);
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [success] = useState(false);

//     //gör så att formuläret inte visas om användaren inte är inloggad
//     if (!user || user.username === currentAuction.username) return null;

//        // Beräkna minimumpris för budet
//        const minimumBidAmount = auction.currentHighestBid 
//        ? auction.currentHighestBid + 1 
//        : auction.startingPrice + 1;

//    const handleSubmit = async (e) => {
//        e.preventDefault();
//        setError("");
//     //    setSuccess(false);
//        setLoading(true);

//        try {
//         //använder makeBid kopplar ihop auktionen till auctionId
//         const response = await makeBid(parseFloat(amount));
        
//         if (response.success) {
//             setAmount("");
//             setError("");
//         } else {
//             setError(response.message || "Kunde inte lägga budet");
//         }
//     } catch (error) {
//         setError(error.message || "Fel vid budläggning");
//     } finally {
//         setLoading(false);
//     }
// };

// //        const bidAmount = parseFloat(amount);

// //        // Validera budbelopp på klientsidan
// //        if (bidAmount <= (auction.currentHighestBid || auction.startingPrice)) {
// //            setError('Budet måste vara högre än det nuvarande högsta budet eller startpriset.');
// //            setLoading(false);
// //            return;
// //        }

// //        // Validera att auktionen inte har stängt (för att undvika onödiga API-anrop)
// //        const now = new Date();
// //        const closingTime = new Date(auction.closingTime);
       
// //        if (now > closingTime) {
// //            setError('Auktionen har avslutats.');
// //            setLoading(false);
// //            return;
// //        }

// //        try {
// //            const response = await makeBid(auctionId, bidAmount);
           
// //            if (response.success) {
// //                setAmount("");
// //                setSuccess(true);
// //                setError("");
// //            } else {
// //                setError(response.message || "Kunde inte lägga budet");
// //            }
// //        } catch (error) {
// //            setError(error.message || "Fel vid budläggning");
// //        } finally {
// //            setLoading(false);
// //        }
// //    };

//    return (
//        <div className="placeBidForm">
//            <h3>Lägg ett bud</h3>
//            {success && <div className="success-message">Ditt bud har lagts!</div>}
//            <form onSubmit={handleSubmit}>
//                <div className="bidForm">
//                    <label htmlFor="bidAmount">Ditt bud</label>
//                    <input
//                        id="bidAmount"
//                        type="number"
//                        value={amount}
//                        onChange={(e) => setAmount(e.target.value)}
//                        placeholder="Ange belopp"
//                        min={minimumBidAmount}
//                        required
//                        disabled={loading}
//                    />
//                    <button type="submit" disabled={loading}>
//                        {loading ? "Lägger bud..." : "Lägg Bud"}
//                    </button>
//                    {error && <p className="error">{error}</p>}
//                </div>
//            </form>
//        </div>
//    );
// };

// export default PlaceBidForm;