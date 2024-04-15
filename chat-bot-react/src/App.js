import Login from './pages/Login';
import './App.css';
import {BrowserRouter as Router,Routes,Route}from "react-router-dom"
import HomePage from "./pages/HomePage";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/homePage" element={<HomePage/>}/>
          </Routes>
      </Router>

      /*
    <div className="App">
        <Login />
    </div>
       */
  );
}

export default App;
