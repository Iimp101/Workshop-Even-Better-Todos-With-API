import { Link } from "react-router"

const HomePage = () => {
	return (
		<>
			<h1>Welcome to Better Todos!</h1>

			<p>Because when your life is fire 🔥, you need a <Link to="/todos">todo list</Link>.</p>
		</>
	)
}

export default HomePage
