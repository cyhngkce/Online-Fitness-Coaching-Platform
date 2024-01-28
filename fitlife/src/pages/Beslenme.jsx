import React, { useState, useEffect } from "react";
import db from "./../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Beslenme = () => {
  const [ısım, setIsım] = useState("");

  const [beslenmeData, setBeslenmeData] = useState([]);
  const [egzersizData, setEgzersizData] = useState([]);

  const getBeslenmeData = async () => {
    try {
      const beslenmeCollection = collection(db, "BeslenmeProgramlari");
      const beslenmeQuery = query(
        beslenmeCollection,
        where("name", "==", ısım)
      );
      const beslenmeSnapshot = await getDocs(beslenmeQuery);

      const beslenmeData = [];

      beslenmeSnapshot.forEach((doc) => {
        const data = doc.data();
        beslenmeData.push(data);
      });

      setBeslenmeData(beslenmeData);
    } catch (error) {
      console.error("Beslenme verilerini getirme hatası:", error);
    }
  };

  const getEgzersizData = async () => {
    try {
      const egzersizCollection = collection(db, "EgzersizProgramlari");
      const egzersizQuery = query(
        egzersizCollection,
        where("name", "==", ısım)
      );
      const egzersizSnapshot = await getDocs(egzersizQuery);

      const egzersizData = [];

      egzersizSnapshot.forEach((doc) => {
        const data = doc.data();
        egzersizData.push(data);
      });

      setEgzersizData(egzersizData);
    } catch (error) {
      console.error("Egzersiz verilerini getirme hatası:", error);
    }
  };

  const handleIsimChange = (e) => {
    setIsım(e.target.value);
  };

  const handleIsimSubmit = async (e) => {
    e.preventDefault();
    await getBeslenmeData();
    await getEgzersizData();
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, marginLeft: "20px" }}>
        <h2>Beslenme Programınız</h2>

        {beslenmeData.length > 0 && (
          <div>
            <ul>
              {beslenmeData.map((item) => (
                <li key={item.id}>
                  Pazartesi:{item.pazartesi} <hr />
                  Salı: {item.sali}
                  <hr />
                  Çarşamba: {item.carsamba}
                  <hr />
                  Perşembe: {item.persembe}
                  <hr />
                  Cuma: {item.cuma}
                  <hr />
                  Cumartesi: {item.cumartesi}
                  <hr />
                  Pazar: {item.pazar}
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div style={{ flex: 1, marginRight: "20px" }}>
        <form onSubmit={handleIsimSubmit}>
          <input
            type="text"
            placeholder="İsminizi Yazınız"
            value={ısım}
            onChange={handleIsimChange}
          />
          <button type="submit">İsimle Ara</button>
        </form>
      </div>
      <div style={{ flex: 1 }}>
        <h2>Egzersiz Programınız</h2>
        {egzersizData.length > 0 && (
          <div>
            <ul>
              {egzersizData.map((item) => (
                <li key={item.id}>
                  Pazartesi:{item.pazartesi} <hr />
                  Salı: {item.sali}
                  <hr />
                  Çarşamba: {item.carsamba}
                  <hr />
                  Perşembe: {item.persembe}
                  <hr />
                  Cuma: {item.cuma}
                  <hr />
                  Cumartesi: {item.cumartesi}
                  <hr />
                  Pazar: {item.pazar}
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Beslenme;
