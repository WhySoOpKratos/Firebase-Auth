import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../firebase";

const firestore = getFirestore(app);

const notify = (e) => {
  if (e === "name") {
    toast("Please enter the name ");
  } else if (e === "address") {
    toast("Please enter the Address  ");
  } else if (e === "number") {
    toast("Please enter the Number ");
  } else if (e === "numberL") {
    toast("Please enter a valid Number ");
  } else if (e === "gender") {
    toast("Please select a Gender ");
  } else if (e === "email") {
    toast("Please enter the Email Id ");
  } else {
    toast("Please enter the Password ");
  }
};

function Signup() {
  const addData = async (uid) => {
    const ress = await addDoc(collection(firestore, "users"), {
      name: signUpData.name,
      number: signUpData.number,
      gender: signUpData.gender,
      address: signUpData.address,
      email: signUpData.email,
      id: uid,
    });
    console.log(ress, "resData");
  };

  const Navigate = useNavigate();
  const [submitButtonState, setSubmitButtonState] = useState(true);
  const [signUpData, setSignUpData] = useState({
    name: "",
    address: "",
    number: "",
    gender: "",
    email: "",
    pass: "",
    id: "",
  });

  const handleSubmission = (e) => {
    setSubmitButtonState(false);
    console.log(signUpData);

    e.preventDefault();
    if (!signUpData.name) {
      notify("name");
      setSubmitButtonState(true);
      return;
    }
    if (!signUpData.address) {
      notify("address");
      setSubmitButtonState(true);
      return;
    }
    if (!signUpData.number) {
      notify("number");
      setSubmitButtonState(true);
      return;
    }
    if (signUpData.number.length !== 10) {
      notify("numberL");
      setSubmitButtonState(true);
      return;
    }
    if (!signUpData.gender || signUpData.gender === "Select a Gender") {
      notify("gender");
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
        console.log(user);
        addData(user.uid);
        setSubmitButtonState(true);
        Navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        toast(err.message.split("auth/")[1].split("-").join(" ").slice(0, -2));
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
            <label for="exampleInputAddress" className="form-label">
              Address
            </label>
            <input
              className="form-control"
              id="exampleInputAddress1"
              aria-describedby="AddressHelp"
              onChange={(event) =>
                setSignUpData((prev) => ({
                  ...prev,
                  address: event.target.value,
                }))
              }
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputNumber1" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputNumber1"
              aria-describedby="numberHelp"
              onChange={(event) =>
                setSignUpData((prev) => ({
                  ...prev,
                  number: event.target.value,
                }))
              }
            />
          </div>
          <div className="mb-3">
            <label for="floatingSelect">Gender</label>
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              // defaultValue="select"
              onChange={(event) =>
                setSignUpData((prev) => ({
                  ...prev,
                  gender: event.target.value,
                }))
              }
            >
              <option selected>Select a Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
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
            <Link className="link" to="/">
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
