import { Todo } from "../types/Todo";

interface TodoListItemProps {
	todo: Todo;
	onDelete: (todo: Todo) => void
	onToggle: (todo: Todo) => void
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onDelete, onToggle }) => {

	return (
		<li
			className={todo.completed ? "completed list-group-item" : "list-group-item"}
		>
			<span className="todo-title">{todo.title}</span>

			<div>
				<button
					className="btn btn-sm btn-outline-warning"
					onClick={() => onToggle(todo)}
				>
					{todo.completed ? "☑️" : "✅"}
				</button>
				<button
					className="btn btn-sm btn-outline-danger"
					onClick={() => onDelete(todo)}
				>
					💣
				</button>
			</div>
		</li>
	);
}

export default TodoListItem;
