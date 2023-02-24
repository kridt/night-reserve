import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "../firebase/firebase";
import "./SignUpSite.scss";

export default function SignUpSite() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();

    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const address = e.target.address.value;
    const zipcode = e.target.zipcode.value;
    const city = e.target.city.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    const birthday = e.target.birthday.value;

    try {
      setLoading(true);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log("Opret profil", user);
          database.collection("users").doc(user.uid).set({
            firstname,
            lastname,
            address,
            zipcode,
            city,
            phone,
            email,
            "user-id": user.uid,
          });
          // ...

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem(
            "userCred",
            JSON.stringify({
              firstname,
              lastname,
              address,
              zipcode,
              city,
              phone,
              email,
              "user-id": user.uid,
            })
          );
          navigate("/dashboard");
        })
        .catch((error) => {
          setLoading(false);
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          alert("noget gik galt, prøv igen");
        });
    } catch (error) {
      console.log(error);
    }

    console.log("handleSignUp", {
      firstname,
      lastname,
      address,
      zipcode,
      city,
      phone,
      email,
      password,
      password2,
      birthday,
    });
  }

  return (
    <div>
      <h1>Opret Profil</h1>

      <div className="signup">
        <form onSubmit={(e) => handleSignUp(e)}>
          <div>
            <label>Fornavn:</label>
            <input required type="text" name="firstname" />
          </div>

          <div>
            <label>Efternavn:</label>
            <input required type="text" name="lastname" />
          </div>
          <div>
            <label>Adresse:</label>
            <input required type="text" name="address" />
          </div>

          <div>
            <label>Postnummer:</label>
            <input required type="tel" name="zipcode" />
          </div>

          <div>
            <label>By:</label>
            <input required type="text" name="city" />
          </div>

          <div>
            <label>Telefon nummer:</label>
            <input required type="tel" name="phone" />
          </div>

          <div>
            <label>Fødselsdag:</label>
            <input required type="date" name="birthday" />
          </div>

          <div>
            <label>Email:</label>
            <input required type="email" name="email" />
          </div>
          <div>
            <label>Adgangskode:</label>
            <input required type="password" name="password" />
          </div>
          <div>
            <label>Gentag adgangskode:</label>
            <input required type="password" name="password2" />
          </div>

          {loading ? (
            <CircularProgress />
          ) : (
            <input className="submit" type="submit" value={"Opret"} />
          )}

          <p>
            Har du allerede in profil? <Link to="/">Log ind her!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
