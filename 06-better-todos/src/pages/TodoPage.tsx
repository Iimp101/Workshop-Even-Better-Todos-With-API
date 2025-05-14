import { useNavigate, useParams } from "react-router";
import * as TodoAPI from "../services/TodosAPI";
import { useEffect, useState } from "react";
import { Todo } from "../types/Todo";
import { Button, Spinner, Alert } from "react-bootstrap";
import ConfirmDeleteButton from "../components/ConfirmDeleteButton";



const TodoPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todo, setTodo] = useState<Todo | null>(null);
	const todoId = Number(id);

	useEffect(() => {
		const fetchTodo = async () => {
			setIsLoading(true);
			setError(false);
			try {
				const data = await TodoAPI.getTodo(todoId);
				setTodo(data);
			} catch (err) {
				console.error("Error fetching todo:", err);
				setError("Could not fetch todo");
			}
			setIsLoading(false);
		};
	
		if (todoId) fetchTodo();
	}, [todoId]);
	
	const handleToggleTodo = async () => {
		if (!todo) return;

		try {
			const updatedTodo = await TodoAPI.updateTodo(todo.id, {
				completed: !todo.completed,
			});
			setTodo(updatedTodo);
		} catch (err) {
			console.error("Error toggling todo:", err);
			setError("Could not toggle Todo.");
		}
	};

	const handleDeleteTodo = async () => {
		if (!todo) return;

		try {
			await TodoAPI.deleteTodo(todo.id);
			navigate("/todos");
		} catch (err) {
			console.error("Error deleting todo:", err);
			setError("Could not delete todo.");
		}
	};


	return (
		<>
			<h1>Todo Details</h1>

			{isLoading && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}

			{error && <Alert variant="danger">{error}</Alert>}

			{!isLoading && todo && (
				<>
					<h2>{todo.title}</h2>
					<p><strong>Status:</strong> {todo.completed ? "COMPLETED" : "NOT COMPLETED"}</p>

					<div className="buttons mb-3">
					<Button
						variant={todo.completed ? "warning" : "success"}
						onClick={handleToggleTodo}
					>
						{todo.completed ? "Mark as NOT completed" : "Mark as COMPLETED"}
					</Button>

					<ConfirmDeleteButton onConfirm={handleDeleteTodo}>
						Delete todo
					</ConfirmDeleteButton>

					</div>

					<Button variant="secondary" onClick={() => navigate("/todos")}>
						Back to all todos
					</Button>
					<Button
						variant="info"
						onClick={() => navigate(`/todos/${todo.id}/edit`)}
						className="me-2"
					>
						Edit
					</Button>
				</>
			)}
		</>
	);
}

export default TodoPage;
