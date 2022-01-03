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

  getLogin()
    .then((loginInfo) => res.json(loginInfo))
    .catch((err) => res.status(404).json(err)); //console.log(err)); //res.json(err));
});

app.post("/api/languagesUsed", (req, res) => {
  username = req.body.inputName;
  getLanguages(username)
    .then((data) => res.json(data))
    .catch((err) => res.send({ message: "Invalid Username" }));
});

app.post("/api/getSubscriberData", (req, res) => {
  username = req.body.inputName;
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

async function getLanguages(enteredName) {
  const data = await octokit.request("GET /users/{username}/repos", {
    username: enteredName,
  });
  var languages = {};
  for (var i = 0; i < data.data.length; i++) {
    const languageData = await octokit.request(
      "GET /repos/{owner}/{repo}/languages",
      {
        owner: enteredName,
        repo: data.data[i].name,
      }
    );

    for (var key of Object.keys(languageData.data)) {
      console.log(key + " -> " + languageData.data[key]);
      if (languages[key] === undefined) {
        languages[key] = languageData.data[key];
      } else {
        languages[key] += languageData.data[key];
      }
    }
  }
  var labels = [];
  var languageUsage = [];
  var languagesReturned = {};
  for (var key of Object.keys(languages)) {
    labels.push(key);
    languageUsage.push(languages[key]);
  }
  languagesReturned.labels = labels;
  languagesReturned.languageUsage = languageUsage;
  return new Promise(function (resolve, reject) {
    resolve(languagesReturned);
    reject(error);
  });
}
