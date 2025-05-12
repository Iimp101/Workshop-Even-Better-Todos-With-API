import Image from "react-bootstrap/Image";
import imgSadKitten from "../assets/images/sad-kitten.gif";

const NotFoundPage = () => {
	return (
		<>
			<h1>Sorry, that page could not be found 😔</h1>

			<p>Y U MAKE KITTEH SAD?!</p>

			<Image src={imgSadKitten} alt="Sad kitten" fluid />
		</>
	)
}

export default NotFoundPage
