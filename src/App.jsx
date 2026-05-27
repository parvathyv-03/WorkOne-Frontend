import { useState } from 'react'
import Login from "./pages/Login"
import EmployeeDashboard from './pages/EmployeeDashboard';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>

        <Route path="/employee-dashboard" element={
          <ProtectedRoute>
            <EmployeeDashboard/>
          </ProtectedRoute>}/>

      </Routes>
    </BrowserRouter>
  );

}

export default App;
