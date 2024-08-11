import './App.css'
import InputChat from "./components/InputChat";
import DisplayChat from "./components/DisplayChat";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header/>
      <DisplayChat/>
      <InputChat type="text" placeholder="Say something nice"/>
    </>
  )
}

export default App
