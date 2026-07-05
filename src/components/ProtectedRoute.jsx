import { all } from "axios";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({children,allowedRole,}) {

    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    // console.log("Allowed:",allowedRole);
    // console.log("Stored Role:",role);

    if(!token){
        return <Navigate to="/" replace/>;
    }

    if(role !== allowedRole){
        // console.log("Blocked")
        if(role === "employee"){
            return (
                <Navigate to="/employee/dashboard" replace/>
            );
        }

        if(role === "hr"){
            return(
                <Navigate to="/hr/dashboard" replace/>
            );
        }

        return <Navigate to="/" replace />
    }

    // console.log("Allowed Access");
    return children;

}