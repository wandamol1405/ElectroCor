const express = require('express');
const { addUser, login, getUsers, getUserById, updateUser, deleteUser } = require('../controller/usersController');
const { validatorRegisterRules, validatorLoginRules, validatorLoginUser, validatorRegisterUser, validatorAdmin} = require('../middlewares/userValidator');
const usersRouter = express.Router();

usersRouter.post("/register",validatorRegisterRules, validatorRegisterUser, addUser);

usersRouter.post("/login", validatorLoginRules, validatorLoginUser, login);

usersRouter.get("/", validatorAdmin, getUsers);

usersRouter.get("/:id", validatorAdmin, getUserById);

usersRouter.put("/:username", updateUser);

usersRouter.delete("/:username", deleteUser);

module.exports = usersRouter;