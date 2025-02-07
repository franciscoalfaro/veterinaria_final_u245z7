import React, { useState } from "react";
import supabase from "../supabaseClient";

const ServiceCreator = () => {
  const [typeService, setTypeService] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [icon, setIcon] = useState("");
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionError(null);
    setSubmissionSuccess(null);

    if (!typeService || !description || !price || !icon) {
      setSubmissionError("Por favor, rellena todos los campos.");
      return;
    }

    const formattedPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));

    const { data, error } = await supabase
      .from("services")
      .insert([{ name: typeService, description, price: formattedPrice, icon }]);

    if (error) {
      setSubmissionError("No se pudo crear el servicio. Inténtalo de nuevo.");
    } else {
      setSubmissionSuccess("Servicio creado correctamente!");
      setTypeService("");
      setDescription("");
      setPrice("");
      setIcon("");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Crear Nuevo Servicio</h2>

        {submissionError && <p className="text-red-500 text-center mb-4">{submissionError}</p>}
        {submissionSuccess && <p className="text-green-500 text-center mb-4">{submissionSuccess}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
            <span className="text-gray-500">📌</span>
            <input
              type="text"
              placeholder="Tipo de Servicio (ej: Corte de Pelo)"
              className="w-full outline-none bg-transparent"
              value={typeService}
              onChange={(e) => setTypeService(e.target.value)}
              required
            />
          </div>

          <div className="border border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
            <textarea
              placeholder="Descripción del Servicio"
              className="w-full outline-none bg-transparent resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
            <span className="text-gray-500">💲</span>
            <input
              type="text"
              placeholder="Precio (ej: $25.000)"
              className="w-full outline-none bg-transparent"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
            <span className="text-gray-500">🎨</span>
            <input
              type="text"
              placeholder="Icono (ej: ✂️)"
              className="w-full outline-none bg-transparent"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition-all duration-200"
          >
            Crear Servicio
          </button>
        </form>
      </div>
    </section>
  );
};

export default ServiceCreator;
