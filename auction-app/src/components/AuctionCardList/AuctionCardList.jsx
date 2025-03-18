import {useContext} from 'react';
import AuctionCard from '../AuctionCard/AuctionCard';
import { AuctionContext } from '../../contexts/AuctionProvider';

const AuctionCardList = () => {

    const {auctions} = useContext(AuctionContext);

    return (
        <div>
            {auctions.map((auction) => (
                <AuctionCard key ={auction.auctionId}
                auction = {auction} />
            ))}</div>
    )
};

export default AuctionCardList;