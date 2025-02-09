import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Error = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl text-center transform hover:scale-105 transition-transform duration-300">
        <img src="/imagenes/404.webp" alt="404 Error" className="w-96 h-auto mx-auto mb-6 rounded-lg" />
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 tracking-wide">¡Ups!</h1>
        <h2 className="text-3xl font-bold text-red-500 mb-2">404 - Página No Encontrada</h2>
        <p className="text-lg text-gray-600 mb-4">
          La página que estás buscando no existe o ha sido movida.
        </p>
        <p className="text-md text-gray-500 mb-8">
          URL solicitada: {location.pathname}
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300"
        >
          Regresar a la Página Principal
        </Link>
      </div>
    </div>
  );
};

export default Error;
