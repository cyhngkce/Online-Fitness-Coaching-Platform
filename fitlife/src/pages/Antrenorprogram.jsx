import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";

const Antrenorprogram = ({ user: initialUser }) => {
  const [exerciseData, setExerciseData] = useState({
    name: "",
    surname: "",
  });
  const [danisanOptions, setDanisanOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [beslenmeData, setBeslenmeData] = useState({
    pazartesi: "",
    sali: "",
    carsamba: "",
    persembe: "",
    cuma: "",
    cumartesi: "",
    pazar: "",
  });

  useEffect(() => {
    // "Beslenme" veritabanından danışan verilerini çek
    const fetchDanisanData = async () => {
      try {
        const db = getFirestore();
        const collectionRef = collection(db, "Beslenme");
        const querySnapshot = await getDocs(collectionRef);

        const danisanData = querySnapshot.docs.map((doc) => doc.data());
        setDanisanOptions(danisanData);
      } catch (error) {
        console.error("Danışan verilerini çekme hatası", error);
        toast.error("Danışan verilerini çekme hatası");
      }
    };

    fetchDanisanData();
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);

    // Seçilen danışanın verilerini setExerciseData ile ayarla
    const selectedDanisan = danisanOptions.find(
      (danisan) => danisan.name === event.target.value
    );
    setExerciseData(selectedDanisan || { name: "", surname: "" });
  };

  const handleBeslenmeSave = async () => {
    try {
      const db = getFirestore();

      // Yeni koleksiyon ekleyin (Örneğin: "BeslenmeProgramlari")
      const beslenmeProgramlariCollectionRef = collection(
        db,
        "EgzersizProgramlari"
      );

      // Silinecek belgeyi bul
      const existingDocRef = await doc(
        beslenmeProgramlariCollectionRef,
        selectedValue
      );
      await deleteDoc(existingDocRef);

      // Beslenme programı için yeni bir kayıt oluştur
      const newBeslenmeDocRef = await addDoc(beslenmeProgramlariCollectionRef, {
        name: exerciseData.name,
        surname: exerciseData.surname,
        pazartesi: beslenmeData.pazartesi,
        sali: beslenmeData.sali,
        carsamba: beslenmeData.carsamba,
        persembe: beslenmeData.persembe,
        cuma: beslenmeData.cuma,
        cumartesi: beslenmeData.cumartesi,
        pazar: beslenmeData.pazar,
      });

      toast.success("Egzersiz programı başarıyla kaydedildi.");
    } catch (error) {
      console.error("Egzersiz programı kaydetme hatası", error);
      toast.error("Egzersiz programı kaydetme hatası");
    }
  };

  return (
    <div>
      <h2>Egzersiz Programı Hazırlama</h2>
      <div>
        <select value={selectedValue} onChange={handleChange}>
          <option value="">Danışan Seçiniz</option>
          {danisanOptions.map((danisan, index) => (
            <option key={index} value={danisan.name}>
              {danisan.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Pazartesi"
          value={beslenmeData.pazartesi}
          onChange={(e) =>
            setBeslenmeData({ ...beslenmeData, pazartesi: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Salı"
          value={beslenmeData.sali}
          onChange={(e) =>
            setBeslenmeData({ ...beslenmeData, sali: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Çarşamba"
          value={beslenmeData.carsamba}
          onChange={(e) =>
            setBeslenmeData({ ...beslenmeData, carsamba: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Perşembe"
          value={beslenmeData.persembe}
          onChange={(e) =>
            setBeslenmeData({ ...beslenmeData, persembe: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Cuma"
          value={beslenmeData.cuma}
          onChange={(e) =>
            setBeslenmeData({ ...beslenmeData, cuma: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Cumartesi"
          value={beslenmeData.cumartesi}
          onChange={(e) =>
            setBeslenmeData({ ...beslenmeData, cumartesi: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Pazar"
          value={beslenmeData.pazar}
          onChange={(e) =>
            setBeslenmeData({ ...beslenmeData, pazar: e.target.value })
          }
        />
        <button onClick={handleBeslenmeSave}>Kaydet</button>
      </div>
    </div>
  );
};

export default Antrenorprogram;
