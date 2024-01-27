const User = require("../model/User");

const addUser = (req, res)=>{
    const user = req.body;
    User.create(user);
    res.json({msg: "Usuario creado exitosamente"});
};

const login = (req, res)=>{
    const user = req.body;
    req.session.username = user.username;
    res.json({msg: `Bienvenido ${req.session.username}!`})
}

const getUsers = (req, res) =>{
    const users = User.findAll();
    res.json({msg:"Usuarios registrados", data: users});
}

const getUserById = (req, res) =>{
    const { id } = req.params;
    const user = User.findById(id);
    res.json({msg:`Usuario con id ${id}`, data: user});
}

const updateUser = (req, res) => {
    const {username}=req.params;
    const user = req.body;
    User.updateUser(username, user);
    res.json({msg:"Usuario actualizado correctamente"});
}

const deleteUser = (req,res)=>{
    const { username } = req.params;
    User.removeUser(username);
    res.json({msg: "Usuario eliminado correctamente"}); 
}

module.exports = {addUser, login, getUsers, getUserById, updateUser, deleteUser};