import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/Home/HomePage";
import Navbarr from "./Components/Home/Navbarr";
import Signup from "./Components/User/Signup/Signup";
import Login from "./Components/User/Login/Login";
import TtsHome from "./Components/UserTTS/TtsHome";
import React, { useContext } from "react";
import { authContext } from "./Components/store/Context/AuthContext";
import TicketForm from "./Components/UserTTS/TicketForm";
import FaqsData from './Components/UserTTS/FaqsData';
import MyTicket from "./Components/UserTTS/MyTicket";


function App() {
  const isAuthen = useContext(authContext);
  const userLogen = isAuthen.isLoggend  && isAuthen.role === 'user' ;

  return (
    <>
      <Navbarr />
      {/* <NavbarLogined/> */}
      {/* <Routes>
        <Route path="/HomeUser" element={<TtsHome />} />
        <Route path="/Faqs" element={<Faqs />} />
        <Route path="/submit_ticket" element={<TicketForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes> */}
  <Routes>
      { userLogen ? (
          <React.Fragment>
            <Route path="/HomeUser" element={<TtsHome />} />
            <Route path="/Faqs" element={<FaqsData />} />
            <Route path="/HomeUser" element={<TtsHome />} />
            <Route path="/myTickets" element={<MyTicket />} />
            <Route path="/submit_ticket" element={<TicketForm />} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login/>} />
          </React.Fragment>
        )}
        </Routes>
    </>
  );
}

export default App;
