import React, { useState } from "react";
import "../styles/pages/Auth.css";
import db from "../firebase";
import { addDoc, collection } from "firebase/firestore";

import { auth } from "../firebase";

const Antrenorbilgi = ({ user: initialUser }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [hedef, setHedef] = useState("");
  const [deneyim, setDeneyim] = useState("");

  const handleChange = (event) => {
    setHedef(event.target.value);
  };
  const handleChange1 = (event) => {
    setDeneyim(event.target.value);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "Antrenor"), {
        email: initialUser.email,
        name: name,
        surname: surname,
        phone: phone,
        hedef: hedef,
        deneyim: deneyim,
      });

      console.log("Document written with ID: ", docRef.id);

      window.location = "/coachhome";
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <h2>Bilgilerinizi Giriniz.</h2>
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
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="İletişim Bilgisi"
          />
          <select value={hedef} onChange={handleChange}>
            <option value="">Uzmanlık Alanınızı Seçiniz.</option>
            <option value="Kilo Alma">Kilo Alma</option>
            <option value="Kilo Verme">Kilo Verme</option>
            <option value="Kilo Koruma">Kilo Koruma</option>
            <option value="Kas Kazanma">Kas Kazanma</option>
          </select>
          <select value={deneyim} onChange={handleChange1}>
            <option value="">Kaç yıllık deneyime sahipsiniz?</option>
            <option value="1-5">1-5</option>
            <option value="5-7">5-7</option>
            <option value="7-9">7-9</option>
            <option value="10+">10+</option>
          </select>

          <button onClick={handleRegister} className="auth-container-button">
            Bitir
          </button>
        </form>
      </div>
    </div>
  );
};

export default Antrenorbilgi;
