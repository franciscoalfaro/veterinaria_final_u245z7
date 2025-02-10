import React, { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const ChangeImage = () => {
  // Estado para almacenar la lista de banners
  const [banners, setBanners] = useState([]);
  // Estados del formulario (solo dos campos: nombre y URL)
  const [nameBanner, setNameBanner] = useState("");
  const [url, setUrl] = useState("");

  // Para saber si se está editando (almacena el banner completo)
  const [editingBanner, setEditingBanner] = useState(null);
  // Estados para mensajes de feedback
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  useEffect(() => {
    fetchImageBanner();
  }, []);

  // Obtiene los banners desde Supabase
  const fetchImageBanner = async () => {
    const { data, error } = await supabase.from("banner").select("*");
    if (error) {
      console.error("Error fetching banner:", error);
    } else {
      setBanners(data);
    }
  };

  // Maneja el envío del formulario para crear o actualizar un banner
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionError(null);
    setSubmissionSuccess(null);

    // Validación: se requieren ambos campos
    if (!nameBanner || !url) {
      setSubmissionError("Por favor, rellena todos los campos.");
      return;
    }

    if (editingBanner) {
      // Actualizar el banner existente
      const { error } = await supabase
        .from("banner")
        .update({ name_banner: nameBanner, url })
        .eq("id", editingBanner.id);

      if (error) {
        setSubmissionError("No se pudo actualizar el banner.");
      } else {
        setSubmissionSuccess("Banner actualizado correctamente!");
        setEditingBanner(null);
      }
    } else {
      // Insertar un nuevo banner
      const { error } = await supabase
        .from("banner")
        .insert([{ name_banner: nameBanner, url }]);

      if (error) {
        setSubmissionError("No se pudo crear el banner.");
      } else {
        setSubmissionSuccess("Banner creado correctamente!");
      }
    }

    // Limpiar el formulario y actualizar la lista
    setNameBanner("");
    setUrl("");
    fetchImageBanner();
  };

  // Prepara el formulario para editar el banner seleccionado
  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setNameBanner(banner.name_banner);
    setUrl(banner.url);
  };

  // Elimina un banner de la tabla
  const handleDelete = async (bannerId) => {
    const { error } = await supabase.from("banner").delete().eq("id", bannerId);
    if (error) {
      setSubmissionError("No se pudo eliminar el banner.");
    } else {
      setSubmissionSuccess("Banner eliminado correctamente!");
      fetchImageBanner();
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Formulario para crear o editar banner */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg mb-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Panel de Administración
        </h2>
        <h3 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          {editingBanner ? "Editar Banner" : "Crear Nuevo Banner"}
        </h3>

        {submissionError && (
          <p className="text-red-500 text-center mb-4">{submissionError}</p>
        )}
        {submissionSuccess && (
          <p className="text-green-500 text-center mb-4">{submissionSuccess}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre del Banner"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={nameBanner}
            onChange={(e) => setNameBanner(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="URL de la Imagen"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`w-full py-2 text-white font-bold rounded-md transition-all ${
              editingBanner
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editingBanner ? "Actualizar Banner" : "Crear Banner"}
          </button>
        </form>
      </div>

      {/* Lista de banners */}
      <div className="w-full max-w-3xl grid grid-cols-1 gap-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded shadow-sm"
          >
            <div className="flex items-center">
              {banner.url && (
                <img
                  src={banner.url}
                  alt={banner.name_banner}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
              )}
              <div>
                <h4 className="text-lg font-semibold">{banner.name_banner}</h4>
                <p className="text-blue-600">{banner.url}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              {/* Botón para editar */}
              <button
                onClick={() => handleEdit(banner)}
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
              {/* Botón para eliminar */}
              <button
                onClick={() => handleDelete(banner.id)}
                className="text-red-600 hover:text-red-800 transition"
                title="Eliminar"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v2H8V5a2 2 0 012-2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChangeImage;
