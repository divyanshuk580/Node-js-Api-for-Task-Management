const express = require("express");
const router = express.Router();
const {
  createUser,
  showUserList,
  findUserByEmail,
  updateUserById,
  userDetailById,
  deleteUserById,
  restoreUserById,
  login,
  logout
} = require("../Controllers/user.controller");
// const router = require("express").router();
const { checkToken } = require("../auth/token_validation");

router.post("/", createUser);
router.get("/", checkToken, showUserList);
router.post("/findbyemail", findUserByEmail);
router.put("/:id", checkToken, updateUserById);
router.get("/detail/:id", checkToken, userDetailById);
router.get("/delete/:id", checkToken, deleteUserById);
router.get("/restore/:id", checkToken, restoreUserById);
router.post("/login", login);
router.get("/logout",logout);

module.exports = router;
