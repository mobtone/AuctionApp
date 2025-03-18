import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Auction from './pages/Auction/Auction';
import AuctionProvider from './contexts/AuctionProvider';
import UserProvider from './contexts/UserProvider';
import UserAuctions from './pages/UserAuctions/UserAuctions';
import CreateAuctionPage from './pages/CreateAuctionPage/CreateAuctionPage';
import EditAuctionPage from './components/EditAuctionForm/EditAuctionForm';

function App() {

  return (<>
  <Router>
  <UserProvider>
  {/* <AuthorizationProvider> */}
  <AuctionProvider>
   

            <Routes>

                <Route exact path="/" element={<Home/>} />
              <Route path ="/auctions/:id" element= {<Auction/>} />
              <Route path="/my-auctions" element={<UserAuctions/>} />
              <Route path="/create-auction" element ={<CreateAuctionPage/>} />
              <Route path="/edit-auction/:auctionId" element={<EditAuctionPage/>}/>
            </Routes>
            </AuctionProvider>
            {/* </AuthorizationProvider> */}
            </UserProvider>
            </Router>
            </>
  )
}

export default App;