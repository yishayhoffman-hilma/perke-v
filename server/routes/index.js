var express = require("express");
var router = express.Router();
const path = require("path");
const fs = require("fs");

const ROOT = path.join(__dirname, "../db.json");

router.get("/:username/", function (req, res, next) {
  const username = req.params.username;
  const relativeFilePath = username;

  console.log(`Attempting to serve file: ${relativeFilePath}`);
  console.log(`From root directory: ${ROOT}`);

  fs.readFile(ROOT, "utf8", (err, data) => {
    if (err) {
      res.send("bad path");
      console.log(err);
      return err;
    } else {
      db = JSON.parse(data);
      const user = db.users.find((users) => users.username === username);
      if (!user) {
        res.send("user not found");
      } else {
        res.json(user);
      }
    }
  });
});

router.post("/login/:username", function (req, res, next) {
  const password = req.body.password;
  const username = req.params.username;
  fs.readFile(ROOT, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send("bad path");
      return err;
    } else {
      db = JSON.parse(data);
      const user = db.users.find((users) => users.username === username);
      if (!user) {
        return res.status(404).send("user-not-found");
      }

      if (user) {
        if (password === user.password) {
          return res.status(200).send("login-successful");
        }
        return res.status(400).send("login-failed");
      }
    }
  });
});

module.exports = router;
