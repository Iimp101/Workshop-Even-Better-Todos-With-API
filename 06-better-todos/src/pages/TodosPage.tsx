import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import AddTodoForm from "../components/AddTodoForm";
import TodoCounter from "../components/TodoCounter";
import * as TodosAPI from "../services/TodosAPI";
import { NewTodo, Todo } from "../types/Todo";
import { Link } from "react-router";

export const TodosPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState<Todo[]>([]);

	const getTodos = async () => {
		// reset state
		setError(false);
		setIsLoading(true);
		setTodos([]);

		// make request to api
		try {
			const data = await TodosAPI.getTodos();
			setTodos(data);
		} catch (err) {
			console.error("Error thrown when fetching todos:", err);
			setError(err instanceof Error ? err.message : "It's not me, it's you");
		}
		setIsLoading(false);
	}

	const handleAddTodo = async (title: string) => {
		const todo: NewTodo = {
			title,
			completed: false,
		}
		await TodosAPI.postTodo(todo);
		getTodos();
	}

	const completedTodos = todos.filter(todo => todo.completed);

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<>
			<h1>Todos</h1>

			<AddTodoForm onAddTodo={handleAddTodo} />

			{error && (
				<Alert variant="danger">
					{error}
				</Alert>
			)}

			{isLoading && (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			)}

			{!error && !isLoading && todos.length > 0 && (
				<>
					<ListGroup className="todolist">
						{todos.map(todo => (
							<ListGroup.Item
								action
								as={Link}
								className={`todo-enter ${todo.completed ? "completed" : ""}`}
								key={todo.id}
								to={`/todos/${todo.id}`}
							>
								<span className="todo-title">{todo.title}</span>
							</ListGroup.Item>
						))}
					</ListGroup>

					<TodoCounter
						completed={completedTodos.length}
						total={todos.length}
					/>
				</>
			)}

			{!error && !isLoading && todos.length === 0 && (
				<Alert variant="warning">
					You ain't got no todos 🤔?
				</Alert>
			)}
		</>
	);
}

export default TodosPage;
