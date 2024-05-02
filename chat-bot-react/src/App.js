import Login from './pages/Login';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditTask from "./pages/EditTask";
import ManagerHomePage from './pages/ManagerHomePage';
import ManagerViewTaskDeveloper from './pages/ManagerViewTaskDeveloper'; // Importa el componente ManagerViewTaskDeveloper
import { useEffect } from 'react';

const tele = window.Telegram.WebApp

function App() {

  useEffect(() => {
    tele.ready();
  })

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homePage" element={<ManagerHomePage />} />
        <Route path="/task/:id" element={<EditTask />} />
        <Route path="/tasks/:userId" element={<ManagerViewTaskDeveloper />} /> {/* Agrega la ruta para ManagerViewTaskDeveloper */}
      </Routes>
    </Router>
  );
}

export default App;
