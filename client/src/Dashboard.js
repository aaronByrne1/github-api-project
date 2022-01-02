import React, { useState, useEffect } from "react";
import "./App.css";
import SearchAppBar from "./SearchAppBar";

import { useLocation } from "react-router-dom";
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
import { Avatar, CircularProgress } from "@mui/material";
function Dashboard() {
  const [followerData, setFollowerData] = useState([]);
  const [loginData, setLoginData] = useState([]);
  const [displayPie, setDisplayPie] = useState(true);
  const [avatarURL, setAvatarURL] = useState(null);
  const [error, setError] = useState(false);
  const [enteredName, setEnteredName] = useState(false);
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
    setError(false);
    getSubscribeData(returnedUserInput);
    setEnteredName(true);
  };

  const getSubscribeData = (returnedUserInput) => {
    fetch("api/getSubscriberData", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputName: returnedUserInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setError(true);
        } else {
          setFollowerData(data.followers);
          setLoginData(data.login);
          setAvatarURL(data.avatar);
          setError(false);
        }
      })
      .catch((err) => {
        setError(true);
        console.log("success");
        console.error("Invalid Login", err);
      });
  };
  console.log(error);

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
  if (avatarURL != null) {
    console.log(avatarURL);
  }
  return (
    <div className="background">
      <div className="dashboard">
        <SearchAppBar
          parentToChild={searchBarName}
          childToParent={childToParent}
        ></SearchAppBar>

        {/*<Link to="/" style={{ color: "black" }}>
        Back
  </Link>*/}
        {!enteredName ? (
          <div style={{ width: "100%", height: "100%" }}>
            <h3>Please Enter a GitHub Username to see analytics.</h3>
          </div>
        ) : (
          <div>
            {error ? (
              <h4>Invalid Username entered.</h4>
            ) : (
              <div>
                {loginData === undefined || loginData.length === 0 ? (
                  <div className="loading">
                    <CircularProgress color="grey" />
                  </div>
                ) : (
                  <div>
                    <Avatar
                      alt="Remy Sharp"
                      src={avatarURL}
                      sx={{ width: 120, height: 120 }}
                    />
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
                      <Button
                        variant="contained"
                        type="submit"
                        onClick={handleClick}
                      >
                        Change Graph
                      </Button>
                    </div>
                    <h4 style={{ color: "charcoal" }}>
                      {" "}
                      {inputName} has {loginData.length} followers. These are
                      the amount of followers your followers have.
                    </h4>
                    {displayPie ? (
                      <div>
                        <Pie
                          data={data}
                          width={750}
                          height={750}
                          options={{
                            maintainAspectRatio: false,
                            borderColor: "black",
                          }}
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default Dashboard;
