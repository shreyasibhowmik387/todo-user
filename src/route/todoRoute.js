import express from "express";
import { addTodo, deleteTodo, getAllTodo, todoUpdate } from "../controller/todoController.js";
import { hasToken } from "../middleware/hasToken.js";

const todoRoute = express.Router();

todoRoute.post("/create", hasToken, addTodo);
todoRoute.get("/getAll", hasToken, getAllTodo);
todoRoute.delete("/delete/:id", hasToken, deleteTodo);
todoRoute.put("/update/:id", hasToken, todoUpdate);

export default todoRoute ;