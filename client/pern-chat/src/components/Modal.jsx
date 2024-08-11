/* eslint-disable react/prop-types */
import {useState} from 'react';
export default function Modal({open, onClose, msg}){
    const [description, setDescription] = useState(msg.description);
    async function updateDescription(){
        try {
            const body = { description };
            const response = await fetch(`http://localhost:5000/chatlog/${msg.msg_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
                }
            )
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }

    function handleSave(callback){
        updateDescription();
        callback();
    }
    function handleClose(callback){
        setDescription(msg.description);
        callback();
    }
    function handleEditValue(event){
        setDescription(event.target.value);
    }
    return(
        <>
        {open && (
            <div className="overlay">
                <div className="modalContainer">
                    <h3>Edit message:</h3>
                    <input type="text" value={description} onChange={handleEditValue}></input>
                    <div className="buttonContainer">
                        <button id="close" onClick={() => handleClose(onClose)}>Close</button>
                        <button id="save" onClick={() => handleSave(onClose)}>Save</button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}