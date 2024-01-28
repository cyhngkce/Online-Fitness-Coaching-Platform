import React, { useState, useEffect } from "react";

import db from "./../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/pages/Home.css";
const Home = ({ user: initialUsers }) => {
  const [users, setUsers] = useState([]);

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
  const git = async (e) => {
    e.preventDefault();

    window.location = "/user";
  };
  const exercise = async (e) => {
    e.preventDefault();

    window.location = "/exercise";
  };
  const plan = async (e) => {
    e.preventDefault();

    window.location = "/beslenme";
  };
  return (
    <div>
      <div>
        <ul>
          {users
            .filter((user) => user.email === initialUsers?.email)
            .map((filteredUser) => (
              <h1 key={filteredUser.id}>
                Hoşgeldiniz {filteredUser.name} {filteredUser.surname}
              </h1>
            ))}
        </ul>
      </div>
      <div className="container">
        <div className="first-container-button" onClick={git}>
          Profil Bilgilerini Düzenlemek için Tıkla
        </div>
        <div className="second-container-button" onClick={exercise}>
          Boy Kilo Değerlerini Girmek için Tıkla
        </div>
        <div className="third-container-button" onClick={plan}>
          Egzersiz ve Beslenme Planlarına Erişmek için Tıkla
        </div>
      </div>
    </div>
  );
};

export default Home;
