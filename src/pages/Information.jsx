import React, { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const Information = () => {
  const [info, setInfo] = useState(null);
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hours, setHours] = useState([]);
  const [newHours, setNewHours] = useState({
    day_of_week: "",
    opening_time: "",
    closing_time: "",
  });
  const [editingInfo, setEditingInfo] = useState(false); // Track if contact info is being edited
  const [hoursEditing, setHoursEditing] = useState(null); // Track which hour is being edited
  const [socialNetworks, setSocialNetworks] = useState([]);
  const [newSocial, setNewSocial] = useState({ name_social: "", url: "https://" }); // Initialize URL with https://
  const [fetchError, setFetchError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [hoursSubmitError, setHoursSubmitError] = useState(null);
  const [hoursSubmitSuccess, setHoursSubmitSuccess] = useState(null);
  const [socialSubmitError, setSocialSubmitError] = useState(null);
  const [socialSubmitSuccess, setSocialSubmitSuccess] = useState(null);


  useEffect(() => {
    fetchInformation();
    fetchBusinessHours();
    fetchSocialNetworks();
  }, []);

  const clearMessages = () => {
    setFetchError(null);
    setSubmitError(null);
    setSubmitSuccess(null);
    setHoursSubmitError(null);
    setHoursSubmitSuccess(null);
    setSocialSubmitError(null);
    setSocialSubmitSuccess(null);
  };

  const fetchInformation = async () => {
    clearMessages();
    const { data, error } = await supabase.from("information").select("*").single();
    if (error) {
      console.error("Error fetching information:", error);
      setFetchError("Error al cargar la información de contacto.");
    } else if (data) {
      setInfo(data);
      setDireccion(data.direccion || "");
      setCiudad(data.ciudad || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
    }
  };

  const fetchBusinessHours = async () => {
    clearMessages();
    const { data, error } = await supabase.from("business_hours").select("*");
    if (error) {
      console.error("Error fetching hours:", error);
      setFetchError("Error al cargar el horario de atención.");
    } else {
      setHours(data || []);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    if (!direccion || !ciudad || !email || !phone) {
      setSubmitError("Por favor, rellena todos los campos de información de contacto.");
      return;
    }

    const updates = { direccion, ciudad, email, phone };

    let error = null;
    if (editingInfo && info?.id) { // Use editingInfo state
      const response = await supabase
        .from("information")
        .update(updates)
        .eq("id", info.id);
      error = response.error;
    } else {
      const response = await supabase
        .from("information")
        .insert([updates]);
      error = response.error;
    }

    if (error) {
      console.error("Error submitting info:", error);
      setSubmitError("Error al guardar/actualizar la información de contacto.");
    } else {
      setSubmitSuccess("Información de contacto guardada/actualizada con éxito.");
      setEditingInfo(false); // Reset editingInfo state
      fetchInformation(); // Refresh information to reflect changes
    }
  };


  const handleAddHours = async () => {
    clearMessages();
    if (!newHours.day_of_week || !newHours.opening_time || !newHours.closing_time) {
      setHoursSubmitError("Por favor, completa todos los campos del horario.");
      return;
    }
    const { error } = await supabase.from("business_hours").insert([newHours]);
    if (error) {
      console.error("Error adding hours:", error);
      setHoursSubmitError("Error al añadir el horario.");
    } else {
      setHoursSubmitSuccess("Horario añadido con éxito.");
      setNewHours({ day_of_week: "", opening_time: "", closing_time: "" });
      fetchBusinessHours(); // Refresh hours to reflect changes
    }
  };

  const fetchSocialNetworks = async () => {
    clearMessages();
    const { data, error } = await supabase.from("social_network").select("*");
    if (error) {
      console.error("Error fetching social networks:", error);
      setFetchError("Error al cargar redes sociales.");
    }
    else setSocialNetworks(data || []);
  };

  const handleAddSocial = async () => {
    clearMessages();
    if (!newSocial.name_social || !newSocial.url) {
      setSocialSubmitError("Por favor, completa todos los campos de redes sociales.");
      return;
    }
    const { error } = await supabase.from("social_network").insert([newSocial]);
    if (error) {
      console.error("Error adding social network:", error);
      setSocialSubmitError("Error al añadir red social.");
    } else {
      setSocialSubmitSuccess("Red social añadida con éxito.");
      setNewSocial({ name_social: "", url: "https://" }); // Reset URL to https://
      fetchSocialNetworks(); // Refresh social networks to reflect changes
    }
  };

  const handleDeleteSocial = async (id) => {
    clearMessages();
    const { error } = await supabase.from("social_network").delete().eq("id", id);
    if (error) {
      console.error("Error deleting social network:", error);
      setSocialSubmitError("Error al eliminar red social.");
    }
    else fetchSocialNetworks(); // Refresh social networks to reflect changes
  };

  const handleDeleteHour = async (id) => {
    clearMessages();
    const { error } = await supabase.from("business_hours").delete().eq("id", id);
    if (error) {
      console.error("Error deleting business hour:", error);
      setHoursSubmitError("Error al eliminar el horario.");
    } else {
      setHoursSubmitSuccess("Horario eliminado con éxito.");
      fetchBusinessHours(); // Refresh business hours
    }
  };

  const handleEditHour = (hour) => {
    setHoursEditing(hour.id);
    setNewHours({
      day_of_week: hour.day_of_week,
      opening_time: hour.opening_time,
      closing_time: hour.closing_time,
    });
  };

  const handleCancelEditHour = () => {
    setHoursEditing(null);
    setNewHours({ day_of_week: "", opening_time: "", closing_time: "" });
  };

  const handleUpdateHour = async (id) => {
    clearMessages();
    if (!newHours.day_of_week || !newHours.opening_time || !newHours.closing_time) {
      setHoursSubmitError("Por favor, completa todos los campos del horario.");
      return;
    }
    const { error } = await supabase
      .from("business_hours")
      .update(newHours)
      .eq("id", id);

    if (error) {
      console.error("Error updating business hour:", error);
      setHoursSubmitError("Error al actualizar el horario.");
    } else {
      setHoursSubmitSuccess("Horario actualizado con éxito.");
      setHoursEditing(null);
      setNewHours({ day_of_week: "", opening_time: "", closing_time: "" });
      fetchBusinessHours(); // Refresh business hours
    }
  };


  const handleSocialUrlChange = (e) => {
    let urlValue = e.target.value;
    if (!urlValue.startsWith('https://') && !urlValue.startsWith('http://') && urlValue) {
      urlValue = 'https://' + urlValue;
    }
    setNewSocial({ ...newSocial, url: urlValue });
  };


  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Updated grid-cols */}

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
            Información de Contacto
          </h2>
          {fetchError && <p className="text-red-500 mb-2">{fetchError}</p>}
          {submitError && <p className="text-red-500 mb-2">{submitError}</p>}
          {submitSuccess && <p className="text-green-500 mb-2">{submitSuccess}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Dirección"
              className="w-full p-2 border rounded-md"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
              disabled={!editingInfo} // Disable when not editing
            />
            <input
              type="text"
              placeholder="Ciudad"
              className="w-full p-2 border rounded-md"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              required
              disabled={!editingInfo}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={!editingInfo}
            />
            <input
              type="text"
              placeholder="Teléfono"
              className="w-full p-2 border rounded-md"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              disabled={!editingInfo}
            />
            {!editingInfo ? (
              <button
                type="button"
                onClick={() => setEditingInfo(true)}
                className="w-full py-2 text-white font-bold rounded-md bg-blue-600 hover:bg-blue-700"
              >
                Editar Información
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="w-1/2 py-2 text-white font-bold rounded-md bg-green-600 hover:bg-green-700"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setEditingInfo(false)}
                  className="w-1/2 py-2 text-white font-bold rounded-md bg-gray-400 hover:bg-gray-500"
                >
                  Cancelar
                </button>
              </div>
            )}
          </form>
        </div>


        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
            Horario de Atención
          </h2>
          {fetchError && <p className="text-red-500 mb-2">{fetchError}</p>}
          {hoursSubmitError && <p className="text-red-500 mb-2">{hoursSubmitError}</p>}
          {hoursSubmitSuccess && <p className="text-green-500 mb-2">{hoursSubmitSuccess}</p>}
          <div className="space-y-4">
            {hours.map((hour) => (
              <div
                key={hour.id}
                className="p-3 border rounded-md flex flex-col md:flex-row justify-between items-center" // Adjusted flex direction
              >
                {hoursEditing === hour.id ? (
                  <div className="flex-1 flex flex-col space-y-2 md:space-x-2 md:space-y-0"> {/* Vertical on mobile, horizontal on desktop */}
                    <input
                      type="text"
                      placeholder="Día"
                      className="p-2 border rounded-md"
                      value={newHours.day_of_week}
                      onChange={(e) => setNewHours({ ...newHours, day_of_week: e.target.value })}
                    />
                    <input
                      type="time"
                      className="p-2 border rounded-md"
                      value={newHours.opening_time}
                      onChange={(e) => setNewHours({ ...newHours, opening_time: e.target.value })}
                    />
                    <input
                      type="time"
                      className="p-2 border rounded-md"
                      value={newHours.closing_time}
                      onChange={(e) => setNewHours({ ...newHours, closing_time: e.target.value })}
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleUpdateHour(hour.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded-md"
                      >
                        Actualizar
                      </button>
                      <button
                        onClick={handleCancelEditHour}
                        className="bg-gray-400 text-white px-3 py-1 rounded-md"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-2 md:mb-0"> {/* Added margin bottom for mobile layout */}
                      <p className="font-semibold">{hour.day_of_week}</p>
                      <p className="text-gray-500">
                        {hour.opening_time} - {hour.closing_time}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEditHour(hour)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteHour(hour.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md"
                      >
                        Eliminar
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Añadir Horario</h3>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Día (Ej: Lunes)"
                className="p-2 border rounded-md"
                value={newHours.day_of_week}
                onChange={(e) => setNewHours({ ...newHours, day_of_week: e.target.value })}
              />
              <input
                type="time"
                className="p-2 border rounded-md"
                value={newHours.opening_time}
                onChange={(e) => setNewHours({ ...newHours, opening_time: e.target.value })}
              />
              <input
                type="time"
                className="p-2 border rounded-md"
                value={newHours.closing_time}
                onChange={(e) => setNewHours({ ...newHours, closing_time: e.target.value })}
              />
              <button
                onClick={handleAddHours}
                className="w-full py-2 text-white font-bold rounded-md bg-green-600 hover:bg-green-700"
              >
                Añadir Horario
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">Redes Sociales</h2>
          {fetchError && <p className="text-red-500 mb-2">{fetchError}</p>}
          {socialSubmitError && <p className="text-red-500 mb-2">{socialSubmitError}</p>}
          {socialSubmitSuccess && <p className="text-green-500 mb-2">{socialSubmitSuccess}</p>}

          {socialNetworks.map((social) => (
            <div key={social.id} className="p-3 border rounded-md flex justify-between items-center">
              <div>
                <p className="font-semibold">{social.name_social}</p>
                <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {social.url}
                </a>
              </div>
              <button
                onClick={() => handleDeleteSocial(social.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-md"
              >
                Eliminar
              </button>
            </div>
          ))}

          {/* Agregar nueva red social */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Añadir Red Social</h3>
            <input
              type="text"
              placeholder="Nombre (Ej: Facebook)"
              className="w-full p-2 border rounded-md mb-2"
              value={newSocial.name_social}
              onChange={(e) => setNewSocial({ ...newSocial, name_social: e.target.value })}
            />
            <input
              type="url"
              placeholder="URL (Ej: https://facebook.com)"
              className="w-full p-2 border rounded-md mb-2"
              value={newSocial.url}
              onChange={handleSocialUrlChange} // Use handleSocialUrlChange
            />
            <button
              onClick={handleAddSocial}
              className="w-full py-2 text-white font-bold rounded-md bg-green-600 hover:bg-green-700"
            >
              Añadir Red Social
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Information;
