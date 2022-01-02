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
  console.log(token);
  octokit = new Octokit({
    auth: token,
  });

  getLogin()
    .then((loginInfo) => res.json(loginInfo))
    .catch((err) => res.status(404).json(err)); //console.log(err)); //res.json(err));
});

app.post("/api/pickUser", (req, res) => {
  username = req.body.inputName;
});

app.post("/api/getSubscriberData", (req, res) => {
  username = req.body.inputName;
  console.log(username);
  getFollowersList(username)
    .then((data) => res.json(data))
    .catch((err) => res.send({ message: "Invalid Username" }));
});

async function getLogin() {
  const data = await octokit.rest.users.getAuthenticated();

  return new Promise(function (resolve, reject) {
    resolve(data);
    reject(error);
  });
}

async function getUserInfo() {
  const data = await octokit.request("GET /users/{username}", {
    username: username,
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

async function getFollowersList(enteredName) {
  const avatarData = await octokit.request("GET /users/{username}", {
    username: enteredName,
  });

  var avatarURL = avatarData.data.avatar_url;
  const tempData = await octokit.paginate("GET /users/{username}/followers", {
    username: enteredName,
  });
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
  returnedData.avatar = avatarURL;
  console.log(returnedData.avatar);
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
