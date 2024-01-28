import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CoachHome from "./pages/CoachHome";
import User from "./pages/User";
import Exercise from "./pages/Exercise";
import Beslenme from "./pages/Beslenme";
import Antrenorbilgi from "./pages/Antrenorbilgi";
import Antrenorprogram from "./pages/Antrenorprogram";
import Antrenorbeslenme from "./pages/Antrenorbeslenme";
import Danisan from "./pages/Danisan";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        setUser({ uid, email });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/coachhome" element={<CoachHome />} />
          <Route path="/user" element={<User user={user} />} />
          <Route path="/exercise" element={<Exercise user={user} />} />
          <Route path="/beslenme" element={<Beslenme user={user} />} />
          <Route
            path="/antrenorbilgi"
            element={<Antrenorbilgi user={user} />}
          />
          <Route
            path="/antrenorprogram"
            element={<Antrenorprogram user={user} />}
          />

          <Route
            path="/antrenorbeslenme"
            element={<Antrenorbeslenme user={user} />}
          />

          <Route path="/danisan" element={<Danisan user={user} />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      <ToastContainer />
    </>
  );
}

export default App;
