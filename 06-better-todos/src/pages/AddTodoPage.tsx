import { useState } from "react";
import { Alert } from "react-bootstrap";
import AddTodoForm from "../components/AddTodoForm";
import * as TodosAPI from "../services/TodosAPI";
import { NewTodo } from "../types/Todo";
import { useNavigate } from "react-router";

const AddTodoPage = () => {

    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleAddTodo = async (title: string) => {
        const newTodo: NewTodo = {
            title,
             completed: false,
        }

        try {
            await TodosAPI.postTodo(newTodo);
            setSuccessMessage("Todo Created!");
            setErrorMessage(null);

            setTimeout(() => {
                console.log("Navigating..");
                navigate("/todos");
            }, 1000)
        } catch (err) {
            console.error("Error creating todo:", err);
            setErrorMessage("Could not create todo.");
            setSuccessMessage(null);
        }
    }

    return (
        <>
        
        	<h1>Created a new Todo</h1>

        	{successMessage && <Alert variant="success">{successMessage}</Alert>}
        	{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        
        	<AddTodoForm onAddTodo={handleAddTodo} />
        </>
    )
};

export default AddTodoPage;