import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { auth } from "./firebase";

function App() {
  const [userUid, setUserUid] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid("");
      }
    });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container-fluid app">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home uid={userUid} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
