import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import supabase from '../supabaseClient';

const CommentSection = () => {
  const { isLoggedIn, userRole, userId } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchComments();
    }
  }, [isLoggedIn]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*, users:user_id (username)')
      .eq('user_id', userId) // Filtrar solo los comentarios del usuario actual
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
      setError('Error al cargar los comentarios.');
    } else {
      setComments(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isLoggedIn || userRole !== 'user') {
      setError('Solo los usuarios registrados pueden publicar comentarios.');
      return;
    }

    const { error: insertError } = await supabase
      .from('comments')
      .insert([{ user_id: userId, comment: newComment }]);

    if (insertError) {
      setError('Error al publicar el comentario.');
      console.error('Error submitting comment:', insertError);
    } else {
      setNewComment('');
      fetchComments();
    }
  };

  const handleDelete = async (commentId) => {
    const { error: deleteError } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)
      .eq('user_id', userId); // Asegurar que solo el usuario puede eliminar su comentario

    if (deleteError) {
      console.error('Error deleting comment:', deleteError);
      setError('Error al eliminar el comentario.');
    } else {
      fetchComments();
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-600">
        Sección de Comentarios
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center col-span-3">
            No has publicado ningún comentario aún.
          </p>
        ) : (
          comments.map((comment) => (
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
                {comment.users?.username || 'Usuario desconocido'}
              </p>
              {/* Comentario */}
              <p className="text-gray-700 italic mt-2">"{comment.comment}"</p>
              {/* Fecha */}
              <p className="text-sm text-gray-500 mt-2">
                {new Date(comment.created_at).toLocaleString()}
              </p>
              {/* Botón de eliminar */}
              <button
                onClick={() => handleDelete(comment.id)}
                className="mt-3 px-4 py-1 bg-red-600 text-white text-sm font-bold rounded-md hover:bg-red-700 transition-all"
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
<br></br>
      {isLoggedIn && userRole === 'user' && (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe tu comentario aquí..."
            className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 text-white font-bold rounded-md bg-blue-600 hover:bg-blue-700 transition-all"
          >
            Publicar Comentario
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
