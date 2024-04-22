import Login from './pages/Login';
import './App.css';
import {BrowserRouter as Router,Routes,Route}from "react-router-dom"
import HomePage from "./pages/HomePage";
import EditTask from "./pages/EditTask";
import ManagerHomePage from './pages/ManagerHomePage';

function App() {
  return (
    
      <Router>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/homePage" element={<ManagerHomePage/>}/>
              <Route path="/task/:id" element={<EditTask/>}/>
              {/*<Route path="/homePage" element={<HomePage/>}/>*/}
          </Routes>
      </Router>
    
   
  /*
      <>
        <PruebaUser />
      </>
  */
  );
}

export default App;
