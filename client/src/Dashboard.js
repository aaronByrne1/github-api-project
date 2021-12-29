import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import SearchAppBar from "./SearchAppBar";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

import { Pie } from "react-chartjs-2";

import Button from "@mui/material/Button";
import {
  InputLabel,
  Input,
  FormControl,
  FormHelperText,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
function Dashboard() {
  const [followerData, setFollowerData] = useState([]);
  const [loginData, setLoginData] = useState([]);
  const [displayPie, setDisplayPie] = useState(true);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(false);
  const { state } = useLocation();
  const [searchBarName, setSearchBarName] = useState(null);
  const [inputName, setInputName] = useState(null);

  const handleClick = () => {
    if (displayPie) {
      setDisplayPie(false);
    } else {
      setDisplayPie(true);
    }
  };

  /*const pickUser = (event) => {
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

    console.log(inputName);
    console.log(update);
  };*/

  useEffect(() => {
    parentToChild();
  }, []); //update

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of followers",
      },
    },
  };

  const parentToChild = () => {
    setSearchBarName(state);
  };

  const childToParent = (returnedUserInput) => {
    setInputName(returnedUserInput);
    setLoginData([]);
    getSubscribeData(returnedUserInput);
    /*fetch("/api/pickUser", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputName: inputName }),
    })
      .then((response) => response.json())
      .then(() => {
        getSubscribeData();
      })

      .catch((err) => {
        setError(true);
        console.error("Invalid Username", err);
      });*/
  };
  const getSubscribeData = (returnedUserInput) => {
    console.log(inputName);
    fetch("api/getSubscriberData", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputName: returnedUserInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFollowerData(data.followers);
        setLoginData(data.login);
      })
      .catch((err) => {
        console.error("Invalid Login", err);
      });
  };

  const dataForGraph = {
    labels: loginData,
    datasets: [
      {
        data: followerData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
      },
    ],
  };

  const data = {
    labels: loginData,
    datasets: [
      {
        label: "# of Followers",
        data: followerData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <SearchAppBar
        parentToChild={searchBarName}
        childToParent={childToParent}
      ></SearchAppBar>
      {/*<Link to="/" style={{ color: "black" }}>
        Back
  </Link>*/}
      {loginData.length === 0 ? (
        <div className="loading">
          <CircularProgress color="grey" />
        </div>
      ) : (
        <div>
          {/*<div className="inputBar">
            <form onSubmit={pickUser}>
              <InputLabel htmlFor="my-input">Enter a Username</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                value={inputName}
                onInput={(event) => setInputName(event.target.value)}
              />
              <FormHelperText id="my-helper-text"></FormHelperText>
              <Button
                type="submit"
                onClick={() => {
                  if (!update) {
                    setUpdate(true);
                  } else {
                    setUpdate(false);
                  }
                }}
              >
                Submit
              </Button>
            </form>
          </div>*/}
          <div className="changeGraph">
            <Button variant="contained" type="submit" onClick={handleClick}>
              Change Graph
            </Button>
          </div>
          <h4 style={{ color: "charcoal" }}>
            {" "}
            {inputName} has {loginData.length} followers. These are the amount
            of followers your followers have.
          </h4>
          {displayPie ? (
            <div>
              <Pie
                data={data}
                width={750}
                height={750}
                options={{ maintainAspectRatio: false, borderColor: "black" }}
              />
            </div>
          ) : (
            <div>
              <Bar
                options={options}
                width={200}
                height={50}
                data={dataForGraph}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Dashboard;
