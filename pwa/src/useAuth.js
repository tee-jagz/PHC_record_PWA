import { createContext, useContext, useState, useEffect } from "react";
import openIndexedDB from "./db";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load the user from localStorage on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username, password) => {
    const db = await openIndexedDB();
    const tx = db.transaction("staff", "readonly");
    const staffStore = tx.objectStore("staff");
    const staffIndex = staffStore.index("username");

    const request = staffIndex.get(username);
    request.onsuccess = (e) => {
      const staffMember = e.target.result;
      if (staffMember && staffMember.password === password) {
        setUser(staffMember);
        // Save the user to localStorage
        localStorage.setItem("user", JSON.stringify(staffMember));
      } else {
        alert('Invalid credentials');
        throw new Error("Invalid credentials");
      }
    };
  };

  const logout = () => {
    setUser(null);
    // Remove the user from localStorage
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
