import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "users.json";

//GET all users
export async function getUsers() {
    let data = await fs.readFile(fileName, "utf-8");
    let usersObject = JSON.parse(data);
    return { success: true, payload : usersObject };
}
//Get user by ID
export async function getUserByID(id) {
    try {
        let data = await fs.readFile(fileName, "utf-8");
        let usersObject = JSON.parse(data);
        //alternatively we have already read the json and parsed from the getUsers function
        //so we could call that function instead of rewriting the code
    //find the user with the given ID

    //alternative way to find the user with the given ID
    // for (let i = 0; i < usersObject.length; i++) {
        // const currentUser = usersObject[i];
        // if (currentUser.id === id) {
            // return {success: true, payload: currentUser}
        let findUsersId = usersObject.find((user) => user.id === id)
        if (findUsersId) {
            return {success: true, payload: findUsersId}
        }
            return {success: false, payload: "User not found"}}
    catch (error) {
        console.log("There was an error", error);
            return {success: false, payload: error}
    }
}

//Create a new user
export async function createUser(newUser) {
    //read all of the existing users
    let users = await getUsers();
    // create a new user object (with a unique ID using uuidv4())
        // merge the new user object with an id
        const postNewUser = {
            id: uuidv4(),
            ...newUser,
        };
    // add the new user object to existing users
    users.push(postNewUser);
    //save the changes to the file
    // let data = await fs.readFile(fileName, "utf-8");
    // let usersObject = JSON.parse(data);
    const json = JSON.stringify(users);
    await fs.writeFile(fileName, json, { encoding: "utf-8"});
    return { success: true, payload: postNewUser };
}

//Update a user by ID
export async function updateUserByID(id, updatedUser) {

}

//Delete a user by ID
export async function deleteUserByID(id) {}
