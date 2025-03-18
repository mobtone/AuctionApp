import { getAuctions, getAuctionById, getBidsByAuctionId, getUserAuctions, deleteAuction, placeBid, getUserBids, deleteBid } from "../services/AuctionService";
import {useState, useContext, createContext} from 'react';
import { UserContext } from "./UserProvider";

export const AuctionContext = createContext();

const AuctionProvider = ({children}) =>{

    const [auctions, setAuctions] = useState([]);
    const [currentAuction, setCurrentAuction] = useState(null);
    const [currentAuctionId, setCurrentAuctionId] = useState(null);
    const [bids, setBids] = useState([]);
    const [userBids, setUserBids] =useState([]);
    const [userAuctions, setUserAuctions] = useState([]);
    
    const authContext = useContext(UserContext);
    const token = authContext ? authContext.token : null;
    const user = authContext ? authContext.user : null;

    const fetchUserAuctions= async () =>{
        if(!token){
            console.error("Ingen token tillgänglig");
            setUserAuctions([]);
        }
        try{
            const result = await getUserAuctions(token);
            setUserAuctions(result);
        }
        catch (error){
            console.error("Kunde inte hämta användarens auktioner", error);
            setUserAuctions([]);
        }
    };


    const fetchUserBids = async (token) =>{
        try{
            const bids = await getUserBids(token);
            setUserBids(bids);
        } catch (error) {
            console.error("Fel vid hämtning av användarens bud:", error);
        }
    }
    const removeBid = async (bidId, token) =>{
        try {
            await deleteBid(bidId, token);
            fetchUserBids(token);
        } catch (error) {
            console.error("Fel vid borttagning av bud:", error);
        }
    }
    // const newAuction = async (auctionData) => {
    //     const token = localStorage.getItem('token');

    //     const result = await createAuction(auctionData, token);
    //     //uppdaterar auktionslistan efter att en auktion har skapats
    //     setAuctions(prev => [...prev, result]);
    //     return result;
        
    // }

    const searchAuctions = async (keyword) =>{
        const result = await getAuctions(keyword);
        setAuctions(result);
    };

    const fetchAuctionById = async (id) =>{
        const auctionData = await getAuctionById(id);
        setCurrentAuction(auctionData);
        setCurrentAuctionId(id)
    
        if (new Date(auctionData.closingTime) > new Date()){
            const bidData = await getBidsByAuctionId(id);
            setBids(bidData);
        }
        else{
            setBids([]); //visa inga bud om auktionen är stängd
        }
    };

    const makeBid = async(amount) => {
        if (!currentAuctionId) {
            throw new Error("Hittar inte auktionens id");
        } try {
            const token = localStorage.getItem('token');
            const response = await placeBid(currentAuctionId, amount, token);

            await fetchAuctionById(currentAuctionId);


            return response;
        } catch (error){
            console.error("Fel vid budläggning:", error);
            throw error;
        }
};
    const removeAuction = async (auctionId) =>{
        if(token) {
            try{
            const result = await deleteAuction(auctionId, token);
            await searchAuctions("");//ev ta bort denna
            return result;
        }
        catch (error){
            console.error("Fel vid borttagning:", error);
            throw error;
        }
    }
};

    const updateUserAuctions = async (auctionId, auctionData) => {
if (!token){
    console.error("Ingen token tillgänglig");
    return false; 
}
try {
    await updateAuction(auctionId, auctionData, token);
    await fetchUserAuctions();
    return true;
} catch (error) {
    console.error("Fel vid uppdatering av auktion:", error);
    throw error;
    }
}

     const isAuctionCreator = (auction) => {
    return user && auction && user.username === auction.username;
    };

    return(
        <AuctionContext.Provider value = {{
            auctions, 
            currentAuction, 
            bids, 
            searchAuctions, 
            fetchAuctionById,
            removeAuction, 
            fetchUserAuctions,
            isAuctionCreator, 
            userAuctions,
            updateUserAuctions, 
            removeAuction,
            makeBid,
            fetchUserBids,
            removeBid}}>
            {children}
            </AuctionContext.Provider>
    );
}
export default AuctionProvider;
        
    