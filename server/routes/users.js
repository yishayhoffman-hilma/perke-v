var express = require("express");
var router = express.Router();
const path = require("path");
const fs = require("fs");

const USERS_ROOT_DIR = path.join(__dirname, "../users/");

router.get("/:username", function (req, res, next) {
  const username = req.params.username;
  const relativeFilePath = username;

  console.log(`Attempting to serve file: ${relativeFilePath}`);
  console.log(`From root directory: ${USERS_ROOT_DIR}`);

  fs.readdir(USERS_ROOT_DIR + username, (err, files) => {
    if (err) {
      res.send("bad path");
      console.log(err);
      return err;
    } else {
      res.json(files);
    }
  });
});

router.get("/:username/:file", function (req, res, next) {
  const username = req.params.username;
  const fileName = req.params.file;
  const relativeFilePath = username + "/" + fileName;

  const pathToUse = USERS_ROOT_DIR + relativeFilePath;
  console.log(`Attempting to serve file: ${relativeFilePath}`);
  console.log(`From root directory: ${USERS_ROOT_DIR}`);

  fs.stat(pathToUse, (err, stats) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.log(`Path does not exist: ${pathToUse}`);
      } else {
        console.error(`Error checking path: ${err.message}`);
      }
      return;
    }

    if (stats.isFile()) {
      myReadFile(pathToUse, res);
    } else if (stats.isDirectory()) {
      myReadDir(pathToUse, res);
    } else {
      console.log(
        `${pathToUse} is neither a file nor a directory (e.g., a symbolic link, device, etc.).`
      );
    }
  });
});

router.delete("/:username/:file", function (req, res, next) {
  const username = req.params.username;
  const fileName = req.params.file;
  const relativeFilePath = username + "/" + fileName;

  console.log(`Attempting to delete file: ${relativeFilePath}`);
  console.log(`From root directory: ${USERS_ROOT_DIR}`);

  fs.unlink(USERS_ROOT_DIR + relativeFilePath, (err, files) => {
    if (err) {
      console.log(err);
      res.send("failed to delete");
      return err;
    } else {
      console.log(files);
      res.send(`successfully deleted ${USERS_ROOT_DIR + relativeFilePath}`);
    }
  });
});

router.post("/:username", function (req, res, next) {
  const username = req.params.username;
  const content = req.body.content;
  const fileName = req.body.fileName;

  console.log(req.body);

  let relativeFilePath = username + "/" + fileName;
  console.log(`Attempting to post file: ${relativeFilePath}`);
  console.log(`To root directory: ${USERS_ROOT_DIR}`);

  fs.writeFile(USERS_ROOT_DIR + relativeFilePath, content, (err) => {
    if (err) {
      console.log(err);
      res.send("failed to create content");
      return err;
    } else {
      res.send(`successfully post ${USERS_ROOT_DIR + relativeFilePath}`);
    }
  });
});

//rename
router.put("/:username/:fileName", function (req, res, next) {
  const username = req.params.username;
  const oldFileName = req.params.fileName;
  const newFileName = req.body.fileName;

  const oldPath = path.join(USERS_ROOT_DIR, username, oldFileName);
  const newPath = path.join(USERS_ROOT_DIR, username, newFileName);

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.log(err);
      res.send("failed to rename file");
      return;
    }
    res.send(`successfully renamed to ${newFileName}`);
  });
});

function myReadFile(myPath, res) {
  fs.readFile(myPath, "utf8", (err, files) => {
    if (err) {
      res.send("bad path");
      console.log(err);
      return err;
    } else {
      console.log(files);
      res.send(files);
    }
  });
}

function myReadDir(myPath, res) {
  fs.readdir(myPath, (err, files) => {
    if (err) {
      res.send("bad path");
      console.log(err);
      return err;
    } else {
      res.json(files);
    }
  });
}
module.exports = router;
