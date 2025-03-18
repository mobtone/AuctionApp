// import{ createContext, useState, useEffect } from "react";
// import { loginUser, logoutUser } from "../services/UserService";

// export const AuthorizationContext = createContext();

// const AuthorizationProvider = ({children}) => {
//     const [token, setToken] = useState(null);
//     const[user, setUser] = useState(null);

//     useEffect(() => {
//         //kontrollerar  om token finns i localStorage vid laddning
//         const storedToken = localStorage.getItem('token');
//         const storedUsername = localStorage.getItem('username');
        
//         if (storedToken && storedUsername) {
//             setToken(storedToken);
//             setUser({ username: storedUsername });
//         }
//     }, []);

//     const login = async (username, password) => {
//         try {
//             const data = await loginUser(username, password);
//             if (data.token) {
//                 setToken(data.token);
//                 setUser({ username });
//                 localStorage.setItem('token', data.token);
//                 localStorage.setItem('username', username);
//                 return true;
//             }
//             return false;
//         } catch (error) {
//             console.error("Login error:", error);
//             return false;
//         }
//     };

//     const logout = () => {
//         setToken(null);
//         setUser(null);
//         logoutUser();
//         localStorage.removeItem('username');
//     };


//     return (
//         <AuthorizationContext.Provider value ={{ token, user, login, logout}}>

//             {children}
//         </AuthorizationContext.Provider>
//     );
// };

// export default AuthorizationProvider;