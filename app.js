//IMPORT
const express = require("express");
const app = express();
//const port = 3000;
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const whiteList = ["http://localhost:8100"];

app.use(cors({ origin: whiteList }));

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

//nodemon app.js

//Los datos de los Roles
app.get("/roles", async (request, response) => {
  try {
    const roles = await prisma.role.findMany();
    response.send(roles);
  } catch (error) {}
});
//Se obtienen los datos del login
app.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user.password === password) {
      return response.status(200).send(user);
    }

    return response
      .status(401)
      .send({ data: null, error: "Usuario o contraseña no válida" });
  } catch (error) {
    return response
      .status(500)
      .send({ data: null, error: "Usuario o contraseña no válida" });
  }
});

//app.post("/classAtendance", async (request, resonse) => {
// try {
//const { date, subject, name } = request.body;
// } //catch (error) {}
//});

// const myFunction = async () => {};
// async function myOtherFunction() {}
