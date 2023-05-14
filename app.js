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
app.use((req, res, next) => {
  const date = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });
  console.log(`[${date}] ${req.method} to ${req.path}`);
  next(); // Don't forget to call next()!
});

//GET all users
app.get("/api/users", async (req, res) => {
  let users = await getUsers();
  res.json(users)
  console.log("this is going to get all users");
  
  //send data in required format
  // res.send({
  //   success: true, //this indicates that the request was successful
  //   payload: users, //this is the data returned by the request
  // })
});

//GET user by ID
app.get("/api/users/:id", async (req, res) => {
  //use getUserByID function to get user by ID
  let usersId = req.params.id;
  let getUsersId = await getUserByID(usersId);
  const success = getUsersId !== undefined;
  res.json(getUsersId);
  console.log("This will get a user by ID");
});

//POST aka create a new user
//{ success: true, payload: newly created user object }
//use createUser function to create a new user
//To test need to add test data to the body of the request
app.post("/api/users", async (req, res) => {
  const newUserWithoutId = req.body;
  //use CreateUser helper function
  const payload = await createUser(newUserWithoutId);
  console.log("This will create a new user");

  const body = {
    success: true,
    payload: payload,
  };
    //send the newly create recipe back to the client which should also include the id
    res.json(body);
});


//PATCH aka update a user by ID
//{ success: true, payload: new user object (after replacement) }
//use updateUserByID function to update a user by ID
app.patch("/api/users/:id", async (req, res) => {

});

//DELETE aka delete a user by ID
//{ success: true, payload: deleted user }
//use deleteUserByID function to delete a user by ID
app.delete("/api/users/:id", async (req, res) => {

});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
