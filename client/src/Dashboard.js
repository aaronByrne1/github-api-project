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
function Dashboard() {
  const [subscriberData, setSubscriberData] = useState(null);

  useEffect(() => {
    fetch("api/getSubscriberData", {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSubscriberData(data);
        console.log(data[5].login);
      })
      .catch((err) => {
        console.error("Invalid Login", err);
      });
  }, []);
  return (
    <div>
      <h1> Test</h1>
      <Link to="/">Back</Link>{" "}
    </div>
  );
}
export default Dashboard;
