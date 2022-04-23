import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/Home/HomePage";
import Navbar from "./Components/Home/Navbar";
import Signup from "./Components/User/Signup/Signup";
import Login from "./Components/User/Login/Login";
import TtsHome from "./Components/UserTTS/TtsHome";
import Faqs from "./Components/UserTTS/Faqs";
import React, { useContext } from "react";
import { authContext } from "./Components/store/Context/AuthContext";
import TicketForm from "./Components/UserTTS/TicketForm";


function App() {
  const isAuthen = useContext(authContext);

  return (
    <>
      <Navbar />
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
      {isAuthen.isLoggend ? (
          <React.Fragment>
            <Route path="/HomeUser" element={<TtsHome />} />
            <Route path="/Faqs" element={<Faqs />} />
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
