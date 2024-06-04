import Login from './pages/Login';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditTask from "./pages/EditTask";
import PruebaUser from "./pages/PruebaUser";
import ManagerHomePage from './pages/ManagerHomePage';
import ManagerViewTaskDeveloper from './pages/ManagerViewTaskDeveloper'; // Importa el componente ManagerViewTaskDeveloper
import DeveloperHomePage from './pages/DeveloperHomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homePage" element={<DeveloperHomePage />} />
        <Route path="/task/:id" element={<EditTask />} />
        <Route path="/tasks/:userId" element={<ManagerViewTaskDeveloper />} /> {/* Agrega la ruta para ManagerViewTaskDeveloper */}
      </Routes>
    </Router>
  );
}

export default App;
