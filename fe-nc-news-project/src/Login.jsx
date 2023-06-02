import { useState } from "react";

export default function Login({ username, setUsername, loggedInAlready, setLoggedInAlready }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [loggedIn, setLoggedIn] = useState("");
  const [loginDisable, setLoginDisable] = useState(false)

  function handleChange(e) {
    setUsernameInput(e.target.value);
  }
  function login(e) {
    e.preventDefault();
    setLoggedIn(usernameInput);
    setUsername(usernameInput);
    console.log(usernameInput);
    setLoggedInAlready(true)
    setLoginDisable(true)
  }

  function logout() {
    setLoggedIn("")
  }

  return (
    <>
      <form>
        <h2>Welcome {loggedIn}</h2>
        <label htmlFor="login-input"></label>
        <input id="login-input" onChange={handleChange}></input>
        <button disabled={loginDisable} onClick={login}>Login</button>
        {loggedInAlready ? <button onClick={logout}>Sign out</button>: null}
      </form>
    </>
  );
}
