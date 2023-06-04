import { Link } from "react-router-dom";
import { useState } from "react"

function Nav({username, loggedInAlready, setLoggedInAlready}) {

 

  return (
    <nav>
      <h1>NC News</h1>
      <Link to="/home">
        <h2>Articles</h2>
      </Link>
      <h2>Topics</h2>
      <Link to="/">
        {!loggedInAlready ? <h2>Login</h2> : <h2>{username}</h2>}
      </Link>
    </nav>
  );
}

export default Nav;
