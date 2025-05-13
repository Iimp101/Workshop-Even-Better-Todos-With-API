import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface ConfirmDeleteButtonProps {
	onConfirm: () => void;
	children?: React.ReactNode;
}

const ConfirmDeleteButton: React.FC<ConfirmDeleteButtonProps> = ({ onConfirm, children }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleConfirm = () => {
		onConfirm();
		handleClose();
	};

	return (
		<>
			<Button variant="danger" onClick={handleShow}>
				{children || "Delete"}
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				centered
				contentClassName="gym-modal"
			>
				<Modal.Header closeButton>
					<Modal.Title>💀 Detect Rendering</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to throw away your gains!?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						No
					</Button>
					<Button variant="danger" onClick={handleConfirm}>
						Yes 💣
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ConfirmDeleteButton;
