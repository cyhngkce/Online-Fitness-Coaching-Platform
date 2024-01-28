import React, { useEffect, useState } from "react";
import {
  getFirestore,
  getDocs,
  query,
  collection,
  addDoc,
} from "firebase/firestore";
import db from "../firebase";

const Danisan = ({ user: initialUser }) => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [hocaIsim, setHocaIsim] = useState(""); // hocaIsim state'i ekledik

  const sendToOtherDatabase = async (name, surname) => {
    try {
      // Beslenme koleksiyonuna yeni kayıt eklerken hocaIsim'i de ekledik
      const docRef = await addDoc(collection(db, "Beslenme"), {
        name: name,
        surname: surname,
        email: initialUser.email,
        hocaIsim: hocaIsim,
      });

      console.log("Veri başarıyla eklendi:", docRef.id);
    } catch (error) {
      console.error("Veri ekleme hatası:", error);
    }
  };

  const fetchData = async () => {
    const db = getFirestore();

    const collectionRef1 = collection(db, "Antrenor");
    const query1 = query(collectionRef1);
    const snapshot1 = await getDocs(query1);
    const data1 = snapshot1.docs.map((doc) => doc.data());
    setData1(data1);

    const collectionRef2 = collection(db, "Exercise");
    const query2 = query(collectionRef2);
    const snapshot2 = await getDocs(query2);
    const data2 = snapshot2.docs.map((doc) => doc.data());
    setData2(data2);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const compareData = () => {
    const commonField = "hedef";

    return (
      <div>
        {data1.map((item1) => {
          const matchingItems = data2.filter(
            (item2) => item1[commonField] === item2[commonField]
          );

          return (
            <div key={item1[commonField]}>
              {matchingItems.length > 0 ? (
                <ul key={item1[commonField]}>
                  {matchingItems.map((matchingItem, index) => (
                    <li key={index}>
                      Öğrenci {index + 1}: {matchingItem.name}{" "}
                      {matchingItem.surname}
                      <button
                        onClick={() =>
                          sendToOtherDatabase(
                            matchingItem.name,
                            matchingItem.surname
                          )
                        }
                      >
                        Danışanı Onayla
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p key={item1[commonField]}>
                  Eşleşen değer bulunamadı: {item1[commonField]}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <h1>Danışanlar</h1>

      {compareData()}
      <input
        type="text"
        placeholder="İsminizi Yazınız"
        value={hocaIsim}
        onChange={(e) => setHocaIsim(e.target.value)}
      />
    </div>
  );
};

export default Danisan;
