/**
 * Service for communicating with the json-server backend
 */
import axios from "axios";
import { NewTodo, Todo } from "../types/Todo";

const BASE_URL = "http://localhost:3000";

/**
 * Get all todos
 */
export const getTodos = async () => {
	const res = await axios.get<Todo[]>(BASE_URL + "/todos");
	await new Promise(r => setTimeout(r, 500));
	return res.data;
}

/* 
* Get one todo
*/

export const getTodo = async (id: number) => {
	const res = await axios.get<Todo>(BASE_URL + `/todos/${id}`);
	return res.data;
}


/**
 * Create a new todo
 *
 * @param data Object with properties and values for the new todo
 */
export const postTodo = async (todo: NewTodo) => {
	const res = await axios.post<Todo>(BASE_URL + "/todos", todo);
	return res.data;
}

/**
 * Update a todo
 *
 * @param todo_id Todo to update
 * @param data Data to update todo with
 */
export const updateTodo = async (todoId: number, payload: Partial<NewTodo>) => {
	const res = await axios.patch<Todo>(BASE_URL + "/todos/" + todoId, payload);
	return res.data;
}

/**
 * Delete a todo
 *
 * @param todo_id Todo to delete
 */
export const deleteTodo = async (todoId: number) => {
	await axios.delete(BASE_URL + "/todos/" + todoId);
}
