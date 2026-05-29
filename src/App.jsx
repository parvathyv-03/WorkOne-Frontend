import Login from "./pages/Login"
import EmployeeDashboard from './pages/EmployeeDashboard';
import MyProfile from"./pages/employee/MyProfile";
import Attendance from "./pages/employee/Attendance";
import LeaveManagement from "./pages/employee/LeaveManagement";
import Complaints from "./pages/employee/Complaints";
import Payslip from './pages/employee/Payslip';
import Notifications from './pages/employee/Notifications';
import EmployeeLayout from "./layouts/EmployeeLayout";

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
      <BrowserRouter>
        <Routes>

          {/* LOGIN */}
          <Route
            path="/"
            element={<Login />}
          />

          {/* EMPLOYEE LAYOUT */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute>
                <EmployeeLayout />
              </ProtectedRoute>
            }
          >

            {/* CHILD ROUTES */}

            <Route
              path="dashboard"
              element={<EmployeeDashboard />}
            />

            <Route
              path="profile"
              element={<MyProfile />}
            />

            <Route
              path="attendance"
              element={<Attendance />}
            />

            <Route
              path="leave"
              element={<LeaveManagement />}
            />

            <Route
              path="complaints"
              element={<Complaints />}
            />

            <Route
              path="payslip"
              element={<Payslip />}
            />

            <Route
              path="notifications"
              element={<Notifications />}
            />

          </Route>

        </Routes>
      </BrowserRouter>
  );

}

export default App;
