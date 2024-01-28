import React from "react";
import { useState } from "react";
import "../styles/pages/Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const git = async (e) => {
    e.preventDefault();
    window.location = "/auth";
  };
  const giris = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      console.log("Giriş işlemi başarılı!");
      window.location = "/home";
    } catch (error) {
      console.error("Giriş işlemi başarısız: ", error.message);
    }
  };
  const antrenorgiris = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Giriş işlemi başarılı!");
      window.location = "/coachhome";
    } catch (error) {
      console.error("Giriş işlemi başarısız: ", error.message);
    }
  };
  return (
    <div className="auth">
      <div className="auth-container">
        <h2>Giriş Yap</h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <div>
          <p onClick={git}>Kayıt olmak için tıklayınız.</p>
          <div onClick={giris} className="auth-container-button">
            Öğrenci Girişi
          </div>
          <div onClick={antrenorgiris} className="auth-container-button">
            Antrenör Girişi
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
