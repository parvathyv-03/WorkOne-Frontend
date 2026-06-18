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
import PersonalInfo from "./pages/employee/Personalinfo";
import UpdateProfile from "./pages/employee/UpdateProfile";
import ChangePassword from "./pages/employee/ChangePassword";
import UploadedDocuments from "./pages/employee/UploadedDocuments";
import MonthlyReport from "./pages/employee/MonthlyReport";
import HRDashboard from "./pages/hr/HRDashboard";

function App() {
  return (
      <BrowserRouter>
        <Routes>

          {/* LOGIN */}
          <Route
            path="/"
            element={<Login />}
          />
          <Route
              path="/hr/dashboard"
              element={<HRDashboard/>}
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
              path="/employee/profile/personal-info"
              element={<PersonalInfo/>}
            />

            <Route
              path="/employee/profile/update-profile"
              element={<UpdateProfile/>}
            />

            <Route
              path="/employee/profile/change-password"
              element={<ChangePassword/>}
            />

            <Route
              path="/employee/profile/uploaded-documents"
              element={<UploadedDocuments/>}
            />

            <Route
              path="attendance"
              element={<Attendance />}
            />
            <Route
              path="/employee/attendance/monthly-report"
              element={<MonthlyReport />}
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
