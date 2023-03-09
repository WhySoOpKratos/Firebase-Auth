import React from "react";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div>
      <h1 style={{ color: "white" }}>
        {props.name ? `Welcome - ${props.name}` : "Login please"}
      </h1>
      <Link className="link" to="/signup">
        Signup
      </Link>
      <Link className="link" to="/login">
        Login
      </Link>
    </div>
  );
}

export default Home;
