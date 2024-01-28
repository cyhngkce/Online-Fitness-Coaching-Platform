import db from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export const getUsers = async () => {
  const usersCollection = collection(db, "Kayıt");
  const usersSnapshot = await getDocs(usersCollection);
  const users = [];
  usersSnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
};
