import { useState, useMemo } from "react";
import {  FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() { 
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({ current: false, new: false, confirm: false });

  const handleChange = (field, value) => {
    setForm((s) => ({ ...s, [field]: value }));
  };

  const validations = useMemo(() => {
    const pw = form.newPassword || "";
    return {
      length: pw.length >= 8,
      upper: /[A-Z]/.test(pw),
      lower: /[a-z]/.test(pw),
      number: /[0-9]/.test(pw),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pw),
      match: pw && form.confirmPassword === pw,
    };
  }, [form.newPassword, form.confirmPassword]);

  const isFormValid = Object.values(validations).every(Boolean) && form.currentPassword.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ current: true, new: true, confirm: true });
    if (!isFormValid) return;
    setIsLoading(true)

    if(form.currentPassword === form.newPassword){
    setIsLoading(false);
    alert(
        "New password must be different from current password."
    );
    return;
    }

    try{
        const token = localStorage.getItem("accessToken");

        const response = await fetch("http://127.0.0.1:8000/api/employee/change-password/",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`,
                },
                body: JSON.stringify({
                    current_password:form.currentPassword,
                    new_password:form.newPassword,
                    confirm_password:form.confirmPassword,
                }),
            }
        );

        const data = await response.json();

        if (response.ok) {
            setForm({
                currentPassword:"",
                newPassword:"",
                confirmPassword:"",
            });
            
            localStorage.removeItem("accessToken");
            alert("Password changed successfully. Please login again.")

            navigate("/login");
        } else {
            alert(data.error || data.confirm_password?.[0] || data.new_password?.[0] ||
                "Password update failed."
            );
        }
 
    } catch (error){
        console.error(error);
        alert("Unable to connect to server.");
    } finally {
        setIsLoading(false);
    };

  };

  return (
    <div className="space-y-8 font-sans text-slate-900">
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Account Security</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Change Password</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Update your account password regularly to keep your employee account secure.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit}
          className="col-span-3 lg:col-span-2 rounded-3xl bg-white p-8 shadow-md"
        >
          <h2 className="text-xl font-semibold text-slate-900">Change Password</h2>
          <p className="mt-2 text-sm text-slate-600">Choose a strong password and keep it confidential.</p>

          <div className="mt-6 space-y-6">
            {/* Current Password */}
            <div>
              <label className="text-sm font-medium text-slate-500">Current Password</label>
              <div className="relative mt-2">
              
                <input
                  type={show.current ? "text" : "password"}
                  value={form.currentPassword}
                  onChange={(e) => handleChange("currentPassword", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, current: true }))}
                  placeholder="Enter current password"
                  className={`w-full rounded-3xl border px-4 py-3 pl-12 text-base transition outline-none ${
                    touched.current && !form.currentPassword
                      ? "border-red-300 bg-red-50"
                      : "border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => ({ ...s, current: !s.current }))}
                  className="absolute right-3 top-3 text-slate-600"
                  aria-label="Toggle current password visibility"
                >
                  {show.current ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {touched.current && !form.currentPassword && (
                <p className="mt-2 text-xs text-red-600">Please enter your current password.</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="text-sm font-medium text-slate-500">New Password</label>
              <div className="relative mt-2">
        
                <input
                  type={show.new ? "text" : "password"}
                  value={form.newPassword}
                  onChange={(e) => handleChange("newPassword", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, new: true }))}
                  placeholder="Create a strong password"
                  className={`w-full rounded-3xl border px-4 py-3 pl-12 text-base transition outline-none ${
                    touched.new && !validations.length
                      ? "border-red-300 bg-red-50"
                      : "border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => ({ ...s, new: !s.new }))}
                  className="absolute right-3 top-3 text-slate-600"
                  aria-label="Toggle new password visibility"
                >
                  {show.new ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {touched.new && !validations.length && (
                <p className="mt-2 text-xs text-red-600">Password must meet the security guidelines below.</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-slate-500">Confirm New Password</label>
              <div className="relative mt-2">
                
                <input
                  type={show.confirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
                  placeholder="Re-enter new password"
                  className={`w-full rounded-3xl border px-4 py-3 pl-12 text-base transition outline-none ${
                    touched.confirm && !validations.match
                      ? "border-red-300 bg-red-50"
                      : "border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
                  className="absolute right-3 top-3 text-slate-600"
                  aria-label="Toggle confirm password visibility"
                >
                  {show.confirm ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {touched.confirm && !validations.match && (
                <p className="mt-2 text-xs text-red-600">Passwords do not match.</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="rounded-3xl border border-slate-300 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`rounded-3xl px-6 py-3 text-sm font-semibold text-white transition ${
                  isFormValid && !isLoading ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400/60 cursor-not-allowed"
                }`}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold text-slate-900">Password Guidelines</h3>
            <p className="mt-2 text-sm text-slate-600">Ensure your new password meets the following requirements:</p>
            <ul className="mt-4 space-y-3">
              <li className={`flex items-center gap-3 text-sm ${validations.length ? "text-emerald-700" : "text-slate-600"}`}>
                <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${validations.length ? "bg-emerald-100" : "bg-slate-100"}`}>
                  {validations.length ? "✓" : "•"}
                </span>
                Minimum 8 characters
              </li>
              <li className={`flex items-center gap-3 text-sm ${validations.upper ? "text-emerald-700" : "text-slate-600"}`}>
                <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${validations.upper ? "bg-emerald-100" : "bg-slate-100"}`}>
                  {validations.upper ? "✓" : "•"}
                </span>
                At least one uppercase letter
              </li>
              <li className={`flex items-center gap-3 text-sm ${validations.lower ? "text-emerald-700" : "text-slate-600"}`}>
                <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${validations.lower ? "bg-emerald-100" : "bg-slate-100"}`}>
                  {validations.lower ? "✓" : "•"}
                </span>
                At least one lowercase letter
              </li>
              <li className={`flex items-center gap-3 text-sm ${validations.number ? "text-emerald-700" : "text-slate-600"}`}>
                <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${validations.number ? "bg-emerald-100" : "bg-slate-100"}`}>
                  {validations.number ? "✓" : "•"}
                </span>
                At least one number
              </li>
              <li className={`flex items-center gap-3 text-sm ${validations.special ? "text-emerald-700" : "text-slate-600"}`}>
                <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${validations.special ? "bg-emerald-100" : "bg-slate-100"}`}>
                  {validations.special ? "✓" : "•"}
                </span>
                At least one special character
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <FaInfoCircle />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Security Notice</h3>
                <p className="mt-2 text-sm text-slate-600">
                  After changing your password, you may be required to log in again on other devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
