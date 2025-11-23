var express = require("express");
var router = express.Router();
const path = require("path");
const fs = require("fs");

const USERS_ROOT_DIR = path.join(__dirname, "../users/");
/* GET users listing. */
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

  console.log(`Attempting to serve file: ${relativeFilePath}`);
  console.log(`From root directory: ${USERS_ROOT_DIR}`);

  fs.readFile(USERS_ROOT_DIR + relativeFilePath, "utf8", (err, files) => {
    if (err) {
      res.send("bad path");
      console.log(err);
      return err;
    } else {
      console.log(files);
      res.send(files);
    }
  });
});

router.delete("/:username/:file", function (req, res, next) {
  const username = req.params.username;
  const fileName = req.params.file;
  const relativeFilePath = username + "/" + fileName;

  console.log(`Attempting to delete file: ${relativeFilePath}`);
  console.log(`From root directory: ${USERS_ROOT_DIR}`);

  fs.unlink(USERS_ROOT_DIR + relativeFilePath, "utf8", (err, files) => {
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
  const fileName= req.body.fileName;
  let relativeFilePath = username+"/"+fileName ;
  console.log(`Attempting to post file: ${relativeFilePath}`);
  console.log(`To root directory: ${USERS_ROOT_DIR}`);
  
    fs.writeFile(USERS_ROOT_DIR + relativeFilePath, content, (err)=>{
    if (err){      
      console.log(err);
      res.send("failed to create content");
      return err;
    }else{
      res.send(`successfully post ${USERS_ROOT_DIR + relativeFilePath}`);      
    }
    });
});


router.put("/:username/:fileName", function (req, res, next) {
  const username = req.params.username;
  const oldFileName =req.params.fileName;
  const newFileName = req.body.fileName;
  const oldPath = path.join(USERS_ROOT_DIR, username, oldFileName);
  const newPath = path.join(USERS_ROOT_DIR, username, newFileName);

fs.rename(oldPath, newPath, (err) => {
  if (err) {
    console.log(err);
    return res.send("failed to rename file");
  }
  res.send(`successfully renamed to ${newFileName}`);
});
});
module.exports = router;
