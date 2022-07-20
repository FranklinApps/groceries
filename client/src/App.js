import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login"
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Register from "./components/Register";
import OneDew from "./components/OneDew";
import DewForm from "./components/DewForm";
import EditDew from "./components/EditDew";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/home" element = {<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<LoginRegister/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dew/:id" element={<OneDew/>}/>
        <Route path="/newDew" element={<DewForm/>}/>
        <Route path="/dew/edit/:id" element={<EditDew/>}/>
      </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
