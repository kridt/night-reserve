import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import "./LogInSite.scss";

export default function LogInSite() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleLogIn(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      setLoading(true);
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log("Log ind", user);
          // ...

          navigate("/dashboard");
        })
        .catch((error) => {
          setLoading(false);
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          alert("Forkert email eller adgangskode");
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Log ind</h1>

      <div className="login">
        <form onSubmit={(e) => handleLogIn(e)}>
          <div>
            <label>Email:</label>
            <input required type="email" name="email" />
          </div>
          <div>
            <label>Adgangskode:</label>
            <input required type="password" name="password" />
          </div>

          {loading ? (
            <CircularProgress />
          ) : (
            <input className="submit" type="submit" value={"Log Ind"} />
          )}

          <p>
            Har du ikke en profil? <Link to={"/signUp"}>Opret en her!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
