import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { auth } from "./firebase";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserName(user.displayName);
        const userDocRef = doc(getFirestore, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        console.log(userDocSnap);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserName(userData.name);
        }
      } else {
        setUserName("");
      }
    });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container-fluid app">
          <Routes>
            <Route path="/" element={<Home name={userName} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
