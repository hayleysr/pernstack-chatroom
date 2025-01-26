import {useState} from "react";

export default function InputChat({username, ...props}){
    const [description, setDescription] = useState("");

    const onSubmitForm = async(e)=>{
        e.preventDefault();
        try {
            const body = {username, description};
            const response = await fetch("http://localhost:5000/chatlog",{
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log("Raw Response:", response); //debug: raw response
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <>
            <form onSubmit={onSubmitForm}>
                <input value={description} onChange={e => setDescription(e.target.value)} {...props}/>
                <button>Send</button>
            </form>
        </>
    );
}