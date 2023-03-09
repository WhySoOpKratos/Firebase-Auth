import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";

const notify = (e) => {
  if (e === "email") {
    toast("Please enter the Email Id ");
  } else {
    toast("Please enter the Password ");
  }
};

function Login() {
  const Navigate = useNavigate();
  const [submitButtonState, setSubmitButtonState] = useState(true);
  const [signInData, setSignInData] = useState({
    email: "",
    pass: "",
  });

  const handleSubmission = (e) => {
    setSubmitButtonState(false);
    e.preventDefault();

    if (!signInData.email) {
      notify("email");
      setSubmitButtonState(true);
      return;
    }
    if (!signInData.pass) {
      notify("pass");
      setSubmitButtonState(true);
      return;
    }
    signInWithEmailAndPassword(getAuth(), signInData.email, signInData.pass)
      .then((res) => {
        console.log(res);
        setSubmitButtonState(true);
        Navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        toast(err.message.split("auth/")[1].split("-").join(" ").slice(0, -2));
        console.log(signInData);
        setSubmitButtonState(true);
      });
  };

  return (
    <div className="form">
      <div className="container ">
        <h2>Login </h2>
        <hr />
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(event) =>
                setSignInData((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(event) =>
                setSignInData((prev) => ({ ...prev, pass: event.target.value }))
              }
            />
          </div>
          <hr />
          {submitButtonState ? (
            <button
              type="submit"
              id="form-button"
              className="btn btn-primary"
              onClick={(e) => handleSubmission(e)}
            >
              SignIn
            </button>
          ) : (
            <button
              type="submit"
              id="form-button"
              className="btn btn-primary"
              disabled
            >
              SignIn
            </button>
          )}
        </form>
        <div className="form-footer">
          <p>
            Don't have a account ?
            <Link
              className="link"
              to="/signup
              "
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
