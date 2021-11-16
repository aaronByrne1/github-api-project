//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
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const { json } = require("express");
const PORT = process.env.PORT || 3001;
app.use(logger("dev"));
app.use(cors());

const { Octokit }=require("@octokit/core");


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });


const octokit = new Octokit({
  auth: "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",
});

const response =   octokit.request('GET /users/{username}', {
    username: 'aaronbyrne1'
  })
console.log("poo")









