import { useEffect, useRef, useState } from "react";

interface AddTodoFormProps {
	onAddTodo: (newTodoTitle: string) => void
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
	const [inputTodoTitle, setInputTodoTitle] = useState("");
	const inputTodoTitleRef = useRef<HTMLInputElement | null>(null);

	console.log("inputTodoTitleRef:", inputTodoTitleRef);

	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();

		// Tell parent to create a new todo with `inputTodoTitle` as title
		onAddTodo(inputTodoTitle.trim());

		// Clear input field
		setInputTodoTitle("");
	}

	useEffect(() => {
		inputTodoTitleRef.current?.focus();
	}, []);

	return (
		<form onSubmit={handleAddTodo} className="mb-3">
			<div className="input-group">
				<input
					aria-label="New todo title"
					className="form-control"
					onChange={e => setInputTodoTitle(e.target.value)}
					placeholder="Learn about GTD"
					type="text"
					value={inputTodoTitle}
					ref={inputTodoTitleRef}
					// autoFocus
					required
				/>

				<button
					className="btn btn-success"
					type="submit"
					disabled={inputTodoTitle.trim().length < 3}
				>💪</button>
			</div>

			{inputTodoTitle.trim().length > 0 && inputTodoTitle.trim().length < 3 && (
				<div className="form-text text-danger text-small">Please enter 3 chars or more.</div>
			)}
		</form>
	)
}

export default AddTodoForm;
