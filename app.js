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

//for static files
app.use(express.static("public"));
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
  if (success) {
    const body = {
    success: success,
    payload: payload,
  };
  res.json(body);}
    res.status(404).json({
      success: false,
      payload: `User with ID ${id} not found`,});
  
    res.json(body);
  console.log("This will get a user by ID or throw an error if not found");
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
  const success = payload !== undefined;
  if(success){
    const body = {
      success: true,
      payload: payload,
    };
    //send the newly create recipe back to the client which should also include the id
    res.json(body);
  }
  //error handling
  res.status(400).json({
    success: false,
    payload: "The request was malformed",});
});


//PATCH aka update a user by ID
//{ success: true, payload: new user object (after replacement) }
//use updateUserByID function to update a user by ID
// FOR TESTING id: 6dc2e64c-50f0-45f4-88c8-5c6347041a7a
app.patch("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  const payload = await updateUserByID(id, updatedUser);
  const success = payload !== undefined;
  
  if (success) {
    const body = {
    success: success,
    payload: payload,
    };
    return res.json(body);
  }
  res.status(404).json({
    success: false,
    payload: `User with ID ${id} not found`,});
});

//DELETE aka delete a user by ID
//{ success: true, payload: deleted user }
//use deleteUserByID function to delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const payload = await deleteUserByID(id);

  const success = payload !== undefined;
  
  if (success) {
    const body = {
    success: success,
    payload: payload,
    };
    return res.json(body);
  }
  res.status(404).json({
    success: false,
    payload: `User with ID ${id} not found`,});
//
  res.json(body);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
