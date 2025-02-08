import React, { useState } from "react";
import supabase from '../supabaseClient';

function Appointment() {
  const [patientName, setPatientName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [emergencyType, setEmergencyType] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(null); // Added success state


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!patientName || !contactInfo || !emergencyType || !preferredDate || !preferredTime) {
      setSubmissionError('Por favor, rellena todos los campos.');
      setSubmissionSuccess(null); // Reset success message on new submission attempt
      return;
    }
    setSubmissionError(null);
    setSubmissionSuccess(null); // Reset success message

    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          patient_name: patientName,
          contact_info: contactInfo,
          emergency_type: emergencyType,
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          additional_notes: additionalNotes
        }
      ]);

    if (error) {
      setSubmissionError('No se pudo agendar la cita. Por favor, inténtalo de nuevo.');
      setSubmissionSuccess(null); // Ensure success message is cleared on error
    } else {
      setSubmissionSuccess('Cita agendada correctamente!'); // Set success message
      setSubmissionError(null); // Clear any previous errors
      // Reset form fields
      setPatientName('');
      setContactInfo('');
      setEmergencyType('');
      setPreferredDate('');
      setPreferredTime('');
      setAdditionalNotes('');
    }
  };


  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-12 py-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">Agendar una Cita</h2>
            <p className="text-center text-gray-600 mb-6">Por favor, completa el formulario para agendar una cita para tu mascota. Nos pondremos en contacto contigo para confirmar la hora.</p>
            {submissionError && <p className="text-center text-red-500 mb-4">{submissionError}</p>}
            {submissionSuccess && <p className="text-center text-green-500 mb-4">{submissionSuccess}</p>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="patientName" className="block text-gray-700 text-sm font-bold mb-2">Nombre de la Mascota</label>
                <input
                  type="text"
                  id="patientName"
                  placeholder="Ej: Max, Luna"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="contactInfo" className="block text-gray-700 text-sm font-bold mb-2">Información de Contacto</label>
                <input
                  type="text"
                  id="contactInfo"
                  placeholder="Email o Teléfono"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="emergencyType" className="block text-gray-700 text-sm font-bold mb-2">Tipo de Emergencia</label>
                <select
                  id="emergencyType"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={emergencyType}
                  onChange={(e) => setEmergencyType(e.target.value)}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Consulta general">Consulta general</option>
                  <option value="Vacunación">Vacunación</option>
                  <option value="Cirugía">Cirugía</option>
                  <option value="Emergencia">Emergencia</option>
                </select>
              </div>
              <div className="md:flex md:space-x-4">
                <div className="md:w-1/2">
                  <label htmlFor="preferredDate" className="block text-gray-700 text-sm font-bold mb-2">Fecha Preferida</label>
                  <input
                    type="date"
                    id="preferredDate"
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                  />
                </div>
                <div className="md:w-1/2">
                  <label htmlFor="preferredTime" className="block text-gray-700 text-sm font-bold mb-2">Hora Preferida</label>
                  <input
                    type="time"
                    id="preferredTime"
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="additionalNotes" className="block text-gray-700 text-sm font-bold mb-2">Notas Adicionales (Opcional)</label>
                <textarea
                  id="additionalNotes"
                  placeholder="Información adicional que desees compartir"
                  rows="3"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <button type="submit" className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline transition duration-300">
                  Agendar Cita
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Appointment;
