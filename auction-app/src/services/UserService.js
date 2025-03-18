//skapa en användare
//Uppdatera en användare
//Logga in en användare
//En användare ska verifieras med jwt-token
import { jwtDecode } from "jwt-decode";

const url = 'http://localhost:5120';

export const getUsers= async () => {

    const response = await fetch(`${url}/api/GetAllUsers`);

    return await response.json();
}


export const loginUser = async(username, password) => {
    try{
        const response = await fetch(`${url}/api/Login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
        const data = await response.json();

        if (data.token) {
            // Spara token och eventuell annan användarinformation
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);

            const decodedToken = jwtDecode(data.token);

            const userId = decodedToken.UserId || decodedToken.nameid || decodedToken.sub;

            localStorage.setItem('userId', userId);

            return {
            ...data,
            userId: userId
        };

        } else {
            throw new Error("Ingen token returnerades");
        }
    } catch (error) {
        console.error("Inloggningsfel:", error);
        throw error;
    }
}
    export const logoutUser = () => {
        localStorage.removeItem('token');
    };

    export const registerUser = async (username, userpassword) => {
        const response = await fetch (`${url}/api/registerUser?username=${encodeURIComponent(username)}&userpassword=${encodeURIComponent(userpassword)}`, {
            method: 'POST',
        });

        return response.ok;
    };

    export const updateUser = async ({ oldPassword, newPassword }) => {
        try {
            const token = localStorage.getItem("token"); // Hämta sparad token från localStorage
    
            const response = await fetch(`${url}/api/UpdateUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Skicka token här
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                }),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Serverfel: ${errorText}`);
                throw new Error("Fel vid uppdatering av lösenord");
            }
    
            return await response.json();
        } catch (error) {
            console.error("Fel vid anrop till UpdateUser:", error);
            throw error;
        }
    };

//     export const updateUser = async (oldPassword, newPassword, token) =>{
//         try{
//         const response = await fetch (`${url}/api/UpdateUser`, {
//             method: "POST",
//             headers: { 
//                 "Accept": "application/json",
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//                 oldPassword,
//                 newPassword,
//             }),
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error(`Serverfel: ${errorText}`);
//             throw new Error("Fel vid uppdatering av lösenord");
//         }

//         return await response.json();

//     } catch (error) {
//         console.error("Fel vid anrop till UpdateUser:", error);
//         throw error;
//     }
// }