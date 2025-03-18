import { NavLink } from "react-router-dom"
import {useContext } from 'react';
import './Header.css';
import { UserContext } from "../../contexts/UserProvider";

const Header = () => {
   
    const {user, logout} = useContext(UserContext);

    const isLoggedIn = user && user.username;

    return (
        <header className="mainHeader">
            <nav className="navMenu">
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                    Hem
                </NavLink>
                {isLoggedIn &&  (
                    <>
              
                <NavLink to="/my-auctions" className={({ isActive }) => isActive ? "active" : ""}>
                    Mina auktioner
                </NavLink>
                <NavLink to="/create-auction" className={({ isActive }) => isActive ? "active" : ""}>
                    Skapa auktion
                </NavLink>
                <button onClick={logout} className="logout-button">
                    Logga ut ({user.username})
                </button>
                </>)}
            </nav>
            
        </header>
    )
};

export default Header;