const User = require("../models").User;
const bcrypt = require("bcrypt");

const addUser = async (req, res)=>{
    const user = req.body;
    const hashPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashPassword;
    await User.create(user);
    res.json({msg: "Usuario creado exitosamente"});
};

const login = (req, res)=>{
    const user = req.body;
    req.session.username = user.username;
    res.json({msg: `Bienvenido ${req.session.username}!`})
}

const getUsers = async (req, res) =>{
    const users = await User.findAll();
    res.json({msg:"Usuarios registrados", data: users});
}

const getUserById = async (req, res) =>{
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.json({msg:`Usuario con id ${id}`, data: user});
}

const updateUser = async (req, res) => {
    const {id}=req.params;
    const user = req.body;
    await User.update(user, {
        where:{
            id_user: id
        }
    });
    res.json({msg:"Usuario actualizado correctamente"});
}

const deleteUser = async(req,res)=>{
    const { id } = req.params;
    await User.destroy({where:{id_user: id}});
    res.json({msg: "Usuario eliminado correctamente"}); 
}

module.exports = {addUser, login, getUsers, getUserById, updateUser, deleteUser};