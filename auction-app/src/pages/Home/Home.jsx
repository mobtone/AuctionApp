import {useContext} from 'react';
import Search from "../../components/Search/Search";
import AuctionCardList from '../../components/AuctionCardList/AuctionCardList';
import './Home.css';
import Login from '../../components/Login/Login';
import Header from '../../components/Header/Header';
import { UserContext } from '../../contexts/UserProvider';
import Signup from '../../components/Signup/Signup';
import UpdateUserForm from '../../components/UpdateUser/UpdateUserForm';

const Home = () => {

     
    const authContext = useContext(UserContext);
    const isLoggedIn = authContext && authContext.token;


    return (
        <>
      <div className="homeContainer">
      <div className="logo">Auktioner</div>
      {isLoggedIn && <Header />}

      
                <div className="searchContainer">
                    <Search />
                </div>
                
                <div className="rightContainer">
                    {!isLoggedIn ? (<>
                    <Login /><br/>
                    <Signup/> 
                    </>

                ) : ( <>
                <UpdateUserForm/>
                </> )}
            </div>
            
            <div className="auctionsContainer">
                <AuctionCardList />
            </div>
            </div>
                
        </>
        
    );
};

export default Home;