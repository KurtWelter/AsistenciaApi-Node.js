//IMPORT
const express = require("express");
const app = express();
//const port = 3000;
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const whiteList = ["http://localhost:8100"]; //http://localhost:8100

//app.use(cors({ origin: whiteList })); //origin: whiteList

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Define allowed methods
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // Define allowed headers
  next();
});

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

async function main() {
  try {
    const classes = await prisma.classAttendance.findMany();
    console.log(classes);

    if (classes.length === 0) {
      console.log("Se ejecuta la query para crear la clase");
      const users = await prisma.user.findMany();

      // const attendanceData = {
      //   subject: "Mate",
      //   date: new Date(),
      // };

      // const attendanceDataTwo = {
      //   subject: "Programación web",
      //   date: new Date(),
      // };

      // await prisma.classAttendance.create({
      //   data: attendanceData,
      // });

      // await prisma.classAttendance.create({
      //   data: attendanceDataTwo,
      // });
    }
  } catch (error) {
    console.log(error);
  }
}

main();

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
    console.log(user);
    if (user.password === password) {
      return response.status(200).send(user);
    }

    return response
      .status(401)
      .send({ data: null, error: "Usuario o contraseña no válida" });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send({ data: null, error: "Usuario o contraseña no válida" });
  }
});

app.get("/classAttendance", async (request, response) => {
  try {
    const classes = await prisma.classAttendance.findMany();
    return response.status(200).send(classes);
  } catch (error) {}
});

app.post("/classAttendance", async (request, response) => {
  try {
    const { userId, classId } = request.body;

    const updatedClassAttendance = await prisma.classAttendance.update({
      where: { id: classId },
      data: {
        attendanceList: {
          connect: { id: userId },
        },
      },
    });

    response.status(200).send(updatedClassAttendance);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("Hubo un error al conectar el usuario a la clase.");
  }
});

// const myFunction = async () => {};
// async function myOtherFunction() {}
