import React from "react";
import Chat from "./component/Chat/Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Authentication/Login";
import Signup from "./component/Authentication/Signup";
// import Chat from "./Pages/Chat";
import Home from "./pages/Home";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chats" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
