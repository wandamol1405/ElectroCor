const express = require("express");
const productsRouter = require("./routes/productsRoutes");
const usersRouter = require("./routes/usersRoutes");
const app = express();
const PORT = 3000;
const session = require("express-session");
app.use(
session({
secret: "mysecret", // Clave secreta para firmar la sesión
resave: false,
saveUninitialized: false,
cookie: { maxAge: 60000 },
})
);

app.use(express.json());

app.use("/products", productsRouter);

app.use("/users", usersRouter);

app.listen(PORT, () => {
    console.log("listening on port ", PORT);
  });
