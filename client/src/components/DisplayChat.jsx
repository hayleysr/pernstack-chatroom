import {useState, useEffect} from "react";
import EditChat from "./EditChat";
export default function DisplayChat(){
    const [messages, setMessages] = useState([]);

    //delete message
    const handleDelete = async (id) => {
        try {
            const deleteMsg = await fetch(`http://localhost:5000/chatlog/${id}`, {
                method: "DELETE"
            });
            setMessages(messages.filter(message => message.msg_id != id));
        } catch (error) {
            console.error(error.message);
        }
    }

    const getChats = async()=>{
        try {
            const response = await fetch("http://localhost:5000/chatlog");
            const jsonData = await response.json(); //parse json
            setMessages(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(()=>{
        getChats();
    }, []);
    return(
        <>
            <section className="chat">
                <table className="table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((msg) => (
                            <tr key={msg.msg_id}>
                                <td className="user">{msg.username ? msg.username : "Anonymous"}</td>
                                <td className="msgtext">{msg.description}</td>
                                <td><EditChat msg={msg} /></td>
                                <td><button className="btnDelete" onClick={() => {handleDelete(msg.msg_id)}}>X</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}