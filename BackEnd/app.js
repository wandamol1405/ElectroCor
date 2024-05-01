const express = require("express");
const productsRouter = require("./routes/productsRoutes");
const usersRouter = require("./routes/usersRoutes");
const app = express();
const PORT = 3000;
const session = require("express-session");
const cors = require("cors");
const categoryRouter = require("./routes/categoryRoutes");
const saleOrderRouter = require("./routes/saleOrderRoutes");

app.use(
session({
secret: "mysecret",
resave: false,
saveUninitialized: false,
cookie: { maxAge: 60000 },
})
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/products", productsRouter);

app.use("/users", usersRouter);

app.use("/category", categoryRouter);

app.use("/sale-order", saleOrderRouter);

app.listen(PORT, () => {
    console.log("listening on port ", PORT);
  });
