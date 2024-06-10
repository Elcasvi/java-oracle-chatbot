import Login from './pages/Login';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManagerViewProjects from './pages/ManagerViewProjects';
import ManagerHomePage from './pages/ManagerHomePage';
import EditTask from "./pages/EditTask";
import ManagerViewTaskDeveloper from './pages/ManagerViewTaskDeveloper';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homePage/:email" element={<HomePage />} />
        <Route path="/task/:id" element={<EditTask />} />
        <Route path="/tasks/:userId" element={<ManagerViewTaskDeveloper />} />
        <Route path="/manager-home-page/:projectId" element={<ManagerHomePage />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;
