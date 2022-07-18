import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login"
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/home" element = {<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<LoginRegister/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
