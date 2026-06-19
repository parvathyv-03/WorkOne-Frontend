import HRSidebar from "../components/HRSidebar";
import HRNavbar from "../components/HRNavbar";

import { Outlet } from "react-router-dom";

export default function HRLayout(){
    return(

        <div className="flex">

            <HRSidebar/>

            <div className="flex-1 bg-gray-100 min-h-screen">
                <HRNavbar/>

                <div className="p-8">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}