import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Tasks from "./Tasks.jsx";
import Rewards from "./Rewards.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/Rewards" element={<Rewards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

