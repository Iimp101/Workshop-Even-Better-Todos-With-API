import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

interface AutoDismissingAlertProps {
	children: React.ReactNode;
	hideAfter: number;
	variant: string; 
}

const AutoDismissingAlert: React.FC<AutoDismissingAlertProps> = ({
	children,
	hideAfter,
	variant,
}) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
		}, hideAfter);

		return () => clearTimeout(timer);
	}, [hideAfter]);

	if (!visible) return null;

	return (
		<Alert variant={variant}>
			{children}
		</Alert>
	);
};

export default AutoDismissingAlert;
