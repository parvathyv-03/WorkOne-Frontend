import { useState } from 'react'
import Login from "./pages/Login"
import EmployeeDashboard from './pages/EmployeeDashboard';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>

        <Route path="/employee-dashboard" element={<EmployeeDashboard/>}/>

      </Routes>
    </BrowserRouter>
  );

}

export default App;
