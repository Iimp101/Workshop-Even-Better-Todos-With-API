interface TodoCounterProps {
	completed: number;
	total: number;
}

const TodoCounter: React.FC<TodoCounterProps> = ({ completed, total }) => {
	return (
		<p className="mt-3 text-muted">
			You have completed {completed} out of {total} todos.
		</p>
	)
}

export default TodoCounter
