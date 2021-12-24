import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
} from "@mui/material";
function Dashboard(props) {
  const [followerData, setFollowerData] = useState([]);
  const [loginData, setLoginData] = useState([]);
  const [displayPie, setDisplayPie] = useState(true);
  const { state } = this.props.location;

  const handleClick = () => {
    if (displayPie) {
      setDisplayPie(false);
    } else {
      setDisplayPie(true);
    }
  };

  useEffect(() => {
    fetch("api/getSubscriberData", {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFollowerData(data.followers);
        setLoginData(data.login);
      })
      .catch((err) => {
        console.error("Invalid Login", err);
      });
  }, []);
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
    <div>
      <Link to="/">Back</Link>
      <Button type="submit" onClick={handleClick}>
        Change Graph
      </Button>
      <h4>
        {" "}
        {state} has {loginData.length} followers. These are the amount of
        followers your followers have.
      </h4>
      {displayPie ? (
        <div>
          <Pie
            data={data}
            width={750}
            height={750}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      ) : (
        <div>
          <Bar options={options} width={200} height={50} data={dataForGraph} />
        </div>
      )}
    </div>
  );
}
export default Dashboard;
