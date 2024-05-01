const express = require('express');
const { addUser, login, getUsers, getUserById, updateUser, deleteUser, getUserByUsername, logout } = require('../controller/usersController');
const { validatorRegisterRules, validatorLoginRules, validatorLoginUser, validatorRegisterUser, validatorAdmin} = require('../middlewares/userValidator');
const usersRouter = express.Router();

usersRouter.post("/register",validatorRegisterRules, validatorRegisterUser, addUser);

usersRouter.post("/login", validatorLoginRules, validatorLoginUser, login);

usersRouter.post("/logout", logout);

usersRouter.get("/", validatorAdmin, getUsers);

usersRouter.get("/confirm-buy/:username", getUserByUsername);

usersRouter.get("/:id", validatorAdmin, getUserById);

usersRouter.put("/:id", updateUser);

usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;