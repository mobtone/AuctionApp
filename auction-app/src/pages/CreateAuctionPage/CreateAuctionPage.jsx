import CreateAuctionForm from "../../components/CreateAuctionForm/CreateAuctionForm"
import './CreateAuctionPage.css'
import Header from "../../components/Header/Header"

const CreateAuctionPage = () =>{

    return (
        <div className ="createAuctionPage">
            <Header/>
            <CreateAuctionForm/>
        </div>
    )
}

export default CreateAuctionPage;