const { readFileJSON, writeFileJSON } = require(".");
const { uuid } =require("uuidv4");
const bcrypt = require("bcrypt");
const dbFile ="users.json";

const User = {
    create: function(usuario){
        const usuarios = readFileJSON(dbFile);
        const hashPassword = bcrypt.hashSync(usuario.password, 10);
        usuario.password = hashPassword;
        usuarios.push({
            id: uuid(),
            ...usuario
        });
        writeFileJSON(dbFile, usuarios);
    },
    findAll: function(){
        return readFileJSON(dbFile);
    },
    findById: function(id){
        const usuarios = readFileJSON(dbFile);
        const usuario = usuarios.find((user)=> user.id === id);
        return usuario;
    },
    updateUser: function(id, user){
        const usuarios = readFileJSON(dbFile);
        const indexUsuario = usuarios.findIndex((user)=> user.id === id);
        const hashPassword = bcrypt.hashSync(user.password, 10);
        user.password = hashPassword;
        usuarios[indexUsuario]={
            ...usuarios[indexUsuario],
            ...user
        }
        writeFileJSON(dbFile, usuarios);
    },
    removeUser: function(id){
        const usuarios = readFileJSON(dbFile);
        const indexUsuario = usuarios.findIndex((user)=>user.id === id);
        usuarios.splice(indexUsuario, 1);
        writeFileJSON(dbFile, usuarios);
    }

}

module.exports = User;