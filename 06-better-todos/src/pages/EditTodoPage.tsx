import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import * as TodosAPI from "../services/TodosAPI";
import AutoDismissingAlert from "../components/alerts/AutoDismissingAlert";

const EditTodoPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [completed, setCompleted] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	useEffect(() => {
		const fetchTodo = async () => {
			try {
				const todo = await TodosAPI.getTodo(Number(id));
				setTitle(todo.title);
				setCompleted(todo.completed);
			} catch (err) {
				console.error(err);
				setError("Could not load todo.");
			}
			setIsLoading(false);
		};

		if (id) fetchTodo();
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await TodosAPI.updateTodo(Number(id), { title, completed });
			setSuccessMessage("Updated todo!");

			setTimeout(() => {
				navigate(`/todos/${id}`);
			}, 1500);
		} catch (err) {
			console.error(err);
			setError("Could not save todo.");
		}
	};

	if (isLoading) {
		return <Spinner animation="border" />;
	}

	if (error) {
		return <Alert variant="danger">{error}</Alert>;
	}

	return (
		<>
			<h1>Redigera Todo</h1>

			{successMessage && (
				<AutoDismissingAlert variant="success" hideAfter={1500}>
					{successMessage}
				</AutoDismissingAlert>
			)}

			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>Titel</Form.Label>
					<Form.Control
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Check
						type="checkbox"
						label="Done"
						checked={completed}
						onChange={(e) => setCompleted(e.target.checked)}
					/>
				</Form.Group>

				<Button type="submit" variant="primary">
					Save changes
				</Button>
			</Form>

			<Button variant="secondary" onClick={() => navigate(-1)} className="mt-3">
				Go back
			</Button>
		</>
	);
};

export default EditTodoPage;
