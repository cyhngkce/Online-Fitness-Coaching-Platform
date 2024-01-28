import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebase";

const Exercise = ({ user: initialUser }) => {
  const [hedef, setHedef] = useState("");
  const [kilo, setKilo] = useState("");
  const [boy, setBoy] = useState("");
  const [yag, setYag] = useState("");
  const [kas, setKas] = useState("");
  const [vki, setVki] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleChange = (event) => {
    setHedef(event.target.value);
  };
  const vkihesap = async (e) => {
    e.preventDefault();
    const kiloFloat = parseFloat(kilo);
    const boyFloat = parseFloat(boy);

    if (!isNaN(kiloFloat) && !isNaN(boyFloat) && boyFloat !== 0) {
      const vkiValue = kiloFloat / Math.pow(boyFloat / 100, 2);
      setVki(vkiValue.toFixed(2));
    } else {
      console.error("Geçersiz kilo veya boy değeri");
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "Exercise"), {
        email: initialUser.email,
        hedef: hedef,
        kilo: kilo,
        boy: boy,
        yag: yag,
        kas: kas,
        vki: vki,
        name: name,
        surname: surname,
      });

      console.log("Document written with ID: ", docRef.id);
      window.location = "/home";
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <div>
        <form>
          <input
            type="text"
            value={name}
            placeholder="Ad"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={surname}
            placeholder="Soyad"
            onChange={(e) => setSurname(e.target.value)}
          />
          <select value={hedef} onChange={handleChange}>
            <option value="">Hedeflerinizi Seçiniz.</option>
            <option value="Kilo Alma">Kilo Alma</option>
            <option value="Kilo Verme">Kilo Verme</option>
            <option value="Kilo Koruma">Kilo Koruma</option>
            <option value="Kas Kazanma">Kas Kazanma</option>
          </select>
          <input
            type="text"
            value={kilo}
            placeholder="Kilo"
            onChange={(e) => setKilo(e.target.value)}
          />
          <input
            type="text"
            value={boy}
            placeholder="Boy"
            onChange={(e) => setBoy(e.target.value)}
          />
          <input
            type="text"
            value={yag}
            placeholder="Yağ Oranı"
            onChange={(e) => setYag(e.target.value)}
          />
          <input
            type="text"
            value={kas}
            placeholder="Kas Kütlesi"
            onChange={(e) => setKas(e.target.value)}
          />
          <button onClick={vkihesap}>Vücut Kitle Endeksi Hesapla </button>
          <div>Vücut Kitle Endeksi (VKE): {vki}</div>
          <button onClick={handleRegister}>Bilgileri Kaydet</button>
        </form>
      </div>
    </div>
  );
};
export default Exercise;
