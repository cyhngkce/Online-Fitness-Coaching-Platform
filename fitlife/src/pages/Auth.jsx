import React, { useState } from "react";
import "../styles/pages/Auth.css";
import db from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Auth = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const git = async (e) => {
    e.preventDefault();
    window.location = "/login";
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const docRef = await addDoc(collection(db, "Kayıt"), {
        name: name,
        surname: surname,
        date: date,
        phone: phone,
        gender: gender,
        email: email,
      });

      console.log("Document written with ID: ", docRef.id);

      window.location = "/login";
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <h2>Kayıt Ol</h2>
        <form>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ad"
          />
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Soyad"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Doğum Tarihi"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefon No"
          />
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="Erkek"
                checked={gender === "Erkek"}
                onChange={() => setGender("Erkek")}
              />
              Erkek
            </label>
            <label>
              <input
                type="radio"
                value="Kadın"
                checked={gender === "Kadın"}
                onChange={() => setGender("Kadın")}
              />
              Kadın
            </label>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <p onClick={git}>Giriş yapmak için tıklayınız.</p>
          <button onClick={handleRegister} className="auth-container-button">
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
