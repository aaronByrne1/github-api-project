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

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Pie } from "react-chartjs-2";

import Button from "@mui/material/Button";
import { Avatar, CircularProgress } from "@mui/material";
function Dashboard() {
  const [followerData, setFollowerData] = useState([]);
  const [loginData, setLoginData] = useState([]);
  const [languageData, setLanguageData] = useState([]);
  const [labelsForLanguages, setLabelsForLanguages] = useState([]);
  const [displayPie, setDisplayPie] = useState(true);
  const [avatarURL, setAvatarURL] = useState(null);
  const [error, setError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [displayLanguageData, setDisplayLanguageData] = useState(false);
  const [labelsForGraph, setLabelsForGraph] = useState([]);
  const [conditionalData, setConditionalData] = useState([]);
  const [sentence, setSentence] = useState(null);

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
  const handleChange = () => {
    if (displayLanguageData) {
      setConditionalData(followerData);
      setLabelsForGraph(loginData);
      setDisplayLanguageData(false);
    } else {
      setConditionalData(languageData);
      setLabelsForGraph(labelsForLanguages);
      setDisplayLanguageData(true);
    }
  };

  const getLanguageData = (returnedUserInput) => {
    fetch("api/languagesUsed", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputName: returnedUserInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setLanguageError(true);
        } else {
          setLabelsForLanguages(data.labels);
          setLanguageData(data.languageUsage);
          setLanguageError(false);
        }
      })

      .catch((err) => {
        setError(true);
        console.error("Invalid Username", err);
      });
  };

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
      },
    },
  };

  const parentToChild = () => {
    setSearchBarName(state);
  };

  const childToParent = (returnedUserInput) => {
    setInputName(returnedUserInput);
    setLoginData([]);
    setLabelsForLanguages([]);
    setLanguageData([]);
    setError(false);
    setLanguageError(false);
    getSubscribeData(returnedUserInput);
    getLanguageData(returnedUserInput);
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
          setConditionalData(data.followers);
          setLabelsForGraph(data.login);
          setDisplayLanguageData(false);
          setSentence(
            "$inputName has $loginData.length followers. These are the amount of followers his/her followers have."
          );
        }
      })
      .catch((err) => {
        setError(true);
        console.error("Invalid Login", err);
      });
  };

  const dataForGraph = {
    labels: labelsForGraph,
    datasets: [
      {
        data: conditionalData,
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
    labels: labelsForGraph,
    datasets: [
      {
        data: conditionalData,
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
    <div className="background">
      <div className="dashboard">
        <SearchAppBar
          parentToChild={searchBarName}
          childToParent={childToParent}
        ></SearchAppBar>
        {!enteredName ? (
          <div style={{ width: "100%", height: "100%" }}>
            <h3>Please Enter a GitHub Username to see analytics.</h3>
          </div>
        ) : (
          <div>
            {error || languageError ? (
              <h4>
                Invalid Username entered or problem with obtaining language
                information.
              </h4>
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
                    <div style={{ padding: 20 }}>
                      <div>
                        <Button
                          variant="contained"
                          type="submit"
                          onClick={handleChange}
                        >
                          Change Dataset
                        </Button>
                      </div>
                    </div>

                    <div className="changeGraph">
                      <Button
                        variant="contained"
                        type="submit"
                        onClick={handleClick}
                      >
                        Change Graph
                      </Button>
                    </div>
                    {!displayLanguageData ? (
                      <h4 style={{ color: "charcoal", padding: 20 }}>
                        {" "}
                        {inputName} has {loginData.length} followers. These are
                        the amount of followers his/her followers have. Click on
                        someones name to unfilter/filter them.
                      </h4>
                    ) : (
                      <h4 style={{ color: "charcoal", padding: 20 }}>
                        {" "}
                        {inputName} has used {labelsForLanguages.length}{" "}
                        languages. The graphs show how much she has used each
                        language. Click on someones name to unfilter/filter
                        them.
                      </h4>
                    )}

                    {displayPie ? (
                      <div>
                        <Pie
                          data={data}
                          width={500}
                          height={500}
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
