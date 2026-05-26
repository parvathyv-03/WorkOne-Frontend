import EmployeeSidebar from "../components/EmployeeSidebar";
import EmployeeNavbar from "../components/EmployeeNavbar";


export default function EmployeeDashboard(){
    return(
        <div className="flex">
            <EmployeeSidebar/>

            <div className="flex-1 bg-gray-100 min-h-screen">
                <EmployeeNavbar/>

                <div className="p-8">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Employee Dashboard.
                    </h1>
                </div>
            </div>

           
        </div>
    );
}