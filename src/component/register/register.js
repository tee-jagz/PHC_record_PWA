import React, { useState } from "react";
import openIndexedDB from "../../db";

function RegisterPage({ db }) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("");
  };

  async function handleRegister(event) {
    event.preventDefault();
    setLoading(true);

    const db = await openIndexedDB();
    const transaction = db.transaction(["staff"], "readwrite");
    const staffStore = transaction.objectStore("staff");

    const staff = {
      username,
      firstName,
      lastName,
      email,
      password,
      role,
    };

    staffStore.add(staff);
    resetForm();
    setLoading(false);
    alert("Registration successful");
    
  }

  return (
    <>
      <h1>Register</h1>
      <form style={{textAlign: 'center', paddingTop: '10%'}} onSubmit={handleRegister}>
        <label>
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
          <input
            type="text"
            value={firstName}
            placeholder = "First Name"
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            value={lastName}
            placeholder = "Last Name"
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          <input
            type="email"
            value={email}
            placeholder = "Email"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            value={password}
            placeholder = "Password"
            onChange={(event) => setPassword(event.target.value)}
            minLength={4}
            required
          />
        </label>
        <br />
        <label>
          <select value={role} onChange={(event) => setRole(event.target.value)} required>
            <option value="">Role</option>
            <option value="doctor">Doctor</option>
            <option value="receptionist">Receptionist</option>
          </select>
        </label>
        <br />
        <button type="submit" disabled={loading}>
          Register
        </button>
      </form>
    </>
  );
}

export default RegisterPage;