import { all } from "axios";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({children,allowedRole,}) {

    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if(!token){
        return <Navigate to="/" replace/>;
    }

    if(role !== allowedRole){
        if(role === "Employee"){
            return (
                <Navigate to="/employee/dashboard"/>
            );
        }

        if(role === "HR"){
            return(
                <Navigate to="/hr/dashboard"/>
            );
        }
    }

    return children;

}