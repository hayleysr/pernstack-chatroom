/* eslint-disable react/prop-types */
import {useState} from 'react';
import Modal from "./Modal";

export default function EditChat({msg, ...props}){
    const [modalVisible, setModalVisible] = useState(false);
    const handleOpen = () => {
        setModalVisible(true);
    }
    const handleClose = () =>{
        setModalVisible(false);
    }
    return(
        <>
        <button className="btnEdit" onClick={handleOpen}>Edit</button>
        <Modal open={modalVisible} onClose={handleClose} msg={msg} {...props}/>
        </>
    );
}   