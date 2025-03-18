import { useRef } from "react"
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/UserService";
import './Signup.css';

const Signup = () => {

    const textName = useRef();
    const textPassword = useRef();
    const navigate = useNavigate();
   
    const handleClick = () => {
        registerUser(textName.current.value.trim(), textPassword.current.value)
        .then(result => {
            console.log(result);
            alert("Registrering lyckades");
            navigate('/');
        })
        .catch(error => {
            console.error(error);
            alert("Registrering misslyckades");
        });

        textName.current.value = "";
        textPassword.current.value="";
    }

    return (
        <div className ="signupStyle">
            <h1>Skapa konto</h1>
        <input type="text" ref= {textName} placeholder= "Ange användarnamn" />
        <input type="text" ref = {textPassword} placeholder= "Ange lösenord"/>
        <button onClick = {handleClick} >Registrera</button>
        </div>
    )
}

export default Signup;