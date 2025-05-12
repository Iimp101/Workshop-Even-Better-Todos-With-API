import { useNavigate, useParams } from "react-router";
import * as TodoAPI from "../services/TodosAPI";
import { useEffect, useState } from "react";
import { Todo } from "../types/Todo";
import { Button, Spinner, Alert } from "react-bootstrap";



const TodoPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todo, setTodo] = useState<Todo | null>(null);

	useEffect(() => {
		const fetchTodo = async () => {
			setIsLoading(true);
			setError(false);
			try {
				const data = await TodoAPI.getTodo(Number(id));
				setTodo(data);
			} catch (err) {
				console.error("Error fetching todo:", err);
				setError("Kunde inte hämta todo");
			}
			setIsLoading(false);
		};
	
		if (id) fetchTodo();
	}, [id]);
	
	const handleToggleTodo = async () => {
		if (!todo) return;

		try {
			const updatedTodo = await TodoAPI.updateTodo(todo.id, {
				completed: !todo.completed,
			});
			setTodo(updatedTodo);
		} catch (err) {
			console.error("Error toggling todo:", err);
			setError("Kunde inte toggla todo.");
		}
	};

	const handleDeleteTodo = async () => {
		if (!todo) return;

		try {
			await TodoAPI.deleteTodo(todo.id);
			navigate("/todos");
		} catch (err) {
			console.error("Error deleting todo:", err);
			setError("Kunde inte radera todo.");
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

					<Button
						variant="danger"
						onClick={handleDeleteTodo}
					>
						Delete Todo
					</Button>

					</div>

					<Button variant="secondary" onClick={() => navigate("/todos")}>
						Back to all todos
					</Button>
				</>
			)}
		</>
	);
}

export default TodoPage;
