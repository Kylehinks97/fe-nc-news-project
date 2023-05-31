import {Link} from "react-router-dom"

function Nav() {

    return (
        <nav>
        <h1>NC News</h1>
        <Link to="/"><h2>Home</h2></Link>
        <h2>Topics</h2>
        </nav>
    )
}

export default Nav