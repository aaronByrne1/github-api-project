import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Button from "@mui/material/Button";
import {
  InputLabel,
  Input,
  FormControl,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";

function Login() {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("api/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    })
      .then((response) => response.json())
      .then((poo) => {
        console.log(poo.data.login);
      })
      .catch((err) => {
        setError(true);
        console.error("Invalid Login", err);
      });
    //console.log(data);
    console.log("The name you entered was:" + token);
    console.log(error);
  };

  /**/

  return (
    <div className="Token">
      <form onSubmit={handleSubmit}>
        <InputLabel htmlFor="my-input">Personal Access Token</InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          value={token}
          onInput={(event) => setToken(event.target.value)}
        />
        <FormHelperText id="my-helper-text">
          This token can be generated on Github.com
        </FormHelperText>

        <Link to="/dashboard">
          <Button type="submit" onClick={handleClick}>
            Submit
          </Button>
        </Link>
      </form>
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          {!error ? (
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              You have successfully logged in!{" "}
            </Alert>
          ) : (
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Error Occurred{" "}
            </Alert>
          )}
        </Snackbar>
      </div>
    </div>
  );
}

export default Login;
