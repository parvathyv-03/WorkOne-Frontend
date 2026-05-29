import EmployeeSidebar from "../components/EmployeeSidebar";
import EmployeeNavbar from "../components/EmployeeNavbar";

import { Outlet } from "react-router-dom";

export default function EmployeeLayout(){
    return(

        <div className="flex">

            <EmployeeSidebar/>

            <div className="flex-1 bg-gray-100 min-h-screen">
                <EmployeeNavbar/>

                <div className="p-8">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}