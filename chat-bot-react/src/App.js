import Login from './pages/Login';
import './App.css';
import {BrowserRouter as Router,Routes,Route}from "react-router-dom"
import HomePage from "./pages/HomePage";
import EditTask from "./pages/EditTask";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/homePage" element={<HomePage/>}/>
              <Route path="/task/:id" element={<EditTask/>}/>
          </Routes>
      </Router>

  );
}

export default App;
