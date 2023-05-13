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
    try {let data = await fs.readFile(fileName, "utf-8");
    let usersObject = JSON.parse(data);
    //find the user with the given ID
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
    const postNewUser = {
        id: uuidv4(),
        ...newUser,
    };
    let data = await fs.readFile(fileName, "utf-8");
    let usersObject = JSON.parse(data);
    usersObject.push(postNewUser);
    await fs.writeFile(fileName, JSON.stringify(usersObject), "utf-8");
    return { success: true, payload: postNewUser };
}

//Update a user by ID
export async function updateUserByID(id, updatedUser) {

}

//Delete a user by ID
export async function deleteUserByID(id) {}
