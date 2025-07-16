import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccessCard = ({ username }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige a home luego de 3 segundos
    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="bg-green-100 text-green-800 border border-green-400 rounded-lg p-6 text-center shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-2">¡Bienvenido, {username}!</h2>
      <p className="text-sm">Inicio de sesión exitoso. Redirigiendo al inicio...</p>
    </div>
  );
};

export default LoginSuccessCard;
