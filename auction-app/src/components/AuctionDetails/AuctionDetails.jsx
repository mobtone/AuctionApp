import './AuctionDetails.css';

const AuctionDetails = ({ auction }) => {

    const now = new Date();
    const openingTime = new Date(auction.openingTime);
    const closingTime = new Date(auction.closingTime);

    const isOpen = now >= openingTime && now <= closingTime;
    const willOpen = now < openingTime;

    const formatDate = (dateString) =>{
        const date = new Date(dateString);
        return `${date.toLocaleDateString('sv-SE')}
        kl: ${date.toLocaleTimeString('sv-SE')}`;
    };

  return (
    <div className="auction-details">
      <h2>{auction.auctionName}</h2>
      <p>{auction.auctionDescription}</p>
      <p><strong>Startpris:</strong> {auction.startingPrice} kr</p>
      
      {willOpen && (
        <p><strong>Öppnar:</strong> {formatDate(auction.openingTime)}</p>
      )}
      
      {isOpen && (
        <>
          <p><strong>Status:</strong> Öppen</p>
          <p><strong>Stänger:</strong> {formatDate(auction.closingTime)}</p>
        </>
      )}
      
      {now > closingTime && (
        <p><strong>Status:</strong> Stängd</p>
      )}
      
      <p><strong>Skapad av:</strong> {auction.username}</p>
    </div>
  );
};

export default AuctionDetails;