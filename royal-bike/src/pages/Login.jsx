// Login.jsx
import React, { useState } from "react";
import {
  FaFacebook,
  FaGoogle,
  FaEnvelope,
  FaArrowLeft,
  FaUser,
} from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import logo from "../assets/logo_site.png";
import LoginSuccessCard from "../components/LoginSuccessCard";
import { jwtDecode } from "jwt-decode";


const Login = () => {
  // Estado para saber si estamos en la vista de login o de registro
  const [isRegistering, setIsRegistering] = useState(false);

  // Estados para los campos de los formularios
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  // Estados para controlar el formulario de registro
  const [errors, setErrors] = useState({});

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateLoginForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const payload = {
      username: loginUsername,
      password: loginPassword,
    };

    try {
      const response = await fetch("http://localhost:8001/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        const decoded = jwtDecode(data.access);
        setLoggedInUser(decoded.username); // por ejemplo, guardar en un useState
        setLoginSuccess(true); // muestra el componente de éxito
        localStorage.setItem("accessToken", data.access);
        // navigate("/dashboard"); // si usas React Router
      } else {
        alert(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error en login:", err);
      alert("Error de conexión con el servidor.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Limpia errores anteriores
    setErrors({});

    // Datos del formulario
    const payload = {
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
    };

    try {
      const response = await fetch(
        "http://localhost:8001/auth/register/user/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Usuario registrado");
        setRegisterUsername("");
        setRegisterEmail("");
        setRegisterPassword("");
      } else {
        alert(data.error || "Hubo un problema al registrar el usuario.");
      }
    } catch (err) {
      console.error("Error en el registro:", err);
      alert("Error al conectar con el servidor.");
    }
  };

  const validateLoginForm = () => {
    const newErrors = {};
    if (!loginUsername.trim()) {
      newErrors.email = "El correo electrónico es requerido.";
    }
    if (!loginPassword) {
      newErrors.password = "La contraseña es requerida.";
      //solo controlar contraseña vacía
    } else if (!loginPassword.trim()) {
      newErrors.password = "La contraseña no puede estar vacía.";
    }
    return newErrors;
  };

  const validateForm = () => {
    const newErrors = {};

    // 1. Validación del Nombre de Usuario
    if (!registerUsername.trim()) {
      newErrors.username = "El nombre de usuario es requerido.";
    } else if (/\d/.test(registerUsername)) {
      newErrors.username = "El nombre no debe contener números.";
    }

    // 2. Validación del Correo Electrónico
    if (!registerEmail.trim()) {
      newErrors.email = "El correo electrónico es requerido.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail)) {
      newErrors.email = "El formato del correo no es válido.";
    }

    // 3. Validación de la Contraseña
    if (!registerPassword) {
      newErrors.password = "La contraseña es requerida.";
    } else if (registerPassword.length < 5) {
      newErrors.password = "La contraseña debe tener al menos 5 caracteres.";
    }

    return newErrors;
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
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Bienvenido de nuevo!
          </h2>

          <div className="flex justify-center my-2">
            <img src={logo} alt="Logo" className="w-20 h-20" />
          </div>

          {loginSuccess ? (
            <LoginSuccessCard username={loggedInUser} />
          ) : (
            <form onSubmit={handleLoginSubmit} noValidate>
              <div className="mb-5">
                <div className="flex items-center border border-gray-300 rounded-md py-2 px-4 w-full bg-white focus-within:ring-2 focus-within:ring-yellow-500">
                  <FaUser className="text-gray-400 mr-3" size={18} />
                  <input
                    type="text"
                    placeholder="Nombre de usuario"
                    className="flex-1 outline-none bg-transparent"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs ml-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-5">
                <div className="flex items-center border border-gray-300 rounded-md py-2 px-4 w-full bg-white focus-within:ring-2 focus-within:ring-yellow-500">
                  <TbLockPassword className="text-gray-400 mr-3" size={18} />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="flex-1 outline-none bg-transparent"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs ml-1">{errors.password}</p>
                )}
              </div>
              <div className="text-right text-sm text-gray-600 hover:underline cursor-pointer">
                <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
              </div>
              <button
                type="submit"
                className="bg-gray-800 text-white rounded-md py-3 px-6 w-full my-4 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
              >
                Iniciar sesión
              </button>
            </form>
          )}
          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">
              O inicia sesión con
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center">
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
            onClick={() => {
              setIsRegistering(false);
              setErrors({});
            }}
            className="absolute top-4 left-4 text-gray-600 cursor-pointer hover:text-gray-900"
          >
            <FaArrowLeft size={24} />
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800">
            Crear cuenta
          </h2>

          <div className="flex justify-center my-4">
            <img src={logo} alt="Logo" className="w-28 h-28" />
          </div>

          <form onSubmit={handleRegisterSubmit} noValidate>
            <div className="mb-5">
              <div className="flex items-center border border-gray-300 rounded-md py-2 px-4 w-full bg-white focus-within:ring-2 focus-within:ring-yellow-500">
                <FaUser className="text-gray-400 mr-3" size={18} />
                <input
                  type="text"
                  placeholder="Nombre de usuario"
                  className="flex-1 outline-none bg-transparent"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  required
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs ml-1">{errors.username}</p>
              )}
            </div>
            <div className="mb-5">
              <div className="flex items-center border border-gray-300 rounded-md py-2 px-4 w-full bg-white focus-within:ring-2 focus-within:ring-yellow-500">
                <FaEnvelope className="text-gray-400 mr-3" size={18} />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="flex-1 outline-none bg-transparent"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs ml-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-5">
              <div className="flex items-center border border-gray-300 rounded-md py-2 px-4 w-full bg-white focus-within:ring-2 focus-within:ring-yellow-500">
                <TbLockPassword className="text-gray-400 mr-3" size={18} />
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="flex-1 outline-none bg-transparent"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs ml-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-gray-800 text-white rounded-md py-3 px-6 w-full my-3 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
