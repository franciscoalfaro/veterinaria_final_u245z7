import React, { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null); // Estado para el modal
  const [loading, setLoading] = useState(false); // Estado de carga

  useEffect(() => {
    fetchAppointments();
  }, [showCompleted]); // Se ejecuta cuando cambia showCompleted

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false });

      if (!showCompleted) {
        query = query.eq("completed", false);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAppointments(data);
      setFetchError(null);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setFetchError("No se pudieron obtener las citas.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteChange = async (appointmentId, currentCompleted) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ completed: !currentCompleted })
        .eq("id", appointmentId);

      if (error) throw error;

      // Recargar la lista después de actualizar la cita
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment:", error);
      setFetchError("No se pudo actualizar la cita.");
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Panel de Administración
        </h2>

        <div className="mb-4 flex items-center">
          <input
            id="showCompleted"
            type="checkbox"
            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
          />
          <label htmlFor="showCompleted" className="text-gray-700">
            Mostrar Citas Completadas
          </label>
        </div>

        <h3 className="text-2xl font-bold text-left mt-2 mb-4 text-blue-600">
          Citas Agendadas
        </h3>
        {fetchError && <p className="text-center text-red-500 mb-4">{fetchError}</p>}

        {/* Indicador de carga */}
        {loading ? (
          <p className="text-center text-blue-600">Cargando citas...</p>
        ) : (
          <>
            {appointments && appointments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-xl overflow-hidden">
                  <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white border-b-2 border-gray-300">
                    <tr>
                      {["ID", "Paciente", "Contacto", "Emergencia", "Fecha", "Hora", "Notas", "Completada", "Creada"].map(
                        (header, index) => (
                          <th key={index} className="px-6 py-3 text-left text-sm font-semibold uppercase border-r border-gray-400 last:border-r-0">
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-gray-100 transition-all">
                        <td className="px-6 py-4 text-gray-700 font-medium border-r border-gray-300">{appointment.id}</td>
                        <td className="px-6 py-4 border-r border-gray-300">{appointment.patient_name}</td>
                        <td className="px-6 py-4 border-r border-gray-300">{appointment.contact_info}</td>
                        <td className="px-6 py-4 border-r border-gray-300">{appointment.emergency_type}</td>
                        <td className="px-6 py-4 border-r border-gray-300">{new Date(appointment.preferred_date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 border-r border-gray-300">{appointment.preferred_time}</td>
                        <td className="px-6 py-4 border-r border-gray-300 text-center">
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => setSelectedNote(appointment.additional_notes)}
                          >
                            Ver Nota
                          </button>
                        </td>
                        <td className="px-6 py-4 text-center border-r border-gray-300">
                          <input
                            type="checkbox"
                            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            checked={appointment.completed}
                            onChange={() => handleCompleteChange(appointment.id, appointment.completed)}
                          />
                        </td>
                        <td className="px-6 py-4">{new Date(appointment.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center">No hay citas agendadas.</p>
            )}
          </>
        )}

        {/* Modal de Notas */}
        {selectedNote && (
          <div
            className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50"
            onClick={() => setSelectedNote(null)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full relative animate-fade-in"
              onClick={(e) => e.stopPropagation()} // Evitar cerrar al hacer clic dentro del modal
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Nota de la Cita</h3>
              <p className="text-gray-700">{selectedNote}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => setSelectedNote(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
