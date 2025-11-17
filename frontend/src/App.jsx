import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./screen/auth/Login";
import Home from "./screen/user/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
