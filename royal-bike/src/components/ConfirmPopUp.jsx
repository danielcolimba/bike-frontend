import React from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const ConfirmPopUp = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirmar Compra", 
  message = "¿Estás seguro de que deseas proceder con esta compra?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  total = 0,
  credits = 0
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes size={20} />
        </button>

        {/* Ícono de confirmación */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          {title}
        </h2>

        {/* Mensaje */}
        <p className="text-gray-600 text-center mb-6">
          {message}
        </p>

        {/* Detalles de la compra */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">Total a pagar:</span>
            <span className="text-2xl font-bold text-yellow-600">
              ${total.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Tus créditos disponibles:</span>
            <span className="text-lg font-semibold text-green-600">
              ${credits.toFixed(2)}
            </span>
          </div>
          
          {credits < total && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">
                ⚠️ No tienes suficientes créditos para completar esta compra.
              </p>
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={credits < total}
            className={`flex-1 px-4 py-3 font-medium rounded-lg transition-colors ${
              credits < total
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg hover:shadow-xl'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopUp;