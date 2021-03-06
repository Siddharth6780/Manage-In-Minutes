import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Signup = () => {
  let history = useHistory();
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signupUser(e) {
    e.preventDefault();
    let url = process.env.REACT_APP_SIGNUP_API;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.success === false) {
        toast.error("Enter Correct Details");
      } else {
        toast.success("Signup successfully");
        localStorage.setItem("token", data.message);
        history.push("/");
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  }

  return (
    <>
      <div className="signup">
        <div className="signup-triangle"></div>

        <h2 className="signup-header">Signup</h2>

        <form className="signup-container" onSubmit={signupUser}>
          <p>
            <input
              value={name}
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setname(e.target.value)}
            />
          </p>
          <p>
            <input
              value={email}
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>
          <p>
            <input
              value={password}
              type="password"
              placeholder="Password"
              required
              minLength="5"
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <p>
            <input type="submit" value="Sign up" />
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
