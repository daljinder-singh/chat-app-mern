import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/style.css";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("Please Fill all the Fields");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_SOCKET_URL}/api/user/login`,
        { email, password },
        config
      );

      // console.log(JSON.stringify(data));
      console.log("Login Successful");
      localStorage.setItem("chat", JSON.stringify(data));
      navigate("/chats");
    } catch (error) {
      console.log("Error Occured!");
    }
  };
  return (
    <>
      <div className="OuterContainer">
        <form className="InnerContainer">
          <h1 className="heading">Login</h1>
          <label>
            <input
              className="Input"
              required
              value={email}
              type="email"
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <input
              className="Input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
            />
          </label>
          <button className="button" onClick={submitHandler}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
