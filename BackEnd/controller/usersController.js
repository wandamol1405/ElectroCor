const User = require("../models").User;
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  const user = req.body;
  const hashPassword = bcrypt.hashSync(user.password, 10);
  user.password = hashPassword;
  await User.create(user);
  res.json({ msg: "Usuario creado exitosamente" });
};

const login = (req, res) => {
  const user = req.body;
  req.session.username = user.usuario;
  res.cookie("user", user, { maxAge: 900000 });
  res.json({ msg: "Usuario logueado correctamente" });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
    console.error(err);
    } else {
    res.json({msg: "Cierre de sesion exitoso"});
    }
    });
};

const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json({ msg: "Usuarios registrados", data: users });
};

async function findUser(username) {
  try {
    const userFound = await User.findOne({ where: { usuario: username } });
    return userFound.toJSON();
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    return false;
  }
}

const getUserByUsername = async (req, res) =>{
  const {username} = req.params;
  const userFound = await User.findOne({ where: { usuario: username } });
  res.json({msg: `Usuario con username ${username}`, data: userFound});
}

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  res.json({ msg: `Usuario con id ${id}`, data: user });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  await User.update(user, {
    where: {
      id_user: id,
    },
  });
  res.json({ msg: "Usuario actualizado correctamente" });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id_user: id } });
  res.json({ msg: "Usuario eliminado correctamente" });
};

module.exports = {
  addUser,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUser,
  getUserByUsername,
  logout
};
