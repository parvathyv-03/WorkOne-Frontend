import Login from "./pages/Login"
import EmployeeDashboard from './pages/EmployeeDashboard';
import MyProfile from"./pages/employee/MyProfile";
import Attendance from "./pages/employee/Attendance";
import LeaveManagement from "./pages/employee/LeaveManagement";
import Complaints from "./pages/employee/Complaints";
import Payslip from './pages/employee/Payslip';
import Notifications from './pages/employee/Notifications';
import EmployeeLayout from "./layouts/EmployeeLayout";
import HRLayout from "./layouts/HRLayout";

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PersonalInfo from "./pages/employee/Personalinfo";
import UpdateProfile from "./pages/employee/UpdateProfile";
import ChangePassword from "./pages/employee/ChangePassword";
import UploadedDocuments from "./pages/employee/UploadedDocuments";
import MonthlyReport from "./pages/employee/MonthlyReport";

import HRDashboard from "./pages/hr/HRDashboard";
import ManageEmployees from "./pages/hr/AddEmployee";
import Leave from "./pages/hr/Leave";
import AttendanceTracking from "./pages/hr/AttendanceTracking";
import ComplaintManagement from "./pages/hr/ComplaintManagement";
import PayslipManagement from "./pages/hr/PayslipManagement";
import Recruitment from "./pages/hr/Recruitment";
import ReportsAnalytics from "./pages/hr/ReportsAnalytics";
import Notification from "./pages/hr/Notification";
import ManageEmployeesHome from "./pages/hr/ManageEmployeesHome";
import ViewUploadedDocuments from "./pages/hr/ViewUploadedDocuments";
import CreateEmployee from "./pages/hr/CreateEmployee";
import EditEmployee from "./pages/hr/EditEmployee";

function App() {
  return (
      <BrowserRouter>
        <Routes>

          {/* LOGIN */}
          <Route
            path="/"
            element={<Login />}
          />

          {/* HR Layout */}
          <Route
            path="/hr"
            element={
              <ProtectedRoute allowedRole="hr">
                <HRLayout />
              </ProtectedRoute>
            }
          >
            {/* CHILD ROUTES */}

            <Route
              path="dashboard"
              element={<HRDashboard/>}
            />
            <Route
              path="employees"
              element={<ManageEmployeesHome/>}
            />
            <Route
              path="employees/addemployee"
              element={<ManageEmployees/>}
            />
            <Route
              path="employees/addemployee/createemployee"
              element={<CreateEmployee/>}
            />
            <Route
              path="employees/addemployee/editemployee/:employee_id"
              element={<EditEmployee/>}
            />
            <Route
              path="employees/uploadeddocuments"
              element={<ViewUploadedDocuments/>}
            />
            <Route
              path="leave"
              element={<Leave/>}
            />
            <Route
              path="attendance"
              element={<AttendanceTracking/>}
            />
            <Route
              path="complaints"
              element={<ComplaintManagement/>}
            />
            <Route
              path="payslip"
              element={<PayslipManagement/>}
            />
            <Route
              path="recruitment"
              element={<Recruitment/>}
            />
            <Route
              path="reports"
              element={<ReportsAnalytics/>}
            />
            <Route
              path="notification"
              element={<Notification/>}
            />
            
          </Route>

          {/* EMPLOYEE LAYOUT */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute allowedRole="employee">
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
