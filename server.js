//
const express = require("express");
//const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const { Octokit } = require("octokit");

const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger("dev"));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
/*const octokit = new Octokit({
  auth: ``,
});*/
var octokit = null;
var username = null;
app.post("/api/login", (req, res) => {
  var token = req.body.token;
  octokit = new Octokit({
    auth: token,
  });

  getLogin().then((loginInfo) => res.json(loginInfo));
});

app.post("/api/pickUser", (req, res) => {
  username = req.body.inputName;
});

app.post("/api/getSubscriberData", (req, res) => {
  username = req.body.inputName;
  console.log(username);
  getFollowersList().then((data) => res.json(data));
});

async function getLogin() {
  const data = await octokit.rest.users.getAuthenticated();

  return new Promise(function (resolve, reject) {
    resolve(data);
    reject(error);
  });
}

async function getUserInfo(login) {
  const data = await octokit.request("GET /users/{username}", {
    username: login,
  });
  return new Promise(function (resolve, reject) {
    resolve(data);
    reject(error);
  });
}
if (octokit != null) {
  getUserInfo().then((poo) => {
    console.log(poo);
  });
}
/*getLogin().then((poo) => {
  console.log("Hello, " + poo.data.bio);
});*/
// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user

async function getFollowersList() {
  const tempData = await octokit.paginate("GET /users/{username}/followers", {
    username: username,
  });
  console.log(tempData);
  var followerAmount = tempData.length;
  var followersArray = [];
  var loginArray = [];
  var returnedData = {};

  console.log(followerAmount);
  for (var i = 0; i < followerAmount; i++) {
    const data = await octokit.request("GET /users/{username}", {
      username: tempData[i].login,
    });
    loginArray.push(data.data.login);
    followersArray.push(data.data.followers);
  }
  returnedData.login = loginArray;
  returnedData.followers = followersArray;
  console.log(JSON.stringify(followersArray));
  return new Promise(function (resolve, reject) {
    resolve(returnedData);
    reject(error);
  });
}

async function getFollowersJson(login) {
  const data = await octokit.request("GET /users/{username}", {
    username: login,
  });
  var returnedData = {};
  returnedData.login = data.data.login;
  returnedData.followers = data.data.followers;

  return new Promise(function (resolve, reject) {
    resolve(returnedData);
    reject(error);
  });
}
