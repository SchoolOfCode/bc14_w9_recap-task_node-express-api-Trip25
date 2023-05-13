import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "users.json";

//GET all users
export async function getUsers() {
    let data = await fs.readFile(fileName, "utf-8");
    let users = JSON.parse(data);
    return users;
}
//Get user by ID
export async function getUserByID(id) {}

//Create a new user
export async function createUser(newUser) {}

//Update a user by ID
export async function updateUserByID(id, updatedUser) {}

//Delete a user by ID
export async function deleteUserByID(id) {}
