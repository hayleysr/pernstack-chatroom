import './App.css'
import {useState} from 'react';
import InputChat from "./components/InputChat";
import DisplayChat from "./components/DisplayChat";
import Header from "./components/Header";

function App() {
  const [username, setUsername] = useState("Anonymous");
  return (
    <>
      <Header username={username} setUsername={setUsername}/>
      <DisplayChat/>
      <InputChat type="text" placeholder="Say something nice" username={username}/>
    </>
  )
}

export default App