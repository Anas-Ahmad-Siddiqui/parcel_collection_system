import './App.css';
import { Routes, Route } from "react-router-dom"
import LoginSignUp from "./Pages/LoginSignUp";
import Dashboard from "./Pages/dashboard"

function App() {
  return (
    <Routes>
        <Route path={"/"} element={<LoginSignUp></LoginSignUp>}/>
        <Route path={"/dashboard"} element={<Dashboard></Dashboard>}/>
    </Routes>
  );
}

export default App;
