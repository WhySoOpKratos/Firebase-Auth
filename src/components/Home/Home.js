import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { app } from "../../firebase";

const firestore = getFirestore(app);

function Home(props) {
  const [userData, setUserData] = useState({});
  const Navigate = useNavigate();
  const handleSignOut = () => {
    signOut(getAuth())
      .then(() => {
        Navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getData = async () => {
    // if (props.uid) {
    //   console.log(props.uid);
    //   Navigate("/login");
    // }
    const ref = collection(firestore, "users");
    const q = query(ref, where("id", "==", props.uid));
    const userData = await getDocs(q);
    userData.forEach((data) => setUserData(data.data()));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="home" style={{ height: "100vh", margin: "1em" }}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" style={{ fontSize: "1rem" }}>
            {userData.name ? `hi, ${userData.name}` : "Login Please"}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userData.name ? (
                <li className="logout">
                  <a className="nav-link" onClick={() => handleSignOut()}>
                    Logout
                  </a>
                </li>
              ) : (
                <li className="logout">
                  <a className="nav-link" href="/login">
                    login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <table
        className="table"
        style={{
          backgroundColor: "white",
          marginTop: "1vh",
          color: "rgb(154, 3, 255)",
          maxWidth: "99vw",
          display: "block",
          overflowX: "scroll",
        }}
      >
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Number</th>
            <th scope="col">Gender</th>
            <th scope="col">Address</th>
            <th scope="col">Mail</th>
            <th scope="col">Id</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"></th>
            <td>{userData.name}</td>
            <td>{userData.number}</td>
            <td>{userData.gender}</td>
            <td>{userData.address}</td>
            <td>{userData.email}</td>
            <td>{userData.id}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Home;
