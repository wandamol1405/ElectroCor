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
    req.session.username = user.usuario;
    res.redirect("http://localhost:5173/loginSuccesful")
}

const getUsers = async (req, res) =>{
    const users = await User.findAll();
    res.json({msg:"Usuarios registrados", data: users});
}

async function getUsersArray() {
    try {
      const users = await User.findAll(); 
      const usersArray = users.map(user => user.toJSON()); 
      return usersArray;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return []; 
    }
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

module.exports = {addUser, login, getUsers, getUserById, updateUser, deleteUser, getUsersArray};