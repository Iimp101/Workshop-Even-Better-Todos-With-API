import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import * as TodosAPI from "../services/TodosAPI";
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
				setError("Kunde inte ladda todo.");
			}
			setIsLoading(false);
		};

		if (id) fetchTodo();
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await TodosAPI.updateTodo(Number(id), { title, completed });
			setSuccessMessage("Todo uppdaterad!");
			setTimeout(() => {
				navigate(`/todos/${id}`);
			}, 1000);
		} catch (err) {
            console.error(err);
			setError("Det gick inte att uppdatera todo:n.");
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

			{successMessage && <Alert variant="success">{successMessage}</Alert>}

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
						label="Avklarad"
						checked={completed}
						onChange={(e) => setCompleted(e.target.checked)}
					/>
				</Form.Group>

				<Button type="submit" variant="primary">
					Spara ändringar
				</Button>
			</Form>
		</>
	);
};

export default EditTodoPage;
