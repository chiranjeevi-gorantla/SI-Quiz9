const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios").default;

const PORT = process.env.PORT || 3000;
const app = express();
const AWS_NAME_API =
  "https://my6rvma7cl.execute-api.us-east-1.amazonaws.com/prod/say-api";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.send(
    "Homepage"
  );
});

app.get("/say", (req, res) => {
  let keyword = req.query.keyword;
  axios
    .post(AWS_NAME_API, { keyword })
    .then((response) => {
      return res.status(response.status).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Server error");
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));