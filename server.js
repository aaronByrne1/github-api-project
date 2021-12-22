//
const express = require("express");
//const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const { Octokit, App } = require("octokit");

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
  console.log(username);
});

app.get("/api/getSubscriberData", (req, res) => {
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

async function getUserInfo() {
  const data = await octokit.request("GET /users/{username}", {
    username: "aaronbyrne1",
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
  console.log(username);
  //const login = await octokit.rest.users.getAuthenticated();
  const data = await octokit.request("GET /users/{username}/followers", {
    username: username,
  });
  var followerAmount = data.data.length;

  return new Promise(function (resolve, reject) {
    resolve(data);
    reject(error);
  });
}
