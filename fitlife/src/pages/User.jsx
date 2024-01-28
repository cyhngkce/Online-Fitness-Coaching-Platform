import { useState, useEffect } from "react";
import "./../styles/pages/User.css";
import { doc, updateDoc } from "firebase/firestore";
import db from "./../firebase";
import { collection, getDocs } from "firebase/firestore";

const User = ({ user: initialUser }) => {
  const [users, setUsers] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const getUsers = async () => {
    const usersCollection = collection(db, "Kayıt");
    const usersSnapshot = await getDocs(usersCollection);

    const users = [];

    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      const user = {
        id: doc.id,
        ...userData,
      };
      users.push(user);
    });

    setUsers(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const guncelle = async (e) => {
    e.preventDefault();

    if (!selectedValue || !newValue) {
      console.error("Lütfen güncellenmek istenen alanı ve yeni değeri seçin.");
      return;
    }

    try {
      const matchingUser = users.find(
        (user) => user.email === initialUser?.email
      );

      if (!matchingUser) {
        console.error("Kullanıcı bulunamadı.");
        return;
      }

      const userDocRef = doc(db, "Kayıt", matchingUser.id);

      const updatedFields = { [selectedValue]: newValue };

      await updateDoc(userDocRef, updatedFields);

      const updatedUsers = users.map((user) => {
        if (user.email === matchingUser.email) {
          return {
            ...user,
            ...updatedFields,
          };
        }
        return user;
      });

      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      <div>
        <ul>
          {users
            .filter((user) => user.email === initialUser?.email)
            .map((filteredUser) => (
              <div key={filteredUser.id}>
                <h1>BİLGİLERİNİZ</h1>
                <p>İsim: {filteredUser.name}</p>
                <p>Soyisim: {filteredUser.surname}</p>
                <p>Telefon No: {filteredUser.phone}</p>
                <p>Doğum Tarihi: {filteredUser.date}</p>
              </div>
            ))}
        </ul>
      </div>
      <div>
        <h1>Güncelle:</h1>
        <select value={selectedValue} onChange={handleChange}>
          <option value="">Güncellemek İstediğiniz Veriyi Seçiniz.</option>
          <option value="name">İsim</option>
          <option value="surname">Soyisim</option>
          <option value="phone">Telefon No</option>
          <option value="date">Doğum Tarihi</option>
        </select>
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button onClick={guncelle}>Güncelle</button>
      </div>
    </div>
  );
};

export default User;
