import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/style.css";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmpassword) {
      return console.log("required name email");
    }
    if (password !== confirmpassword) {
      console.log("Passwords Do Not Match");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_SOCKET_URL}/api/user/register`,
        {
          name,
          email,
          password,
        },
        config
      );
      alert("Registration Successful");
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
          <h1 className="heading">Signup</h1>
          <label>
            <input
              className="Input"
              required
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <input
              className="Input"
              type="email"
              required
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <input
              className="Input"
              type="password"
              required
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <input
              className="Input"
              type="password"
              required
              placeholder="Confirm password"
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
          </label>
          <button className="button" onClick={submitHandler}>
            {" "}
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
