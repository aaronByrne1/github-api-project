import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";

import Button from "@mui/material/Button";
import { InputLabel, Input, FormControl, FormHelperText } from "@mui/material";

function Login() {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);

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
      .catch((error) => {
        console.error("Invalid Login", error);
      });
    //console.log(data);
    console.log("The name you entered was:" + token);
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
        <Button type="submit" onClick={() => console.log("clicked")}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Login;
