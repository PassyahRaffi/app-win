const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFiles");

const { register, login, checkAuth } = require("../controller/auth");
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

// CRUD = CREATE, READ, UPDATE, DELETE
const {
  addUsers,
  getUser,
  getUsers,
  updateUser,
  updateUserImage,
  deleteUser,
} = require("../controller/user");
router.post("/user", addUsers);
router.get("/getUser/:id", getUser);
router.get("/users", getUsers);
router.patch("/user/:id", auth, updateUser);
router.patch("/user/edit/image/:id", uploadFile("image"), updateUserImage);
router.delete("/user/:id", auth, deleteUser);

module.exports = router;
