import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="OuterContainer">
        <div className="InnerContainer">
          <button className='homeButton' onClick={() => navigate("/login")}>Login</button>
          <button className='homeButton' onClick={() => navigate("/signup")}>Signup</button>
        </div>
      </div>
    </>
  );
};

export default Home;
