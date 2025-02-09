import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';  // Importamos los íconos de React Icons

const ListComment = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);        // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const commentsPerPage = 3;                  // Comentarios por página

  useEffect(() => {
    fetchComments();
  }, [page]);

  const fetchComments = async () => {
    const { data, error, count } = await supabase
      .from("comments")
      .select('*, users:user_id (username)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * commentsPerPage, page * commentsPerPage - 1);

    if (error) {
      console.error("Error fetching comments:", error);
      setError("Error al cargar los comentarios.");
    } else {
      setComments(data);
      setTotalPages(Math.ceil(count / commentsPerPage)); 
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-600">
          Opiniones de nuestros clientes
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Contenedor relativo para posicionar los botones sobre la cuadrícula */}
        <div className="relative">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center">No hay comentarios aún.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg border-2 border-gray-200 hover:border-blue-500"
                >
                  {/* Imagen de perfil */}
                  <img
                    src="/imagenes/default.png"
                    alt="Usuario"
                    className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-blue-400 shadow-md"
                  />
                  {/* Nombre de usuario */}
                  <p className="font-semibold text-blue-700 text-lg">
                    {comment.users?.username || "Usuario desconocido"}
                  </p>
                  {/* Comentario */}
                  <p className="text-gray-700 italic mt-2">"{comment.comment}"</p>
                  {/* Fecha */}
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(comment.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Botón de paginación izquierda superpuesto con ícono */}
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 text-blue-500  p-3 rounded-full hover:bg-blue-100 hover:text-blue-700 z-10"
          >
            <FaArrowLeft /> {/* Ícono de flecha izquierda */}
          </button>
          {/* Botón de paginación derecha superpuesto con ícono */}
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 text-blue-500  p-3 rounded-full hover:bg-blue-100 hover:text-blue-700 z-10"
          >
            <FaArrowRight /> {/* Ícono de flecha derecha */}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ListComment;
