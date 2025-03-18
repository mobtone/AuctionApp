import {useRef, useContext} from 'react';
import { UserContext } from '../../contexts/UserProvider';
import { updateUser } from '../../services/UserService';
import './UpdateUserForm.css';

const UpdateUserForm = () =>{
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const {handleUpdateUser, user} = useContext(UserContext);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const oldPassword = oldPasswordRef.current.value;
        const newPassword = newPasswordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (newPassword !== confirmPassword) {
            alert("Lösenorden matchar inte");
            return; 
        }
        try {
            const response = await updateUser({
                oldPassword,
                newPassword,
                token: user.token,
            });

            if(response.success) {
                alert("Lösenordet uppdaterat");
            } else{
                alert ("Fel vid ändring av lösenord");
            }
        } catch (error) {
            console.error("Fel vid ändring av lösenord:", error);
            alert("Fel vid uppdatering av lösenord");
        }
    }

    return (
        
        <div className="updateAccountStyle">
            <h2>Uppdatera konto</h2>
            <form onSubmit = {handleSubmit}>
                <input type="password" ref = {oldPasswordRef} placeholder ="Nuvarande lösenord"/>
                <input type ="password" ref = {newPasswordRef} placeholder ="Nytt lösenord"/>
                <input type ="password" ref = {confirmPasswordRef} placeholder ="Bekräfta nytt lösenord" />
                <button type ="submit">Spara</button>
            </form>
            </div>

    )
}

export default UpdateUserForm;