import React from "react";
import "../styles/components/Navbar.css";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase";

const Navbar = () => {
  const logout = async () => {
    toast.success("Çıkış işlemi gerçekleştiriliyor...");
    await signOut(auth);
    setTimeout(() => {
      window.location = "/login";
    }, 3000);
  };
  return (
    <div className="navbar">
      <div className="navbar-left">FITLIFE</div>
      <div className="navbar-right" onClick={logout}>
        Logout
      </div>
    </div>
  );
};
export default Navbar;
