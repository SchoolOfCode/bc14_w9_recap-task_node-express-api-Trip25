import express from "express";

//import all the functions from the users.js file
import {
  getUsers,
  getUserByID,
  createUser,
  updateUserByID,
  deleteUserByID,
} from "./users.js";

const app = express();
const port = 3000;

app.use(express.json());

// app.use("/", (req, res) => {
//   res.json({
//     status: true,
//     payload: "This route works!",
//   });
// });

// Custom middleware
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} to ${req.path}`);
//   next(); // Don't forget to call next()!
// });
// app.use((req, res, next) => {
//   const date = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });
//   console.log(`[${date}] ${req.method} to ${req.path}`);
//   next(); // Don't forget to call next()!
// });

//GET all users
app.get("/api/users", async (req, res) => {
  let users = await getUsers();
  res.json(users)
  console.log(users);
  
  //send data in required format
  // res.send({
  //   success: true, //this indicates that the request was successful
  //   payload: users, //this is the data returned by the request
  // })
});

//GET user by ID
app.get("/api/users/:id", async (req, res) => {
  // const users = await getUsers();
  // const theUser = users.find((user) => user.id === req.params.id);
  // if (theUser) {
  //   res.send({
  //     success: true,
  //     payload: theUser,
  //   });
  // } else {
  //   res.status(404).send({
  //     success: false,
  //     message: "Hmm we don't seem to have a user with that ID",
  //   });
  // }
});

//POST aka create a new user


//PATCH aka update a user by ID


//DELETE aka delete a user by ID


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
