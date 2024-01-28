import React, { useState, useEffect } from "react";

import db from "./../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/pages/Home.css";
const CoachHome = ({ user: initialUsers }) => {
  const git = async (e) => {
    e.preventDefault();

    window.location = "/antrenorbilgi";
  };
  const exercise = async (e) => {
    e.preventDefault();

    window.location = "/antrenorprogram";
  };
  const danisan = async (e) => {
    e.preventDefault();

    window.location = "/danisan";
  };
  const beslenme = async (e) => {
    e.preventDefault();

    window.location = "/antrenorbeslenme";
  };
  return (
    <div>
      <div className="container">
        <h1>Antrenör Sayfasına Hoşgeldiniz</h1>
        <div className="first-container-button" onClick={git}>
          Profil Bilgilerinizi Düzenleyiniz.
        </div>
        <div className="second-container-button" onClick={danisan}>
          Danışanlarınızı Görüntüleyiniz.
        </div>
        <div className="third-container-button" onClick={beslenme}>
          Beslenme Programı Hazırlamak için Tıklayınız.
        </div>
        <div className="forth-container-button" onClick={exercise}>
          Egzersiz Programı Hazırlamak için Tıklayınız.
        </div>
      </div>
    </div>
  );
};

export default CoachHome;
