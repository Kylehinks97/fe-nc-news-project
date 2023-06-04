import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Article from "./Article";
import Login from "./Login";
import {useState} from "react"

function App() {
  const [loggedInAlready, setLoggedInAlready] = useState(false)
  const [username, setUsername] = useState("")
  console.log(username);

  return (
    <>
      <BrowserRouter>
        <Nav username={username} loggedInAlready={loggedInAlready} setLoggedInAlready={setLoggedInAlready}/>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/articles/:article_id" element={<Article username={username} />} />
          <Route path="/" element={<Login username = {username} loggedInAlready={loggedInAlready} setLoggedInAlready= {setLoggedInAlready} setUsername={setUsername}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
