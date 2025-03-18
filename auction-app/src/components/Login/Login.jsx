import { useRef } from "react";
import { loginUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {

    const textName = useRef();
    const textPwd = useRef();
    const navigate = useNavigate();

    //eventhandler för att hantera att användaren loggas in när knappen klickas 
    //genom att anropa metoden i UserService

    const handleClick = () =>{
        loginUser(textName.current.value.trim(), textPwd.current.value)
        .then(result => {
            console.log(result);
            localStorage.setItem('token', result.token);

            localStorage.setItem('username', textName.current.value.trim());
            navigate('/');
            window.location.reload();//uppdaterar ui efter inloggningen
        })
        
        .catch(error => {
            console.error(error);
            alert("Fel användarnamn eller lösenord");
        });
    }

    return (
        <>
        <div className="loginStyle">
            <h1>Logga in</h1>
            <input type="text" ref={textName} placeholder ="Ange användarnamn"/><br/>
            <input type ="text" ref = {textPwd} placeholder ="Ange lösenord"/>
            <button onClick={handleClick}>Logga in</button>
        </div>
        </>
    )

}

export default Login;