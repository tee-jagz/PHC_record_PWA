import React, { useState } from "react";
import openIndexedDB from "../../db";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'; 

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState(""); // set the default redirect path to home page

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);

    const db = await openIndexedDB();
    const transaction = db.transaction(["staff"], "readonly");
    const staffStore = transaction.objectStore("staff");
    const index = staffStore.index("username");


    const request = index.get(username);

    console.log(staffStore);
    console.log(index);

    request.onsuccess = function (event) {
      const staff = event.target.result;

      if (staff && staff.password === password) {
        //onLogin(staff);
        console.log(staff)
        alert("Login successful");
        setLoading(false);

         // set the redirect path based on some condition
         if (staff.role === "doctor") {
          setRedirectPath("/doctor"); // set the redirect path to doctor page
        } else {
          setRedirectPath("/receptionist"); // set the redirect path to appointment page
        }
        
      } else {
        alert("Invalid username or password");
        setLoading(false);
      }
    };
  }

  return (
    <div>
      
      <h1>Login</h1>
      <form style={{paddingTop: "30%", textAlign: 'center'}} onSubmit={handleLogin}>
         <label>
          {/*Username <br /> */}
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          {/* Password <br /> */}
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
             
            {/* use the Navigate component to redirect to the appropriate page if the redirect path is not empty */}
            {redirectPath && <Navigate to={redirectPath} />}
    </div>
  );
}

export default LoginPage;