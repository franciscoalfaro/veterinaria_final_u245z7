import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

const ListComment = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select('*, users:user_id (username)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
      setError("Error al cargar los comentarios.");
    } else {
      setComments(data);
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-600">
          Opiniones de nuestros clientes
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

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
      </div>
    </section>
  );
};

export default ListComment;
