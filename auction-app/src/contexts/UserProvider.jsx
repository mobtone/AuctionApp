import {createContext, useState, useEffect} from 'react';
import { logoutUser, updateUser } from '../services/UserService';

export const UserContext = createContext();

const UserProvider = ({children}) =>{

    
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] =  useState({
        username: localStorage.getItem("username") || null,
        token: localStorage.getItem("token") || null,
    });

    useEffect(() =>{
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if(storedToken && storedUsername) {
        setToken (storedToken);
        setUser({username : storedUsername, token: storedToken});
    }
}, []);

        // const login = async (username, password) => {
        //     try {
        //         const data = await loginUser(username, password);
        //         if (data.token) {
        //             setToken(data.token);
        //             setUser({ username, token: data.token });
        //             localStorage.setItem('token', data.token);
        //             localStorage.setItem('username', username);
        //             return true;
        //         }
        //         return false;
        //     } catch (error) {
        //         console.error("Login error:", error);
        //         return false;
        //     }
        // };
    
        const logout = () => {
            setToken(null);
            setUser({ username: null, token: null });            logoutUser();
            localStorage.removeItem('username');
            localStorage.removeItem('token');
        };

    //         const handleUpdateUser = async ({ oldPassword, newPassword, token }) => {
    //     return await updateUser(oldPassword, newPassword, token);
    // };

    const handleUpdateUser = async (userId, userName, userPassword) =>
    {
        try{
            const response = await updateUser(userId, userName, userPassword, token);
            if(response.success) {
                setUser({ ...user, username: userName});
                localStorage.setItem('user', JSON.stringify({ ...user, userName}));
                return {success: true};
            } else {
                return {sucess: false};
            }
        }
            catch (error){
                console.error("Fel vid ändring av lösenord", error);
                return {success: false};
            }
        }

        return (
                 <UserContext.Provider value= {{user, token, logout, handleUpdateUser }}>
                        {children}
                    </UserContext.Provider>
                );
            };
             
            export default UserProvider;


// const UserProvider = ({children}) => {
//     const [user, setUser] = useState({
//         token: localStorage.getItem("token"),
//         username: localStorage.getItem("username"),
//     });

//    


//     //     if (token && username){
//     //         setUser({username, token});
//     //     }
//     // }, []);

//     const handleLogin = async (username, password) =>{
//         const data = await loginUser(username, password);

//         if (data.token && data.username) {
//             localStorage.setItem("token", data.token); //sparar token i localStorage

//             localStorage.setItem("username", data.username);

//             console.log("Sparad token:", localStorage.getItem("token")); //Logga tokenen

//             setUser({username: data.username, token: data.token})//uppdaterar user-state
//         }
//     }

//     const handleLogout= () => {
//         setUser(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('username');
//         window.location.reload();
//     }

//     // const handleUpdateUser = async ({ oldPassword, newPassword, token }) => {
//     //     return await updateUser(oldPassword, newPassword, token);
//     // };

//     // const handleUpdateUser = async (userId, userName, userPassword) =>
//     // {
//     //     try{
//     //         const response = await updateUser(userId, userName, userPassword, token);
//     //         if(response.success) {
//     //             setUser({ ...user, username: userName});
//     //             localStorage.setItem('user', JSON.stringify({ ...user, userName}));
//     //             return {success: true};
//     //         } else {
//     //             return {sucess: false};
//     //         }
//     //     }
//     //         catch (error){
//     //             console.error("Fel vid ändring av lösenord", error);
//     //             return {success: false};
//     //         }
//     //     }

//     return (
//         <UserContext.Provider value= {{user, handleLogin, handleLogout }}>
//             {children}
//         </UserContext.Provider>
//     );
// };
 
// export default UserProvider;