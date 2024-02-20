const { body, validationResult } = require('express-validator');
const { readFileJSON } = require('../model');
const bcrypt = require("bcrypt");

const validatorRegisterRules = [
    body("name").notEmpty().isString().withMessage("Nombre invalido"), 
    body("surname").notEmpty().isString().withMessage("Apellido invalido"),
    body("email").notEmpty().isEmail().withMessage("E-mail invalido"),
    body("username").notEmpty().isString().withMessage("Usuario invalido"),
    body("password").notEmpty().isString().isLength({ min: 5 }).withMessage("Contraseña invalida"),
    body("birth-date").notEmpty().isISO8601().withMessage("Fecha invalida"),
    body("cp").notEmpty().isNumeric().withMessage("Codigo postal invalido") 
]

const validatorLoginRules = [
    body("username").notEmpty().isString().withMessage("Usuario invalido"), 
    body("password").notEmpty().isString().isLength({ min: 5 }).withMessage("Contraseña invalida") 
]

const validatorRegisterUser=(req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[1].msg });
    }
    next();
}

const validatorLoginUser=(req, res, next)=>{
    const {username, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[1].msg });
    }
    const users = readFileJSON("users.json");
    const user = users.find((user) => user.username === username);
    if (!user) {
    return res.status(400).json({ errors: "Credenciales invalidas"});
    } 
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
    return res.status(400).json({ errors: "Credenciales invalidas"});
    }
    next();
}

const validatorAdmin=(req, res,next)=>{
    const username = req.session.username;
    if(username != "admin"){
        return res.status(400).json({ error: 'Usuario no permitido' });
    }
    next();
}

module.exports = {validatorRegisterRules, validatorLoginRules , validatorRegisterUser, validatorLoginUser, validatorAdmin};