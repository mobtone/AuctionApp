import {useRef, useContext} from 'react';
import { AuctionContext } from "../../contexts/AuctionProvider";
import './Search.css';

const Search = () => {

    const textValue = useRef();

    const {searchAuctions} = useContext(AuctionContext);

    const handleSearch = () => {
        searchAuctions(textValue.current.value);
    };

    return(
        <div id="search">
            <input type ="text" ref ={textValue} placeholder = "Sök auktioner"/>
            <button onClick = {handleSearch}>Sök</button>
        </div>
    );
};

export default Search;