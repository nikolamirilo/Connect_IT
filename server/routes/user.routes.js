const express = require("express");
const { getAllUsers, getUserById, updateUser, createUser, deleteUser } = require("../controllers/user.controllers");

const userRoutes = express.Router();

userRoutes.get("/users", getAllUsers);
userRoutes.get("/users/:id", getUserById);
userRoutes.put("/users/:id", updateUser);
userRoutes.post("/users", createUser);
userRoutes.delete("/users/:id", deleteUser);


module.exports = userRoutes;