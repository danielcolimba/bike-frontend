// Login.jsx
import React, { useState } from "react";
import { FaFacebook, FaGoogle, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import logo from "../assets/logo_site.png";


const Login = () => {
  // Estado para saber si estamos en la vista de login o de registro
  const [isRegistering, setIsRegistering] = useState(false);

  // Estados para los campos de los formularios
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", {
      email: loginEmail,
      password: loginPassword,
    });
    alert("Funcionalidad de login no implementada.");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Register attempt:", {
      email: registerEmail,
      password: registerPassword,
    });
    alert("Funcionalidad de registro no implementada.");
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-yellow-300 to-white flex items-center justify-center p-4">
      {/* Logo and Site Name Container */}
      <a
        href="/"
        className="absolute top-4 left-4 flex flex-col items-center w-32 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
        aria-label="Go to main page"
      >
        <img src={logo} alt="Logo" className="w-12 h-12 mb-2 mx-auto" />
        <div className="text-gray-800 font-semibold text-lg mt-1 text-center">
          The Royal Bike
        </div>
      </a>

      {/* Contenedor principal que manejará el overflow y la posición relativa */}
      <div className="relative max-w-md w-full h-[550px] overflow-hidden">
        {/* === TARJETA DE LOGIN === */}
        <div
          className={`absolute top-0 left-0 w-full h-full bg-white shadow-lg rounded-xl p-8 transform transition-transform duration-500 ease-in-out ${
            isRegistering ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Welcome Back!
          </h2>

          <form onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md py-2 px-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-md py-2 px-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <div className="text-right text-sm text-gray-600 hover:underline cursor-pointer">
              Forgot password?
            </div>
            <button
              type="submit"
              className="bg-gray-800 text-white rounded-md py-3 px-6 w-full my-4 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            >
              Log in
            </button>
          </form>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">
              Or sign in with
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center mt-4">
            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center mx-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
              <FaGoogle className="text-red-600" size={22} />
            </div>
            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center mx-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
              <FaFacebook className="text-blue-600" size={22} />
            </div>
            {/* --- BOTÓN TRIGGER PARA REGISTRO --- */}
            <div
              onClick={() => setIsRegistering(true)}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center mx-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            >
              <FaEnvelope className="text-gray-600" size={22} />
            </div>
          </div>
        </div>

        {/* === TARJETA DE REGISTRO === */}
        <div
          className={`absolute top-0 left-0 w-full h-full bg-white shadow-lg rounded-xl p-8 transform transition-transform duration-500 ease-in-out ${
            isRegistering ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* --- BOTÓN PARA REGRESAR --- */}
          <div
            onClick={() => setIsRegistering(false)}
            className="absolute top-4 left-4 text-gray-600 cursor-pointer hover:text-gray-900"
          >
            <FaArrowLeft size={24} />
          </div>

          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Create Account
          </h2>

          <form onSubmit={handleRegisterSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md py-2 px-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-md py-2 px-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-gray-800 text-white rounded-md py-3 px-6 w-full my-4 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
