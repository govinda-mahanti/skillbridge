import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import Labs from "./Pages/Labs";
import Lab from "./Pages/Lab";
import Advisor from "./Pages/Advisor";


import DashLayout from "./Admin/DashLayout";
import AddLabs from "./Admin/AddLabs";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="labs" element={<Labs />} />
          <Route path="lab" element={<Lab />} />
        </Route>

        <Route path="advisor" element={<Advisor />} />
        <Route path="/dashboard" element={<DashLayout />}>
          <Route index element={<AddLabs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
