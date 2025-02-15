import React, { useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";

const MedicalHistorySearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Maneja la búsqueda al enviar el formulario
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Realizamos la búsqueda en los campos owner_name y pet_name
      const { data, error } = await supabase
        .from("medicalhistory")  // Asegúrate de usar el nombre correcto de la tabla (en minúsculas)
        .select("*")
        .or(`owner_name.ilike.%${searchQuery}%,pet_name.ilike.%${searchQuery}%`)
        .order("created_at", { ascending: false });
        
        
      if (error) {
        setError(error.message);
      } else {
        setResults(data);
      }
    } catch (err) {
      setError(err.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-4 text-center">Buscar Ficha Médica</h2>
      <form onSubmit={handleSearch} className="mb-6 flex">
        <input
          type="text"
          placeholder="Buscar por nombre del dueño o de la mascota"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-md transition"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {(!loading && results.length === 0) ? (
        <p className="text-gray-600 text-center">No se encontraron resultados.</p>
      ) : (
        <div className="space-y-4">
          {results.map((record) => (
            <div
              key={record.id}
              className="p-4 border rounded-md relative flex flex-col md:flex-row md:justify-between"
            >
              <div>
                <h3 className="text-xl font-bold">{record.pet_name}</h3>
                <p>
                  <span className="font-semibold">Dueño:</span> {record.owner_name}
                </p>
                <p>
                  <span className="font-semibold">Fecha de Visita:</span> {record.visit_date}
                </p>
                <p>
                  <span className="font-semibold">Diagnóstico:</span> {record.diagnosis}
                </p>
                {/* Puedes agregar más campos si lo deseas */}
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                {/* Ícono para editar que redirige al formulario con el registro a editar */}
                <Link to="/medical-history" state={{ record }}>
                  <button
                    className="text-green-600 hover:text-green-800 transition"
                    title="Editar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
                      />
                    </svg>
                  </button>
                </Link>
                {/* Aquí puedes agregar otros botones (por ejemplo, para eliminar) */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalHistorySearch;
