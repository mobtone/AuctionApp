import './BidList.css';

const BidList = ({ bids }) => {
    if (!bids || bids.length === 0) {
        return <p className="no-bids">Inga bud har lagts på denna auktion ännu.</p>;
    }

    // Sortera buden i fallande ordning (högsta budet först)
    const sortedBids = [...bids].sort((a, b) => b.bidAmount - a.bidAmount);

    return (
        <div className="bid-list">
            <h3>Budhistorik</h3>
            <table>
                <thead>
                    <tr>
                        <th>Budgivare</th>
                        <th>Belopp</th>
                        <th>Tidpunkt</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedBids.map((bid) => (
                        <tr key={bid.bidId}>
                            <td>{bid.username}</td>
                            <td>{bid.bidAmount} kr</td>
                            <td>{new Date(bid.bidTime).toLocaleString('sv-SE')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BidList;