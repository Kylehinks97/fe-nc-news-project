import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav"
import Home from "./Home";

function App() {
  return (
    <>
    <BrowserRouter>
      <Nav />
      <Routes>
    <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
