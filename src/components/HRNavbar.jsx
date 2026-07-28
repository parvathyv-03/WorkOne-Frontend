import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HRNavbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("HR");
    const dropdownRef = useRef(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const initials = username?.trim()?.charAt(0)?.toUpperCase() || "H";

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        setIsOpen(false);
        navigate("/");
    };

    return (
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2 shadow-sm">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">WorkOne.</h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-md transition duration-300 hover:bg-blue-700"
                    >
                        {initials}
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 z-50 mt-3 w-60 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
                            <div className="flex flex-col items-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white shadow-md">
                                    {initials}
                                </div>
                                <p className="mt-3 text-sm font-semibold text-slate-800">{username}</p>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="mt-4 w-full rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}