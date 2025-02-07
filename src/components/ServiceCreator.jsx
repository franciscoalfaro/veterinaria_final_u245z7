import React, { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const ServiceCreator = () => {
  const [services, setServices] = useState([]);
  const [typeService, setTypeService] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [icon, setIcon] = useState("");
  const [editingService, setEditingService] = useState(null);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase.from("services").select("*");
    if (error) {
      console.error("Error fetching services:", error);
    } else {
      setServices(data);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionError(null);
    setSubmissionSuccess(null);

    if (!typeService || !description || !price || !icon) {
      setSubmissionError("Por favor, rellena todos los campos.");
      return;
    }

    const formattedPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));

    if (editingService) {
      // Editar servicio existente
      const { error } = await supabase
        .from("services")
        .update({ name: typeService, description, price: formattedPrice, icon })
        .eq("id", editingService);

      if (error) {
        setSubmissionError("No se pudo actualizar el servicio.");
      } else {
        setSubmissionSuccess("Servicio actualizado correctamente!");
        setEditingService(null);
      }
    } else {
      // Crear nuevo servicio
      const { error } = await supabase
        .from("services")
        .insert([{ name: typeService, description, price: formattedPrice, icon }]);

      if (error) {
        setSubmissionError("No se pudo crear el servicio.");
      } else {
        setSubmissionSuccess("Servicio creado correctamente!");
      }
    }

    setTypeService("");
    setDescription("");
    setPrice("");
    setIcon("");
    fetchServices();
  };

  const handleEdit = (service) => {
    setTypeService(service.name);
    setDescription(service.description);
    setPrice(service.price.toString());
    setIcon(service.icon);
    setEditingService(service.id);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      console.error("Error deleting service:", error);
    } else {
      fetchServices();
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Panel de Administración
        </h2>
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          {editingService ? "Editar Servicio" : "Crear Nuevo Servicio"}
        </h2>

        {submissionError && <p className="text-red-500 text-center mb-4">{submissionError}</p>}
        {submissionSuccess && <p className="text-green-500 text-center mb-4">{submissionSuccess}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Tipo de Servicio"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={typeService}
            onChange={(e) => setTypeService(e.target.value)}
            required
          />
          <textarea
            placeholder="Descripción"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Precio"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Icono"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`w-full py-2 text-white font-bold rounded-md transition-all ${
              editingService ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editingService ? "Actualizar Servicio" : "Crear Servicio"}
          </button>
        </form>
      </div>

      {/* Lista de Servicios */}
      <div className="mt-10 w-full max-w-3xl bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">Servicios Creados</h3>
        {services.length === 0 ? (
          <p className="text-center text-gray-500">No hay servicios creados.</p>
        ) : (
          <ul className="space-y-4">
            {services.map((service) => (
              <li key={service.id} className="flex justify-between items-center p-4 border rounded-md">
                <div>
                  <p className="font-semibold">
                    {service.icon} {service.name}
                  </p>
                  <p className="text-gray-500">{service.description}</p>
                  <p className="text-blue-600 font-bold">${service.price.toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ServiceCreator;
