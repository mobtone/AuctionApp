import {useContext, useEffect} from 'react';
import { AuctionContext } from '../../contexts/AuctionProvider';
import Header from '../../components/Header/Header';
import AuctionCard from '../../components/AuctionCard/AuctionCard';
import UserBidsList from '../../components/UserBidsList/UserBidsList';

const UserAuctions = () =>{

    const {userAuctions, fetchUserAuctions} = useContext(AuctionContext);

    useEffect(() =>{
        fetchUserAuctions();
    }, [fetchUserAuctions]);

    return (
        <>
        <Header/>
        <div className="userAuctions">

        <h2>Mina auktioner</h2>
        {(!userAuctions || userAuctions.length === 0) ? (
                    <p>Du har inga auktioner</p>
                ) : (
        <div className="auctionsList">

            {userAuctions.map((auction) =>
            ( <AuctionCard key={auction.auctionId} auction = {auction} 
            showEditOptions={true}/> ))}
             </div> 
                )}
                <UserBidsList/>
        </div>
      
        </>
    );
}
export default UserAuctions;