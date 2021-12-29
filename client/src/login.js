import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

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
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [inputName, setInputName] = useState(null);
  let navigate = useNavigate();

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
        setUsername(poo.data.login);
        console.log(username);
        setLoggedIn(true);
      })
      .catch((err) => {
        setError(true);
        console.error("Invalid Login", err);
      });
    //console.log(data);
    console.log("The name you entered was:" + token);
    console.log(error);
  };
  if (loggedIn) {
    navigate("/dashboard", { replace: true, state: username });
  }
  const pickUser = (event) => {
    event.preventDefault();

    fetch("api/pickUser", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputName: inputName }),
    })
      .then((response) => response.json())
      .then((poo) => {})

      .catch((err) => {
        setError(true);
        console.error("Invalid Username", err);
      });
    navigate("/dashboard", { replace: true, state: inputName });
  };

  return (
    <div className="Token">
      {!loggedIn ? (
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

          <Button type="submit" onClick={handleClick}>
            Submit
          </Button>
        </form>
      ) : (
        <>
          <h3 className="Welcome">Welcome {username}!</h3>
          <form onSubmit={pickUser}>
            <InputLabel htmlFor="my-input">Enter a Username</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              value={inputName}
              onInput={(event) => setInputName(event.target.value)}
            />
            <FormHelperText id="my-helper-text"></FormHelperText>
            <Button type="submit">Submit</Button>
          </form>
        </>
      )}
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
              Error Occurred Invalid Personal Access Token.{" "}
            </Alert>
          )}
        </Snackbar>
      </div>
    </div>
  );
}

export default Login;
