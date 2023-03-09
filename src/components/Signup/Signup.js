import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { auth, app } from "../../firebase";

const notify = (e) => {
  if (e === "name") {
    toast("Please enter the name ");
  } else if (e === "email") {
    toast("Please enter the Email Id ");
  } else {
    toast("Please enter the Password ");
  }
};

const db = getFirestore(app); // add this line

function Signup() {
  const Navigate = useNavigate();
  const [submitButtonState, setSubmitButtonState] = useState(true);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    pass: "",
  });

  const handleSubmission = (e) => {
    setSubmitButtonState(false);
    e.preventDefault();
    if (!signUpData.name) {
      notify("name");
      setSubmitButtonState(true);
      return;
    }
    if (!signUpData.email) {
      notify("email");
      setSubmitButtonState(true);
      return;
    }
    if (!signUpData.pass) {
      notify("pass");
      setSubmitButtonState(true);
      return;
    }
    createUserWithEmailAndPassword(auth, signUpData.email, signUpData.pass)
      .then(async (res) => {
        console.log(res);
        const user = res.user;
        await updateProfile(user, {
          displayName: signUpData.name,
        });

        const usersCollection = collection(db, "users");
        await addDoc(usersCollection, {
          uid: user.uid,
          name: signUpData.name,
          email: signUpData.email,
        });

        setSubmitButtonState(true);
        Navigate("/");
      })
      .catch((err) => {
        console.log(err);
        console.log(signUpData);
        setSubmitButtonState(true);
      });
  };
  return (
    <div className="form">
      <div className="container ">
        <h2>Create your Account</h2>
        <hr />
        <form>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              Name
            </label>
            <input
              className="form-control"
              id="exampleInputName1"
              aria-describedby="NameHelp"
              onChange={(event) =>
                setSignUpData((prev) => ({ ...prev, name: event.target.value }))
              }
            />
          </div>
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
                setSignUpData((prev) => ({
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
                setSignUpData((prev) => ({ ...prev, pass: event.target.value }))
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
              SignUp
            </button>
          ) : (
            <button
              type="submit"
              id="form-button"
              className="btn btn-primary"
              disabled
            >
              SignUp
            </button>
          )}
        </form>
        <div className="form-footer" style={{ fontSize: "2vh" }}>
          <p>
            Already have a account ?
            <Link className="link" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Signup;
