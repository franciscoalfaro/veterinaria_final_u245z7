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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!patientName || !contactInfo || !emergencyType || !preferredDate || !preferredTime) {
      setSubmissionError('Por favor, rellena todos los campos.');
      return;
    }
    setSubmissionError(null);

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
      console.error("Error al enviar la cita:", error);
      setSubmissionError('No se pudo agendar la cita. Por favor, inténtalo de nuevo.');
    } else {
      console.log("Cita enviada correctamente:", data);
      alert('Cita agendada correctamente!');
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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Agendar Cita</h2>
        {submissionError && <p className="text-center text-red-500 mb-4">{submissionError}</p>}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <input
            type="text"
            placeholder="Nombre de la mascota"
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Información de contacto"
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />
          <select
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={emergencyType}
            onChange={(e) => setEmergencyType(e.target.value)}
          >
            <option value="">Seleccione el tipo de emergencia</option>
            <option value="Consulta general">Consulta general</option>
            <option value="Vacunación">Vacunación</option>
            <option value="Cirugía">Cirugía</option>
            <option value="Emergencia">Emergencia</option>
          </select>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
          />
          <input
            type="time"
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
          />
          <textarea
            placeholder="Notas adicionales (opcional)"
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
            Agendar Cita
          </button>
        </form>
      </div>
    </section>
  );
}

export default Appointment;
