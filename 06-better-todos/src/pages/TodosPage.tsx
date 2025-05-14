import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import AddTodoForm from "../components/AddTodoForm";
import TodoCounter from "../components/TodoCounter";
import * as TodosAPI from "../services/TodosAPI";
import { NewTodo, Todo } from "../types/Todo";
import { Link } from "react-router";
import ErrorAlert from "../components/alerts/ErrorAlert";

export const TodosPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState<Todo[]>([]);

	const getTodos = async () => {
		setError(false);
		setIsLoading(true);
		setTodos([]);

		try {
			const data = await TodosAPI.getTodos();
			setTodos(data);
		} catch (err) {
			console.error("Error thrown when fetching todos:", err);
			setError(err instanceof Error ? err.message : "It's not me, it's you");
		}
		setIsLoading(false);
	};

	const handleAddTodo = async (title: string) => {
		const todo: NewTodo = {
			title,
			completed: false,
		}
		await TodosAPI.postTodo(todo);
		getTodos();
	};

	const completedTodos = todos.filter(todo => todo.completed);

	const sortedTodos = [...todos].sort((a, b) => {
		if (a.completed === b.completed) {
			return a.title.localeCompare(b.title);
		}
		return a.completed ? 1 : -1;
	});

	// Sort both completed and incompleted todos
	// const sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<>
			<h1>Todos</h1>

			<AddTodoForm onAddTodo={handleAddTodo} />

			{error && (
				<ErrorAlert>
					{error}
				</ErrorAlert>
			)}

			{isLoading && (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			)}

			{!error && !isLoading && todos.length > 0 && (
				<>
					<ListGroup className="todolist">
						{sortedTodos.map(todo => (
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

			{!error && !isLoading && sortedTodos.length === 0 && (
				<Alert variant="warning">
					You ain't got no todos 🤔?
				</Alert>
			)}
		</>
	);
}

export default TodosPage;
