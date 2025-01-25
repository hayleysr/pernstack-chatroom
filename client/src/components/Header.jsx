/* eslint-disable react/prop-types */
import icon from "../assets/icon.jpg";
import {useState} from 'react';
export default function Header({username, setUsername}){
    const [open, setOpen] = useState(false);
    function handleEditValue(event){
        setUsername(event.target.value);
    }
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () =>{
        setUsername(username);
        setOpen(false);
    }

    return(
        <>           
            <button className="btnUsername" onClick={handleOpen}>
                <img className="icon" src={icon}/></button>
                <h3 className="username">{username}</h3>
                {open &&
                    (<div className="overlay">
                        <div className="modalContainer">
                            <h3>Set username:</h3>
                            <input type="text" value={username} onChange={handleEditValue}></input>
                            <div className="buttonContainer">
                                <button id="save" onClick={handleClose}>Save</button>
                            </div>
                        </div>
                    </div>)
                }
            <h2>Chatroom</h2>
        </>
    );
}