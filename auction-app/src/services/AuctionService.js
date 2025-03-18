//Skapa auktioner
//Uppdatera en auktion ( titel, beskrivning, ett pris och start- och slutdatum samt vilken användare som skapat den)
//Söka på auktioner
//Radera en auktion om det inte finns några bud
//Uppdatera auktionen (men inte ändra pris om det finns bud)
// http://localhost:5120/index.html


const url = 'http://localhost:5120';

export const getAuctions = async (keyword) => {
   
    const response = await fetch (`${url}/api/Search-Auctions?keyword=${encodeURIComponent(keyword)}`);
    
    return await response.json();
};

export const getAuctionById = async (auctionId) => {

    const response = await fetch(`${url}/api/SearchAuctionById/${auctionId}`);
    return await response.json();

};  

export const createAuction = async (auctionData) =>{

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token){
    throw new Error("Du måste vara inloggad");
    }

    //const userId = getUserIdFromToken();
    if(!userId){
        throw new Error("Användar-ID saknas");
    }
    //lägger till userid i auktionsdatan
    const dataWithUserId = {
        ...auctionData,
        userId: parseInt(userId)
    };
    try{
    const response = await fetch (`${url}/api/Auction/Create-Auction`, {
        method: "POST",
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dataWithUserId),
    });
    if(!response.ok){
        const errorText = await response.text();
            throw new Error(errorText || "Något gick fel vid skapande av auktion");
    }
        // Kontrollera om svaret är tomt
        const responseBody = await response.text();
        if (!responseBody) {
            throw new Error("Tomt svar från servern");
        }

        return JSON.parse(responseBody); // Tolka svaret som JSON
    } catch (error) {
        console.error("Fel vid skapande av auktion:", error);
        throw error;
    }
};

export const updateAuction = async (auctionId, auctionData, token) =>{
    const response = await fetch (`${url}/api/Auction/UpdateAuction`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify({auctionId, ...auctionData}),
    });
    return await response.json();
};

export const deleteAuction = async (auctionId, token) => {
    const response = await fetch(`${url}/api/Auction/${auctionId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
};

export const getBidsByAuctionId = async (auctionId) => {
    const response = await fetch(`${url}/api/Bids/ViewBidsOnAuction?auctionID=${auctionId}`);
    return await response.json();
};

export const placeBid = async (auctionId, amount, token) => {
    if (!token) {
        throw new Error("Du måste vara inloggad för att lägga bud");
    }
    try{
    const response = await fetch(`${url}/api/MakeBid`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
      body: JSON.stringify({
                auctionID: parseInt(auctionId),
                amount: parseInt(amount)
            })
    });
    const data = await response.json();
        
    if (!response.ok) {
        throw new Error(data.message || "Ett fel uppstod vid budgivning");
    }
    
    return data;
} catch (error) {
    console.error("Fel vid budgivning:", error);
    throw error;
}
};

export const getUserAuctions = async (token) => {
    const response = await fetch(`${url}/api/User/GetUserAuctions`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return Array.isArray(data) ? data : [];
};

export const getUserBids =async(token) =>{
   try{
    const response = await fetch('/api/GetMyBids', {
        method: 'GET',
        headers: {
            'Authorization':`Bearer ${token}`
        }
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Kunde inte hämta dina bud");
    }
    return await response.json();
   } catch (error) {
    console.error("Fel vid hämtning av bud:", error);
    throw error;
   }
}

   export const deleteBid = async (bidId, token) => {
    if (!token) {
        throw new Error("Du måste vara inloggad för att ta bort ett bud");
    }

    try {
        const response = await fetch(`/api/DeleteBid/${bidId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Kunde inte ta bort budet");
        }

        return await response.json();
    } catch (error) {
        console.error("Fel vid borttagning av bud:", error);
        throw error;
    }
};

