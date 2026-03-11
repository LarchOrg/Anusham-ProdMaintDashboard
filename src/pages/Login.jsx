import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  LogIn,
  User,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/favicon.ico";
import bgImage from "../assets/Login_BG.png";
import { loginUser } from "../services/dashboardApi";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault(); // Prevent page refresh

    setLoginError("");
    setLoginSuccess("");

    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(username, password);

      console.log("Login Response:", response);

      localStorage.setItem("token", response.token);
      localStorage.setItem("userName", response.userName);
      localStorage.setItem("userId", response.userId);
      localStorage.setItem("companyId", response.companyId);

      setLoginSuccess("Login successful!...");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log("Login Failed:", error);

      setLoginError("Invalid username or password");

      setShake(true);
      setTimeout(() => setShake(false), 400);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Blur + Dim Overlay */}
      <div className="absolute inset-0 backdrop-blur-[3px] bg-black/20"></div>

      {/* Login Card */}
      <div
        className={`relative z-10 w-[420px] backdrop-blur-xl
        bg-white/90 border border-gray-200
        rounded-3xl shadow-2xl p-10
        ${shake ? "animate-shake" : ""}`}
      >
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl z-20">
            <Loader2 className="animate-spin text-blue-600" size={40} />
            <p className="text-sm text-gray-700 mt-3 font-medium">
              Checking credentials...
            </p>
          </div>
        )}

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 rounded-2xl bg-gray-100 shadow-inner mb-4">
            <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Larch<span className="text-blue-600">Analytics</span>
          </h1>

          <p className="text-xs text-gray-500 mt-1">
            Automotive Intelligence Platform
          </p>
        </div>

        {/* Alerts */}
        {loginError && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
            <AlertCircle size={20} className="text-red-500" />
            <span>{loginError}</span>
          </div>
        )}

        {loginSuccess && (
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-5">
            <CheckCircle2 size={20} className="text-green-600" />
            <span>{loginSuccess}</span>
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          
          {/* Username */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Username
            </label>

            <div className="relative mt-2">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

             <input
  type="text"
  autoFocus
  value={username}
  onChange={(e) => {
    setUsername(e.target.value);
    setLoginError("");
  }}
  className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm
  text-gray-900 bg-white placeholder-gray-400
  ${errors.username ? "border-red-400" : "border-gray-300"}
  focus:outline-none focus:ring-2
  ${errors.username ? "focus:ring-red-400" : "focus:ring-blue-500"}
  transition`}
  placeholder="Enter username"
/>
            </div>

            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => {
    setPassword(e.target.value);
    setLoginError("");
  }}
  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm
  text-gray-900 bg-white placeholder-gray-400
  ${errors.password ? "border-red-400" : "border-gray-300"}
  focus:outline-none focus:ring-2
  ${errors.password ? "focus:ring-red-400" : "focus:ring-blue-500"}
  transition`}
  placeholder="Enter password"
/>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2
            py-2.5 rounded-xl
            bg-blue-600 hover:bg-blue-700
            text-white text-sm font-semibold
            shadow-md shadow-blue-500/20
            transition-all duration-200
            disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Logging in...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Login
              </>
            )}
          </button>

        </form>
      </div>

      {/* Shake Animation */}
      <style>
        {`
          .animate-shake {
            animation: shake 0.35s;
          }

          @keyframes shake {
            0% { transform: translateX(0); }
            20% { transform: translateX(-6px); }
            40% { transform: translateX(6px); }
            60% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>

    </div>
  );
}