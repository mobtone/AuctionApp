//hjälp-fil för att kunna extrahera userid från token
import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const decoded = jwtDecode(token);
      // Returnera användar-ID oavsett vilken claim som används
      return decoded.nameid || decoded.sub || decoded.userId;
    } catch (error) {
      console.error("Fel vid dekodning av token:", error);
      return null;
    }
  };

// export const decodeToken = (token) => {

//     if (!token) return null;

//     try{
//          //tre delar separerade med punkt: header.payload.signature
//     const base64Url = token.split('.')[1]; // Vi behöver bara payload-delen
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split('')
//         .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//         .join('')
//     );
     
//     return JSON.parse(jsonPayload);
//   } catch (error) {
//     console.error("Fel vid dekodning av token:", error);
//     return null;
//   }
// };
// //funktion för att hämta userId från token
// export const getUserIdFromToken = () => {
//     const token = localStorage.getItem('token');
//     if (!token) return null;
    
//     const decodedToken = decodeToken(token);
//     return decodedToken ? (decodedToken.nameid || decodedToken.sub || decodedToken.userId) : null;
//   };
