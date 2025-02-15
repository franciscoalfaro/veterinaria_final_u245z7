import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import supabase from "../supabaseClient";

const MedicalHistory = () => {
  const location = useLocation();
  // Si se recibe un registro, lo usamos para precargar la información en el formulario.
  const recordToEdit = location.state?.record || null;

  // Estados para cada campo de la ficha médica
  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerContact, setOwnerContact] = useState("");
  const [address, setAddress] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [veterinarian, setVeterinarian] = useState("");
  const [notes, setNotes] = useState("");
  const [nextAppointment, setNextAppointment] = useState("");

  // Estados para feedback
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  // Al cargar el componente, si se recibió un registro, precargar los datos
  useEffect(() => {
    if (recordToEdit) {
      setPetName(recordToEdit.pet_name);
      setSpecies(recordToEdit.species);
      setBreed(recordToEdit.breed || "");
      setAge(recordToEdit.age || "");
      setWeight(recordToEdit.weight || "");
      setOwnerName(recordToEdit.owner_name);
      setOwnerContact(recordToEdit.owner_contact || "");
      setAddress(recordToEdit.address);
      setDiagnosis(recordToEdit.diagnosis);
      setTreatment(recordToEdit.treatment || "");
      setVisitDate(recordToEdit.visit_date);
      setVeterinarian(recordToEdit.veterinarian || "");
      setNotes(recordToEdit.notes || "");
      setNextAppointment(recordToEdit.next_appointment || "");
    }
  }, [recordToEdit]);

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError(null);
    setSubmissionSuccess(null);

    // Validación básica (campos obligatorios)
    if (!petName || !species || !ownerName || !address || !diagnosis || !visitDate) {
      setSubmissionError("Por favor, rellena los campos obligatorios.");
      return;
    }

    const newRecord = {
      pet_name: petName,
      species,
      breed: breed || null,
      age: age ? parseInt(age) : null,
      weight: weight ? parseFloat(weight) : null,
      owner_name: ownerName,
      owner_contact: ownerContact || null,
      address,
      diagnosis,
      treatment: treatment || null,
      visit_date: visitDate,
      veterinarian: veterinarian || null,
      notes: notes || null,
      next_appointment: nextAppointment || null,
    };

    // En lugar de actualizar el registro, insertamos uno nuevo
    const { error } = await supabase
      .from("medicalhistory")
      .insert([newRecord]);

    if (error) {
      setSubmissionError("Error al guardar la ficha médica: " + (error.message || "Inténtalo nuevamente."));
    } else {
      setSubmissionSuccess("Ficha médica guardada correctamente!");
      // Limpiar campos del formulario
      setPetName("");
      setSpecies("");
      setBreed("");
      setAge("");
      setWeight("");
      setOwnerName("");
      setOwnerContact("");
      setAddress("");
      setDiagnosis("");
      setTreatment("");
      setVisitDate("");
      setVeterinarian("");
      setNotes("");
      setNextAppointment("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-center">Ficha Médica</h2>
      {submissionError && <p className="text-red-500 mb-4">{submissionError}</p>}
      {submissionSuccess && <p className="text-green-500 mb-4">{submissionSuccess}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre de la Mascota */}
        <div>
          <label className="block mb-1 font-semibold">Nombre de la Mascota *</label>
          <input
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre de la mascota"
            required
          />
        </div>
        {/* Especie */}
        <div>
          <label className="block mb-1 font-semibold">Especie *</label>
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Perro, Gato, etc."
            required
          />
        </div>
        {/* Raza */}
        <div>
          <label className="block mb-1 font-semibold">Raza</label>
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Raza (opcional)"
          />
        </div>
        {/* Edad */}
        <div>
          <label className="block mb-1 font-semibold">Edad</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Edad en años"
            min="0"
          />
        </div>
        {/* Peso */}
        <div>
          <label className="block mb-1 font-semibold">Peso (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Peso en kg"
            step="0.1"
            min="0"
          />
        </div>
        {/* Nombre del Responsable */}
        <div>
          <label className="block mb-1 font-semibold">Nombre del Responsable *</label>
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre del dueño o responsable"
            required
          />
        </div>
        {/* Contacto del Responsable */}
        <div>
          <label className="block mb-1 font-semibold">Contacto del Responsable</label>
          <input
            type="text"
            value={ownerContact}
            onChange={(e) => setOwnerContact(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Teléfono o email (opcional)"
          />
        </div>
        {/* Dirección */}
        <div>
          <label className="block mb-1 font-semibold">Dirección *</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Dirección del domicilio"
            required
          />
        </div>
        {/* Diagnóstico */}
        <div>
          <label className="block mb-1 font-semibold">Diagnóstico *</label>
          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Diagnóstico médico"
            required
          />
        </div>
        {/* Tratamiento */}
        <div>
          <label className="block mb-1 font-semibold">Tratamiento Realizado</label>
          <textarea
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descripción del tratamiento (opcional)"
          />
        </div>
        {/* Fecha de la Visita */}
        <div>
          <label className="block mb-1 font-semibold">Fecha de la Visita *</label>
          <input
            type="date"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Veterinario */}
        <div>
          <label className="block mb-1 font-semibold">Veterinario</label>
          <input
            type="text"
            value={veterinarian}
            onChange={(e) => setVeterinarian(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre del veterinario (opcional)"
          />
        </div>
        {/* Observaciones / Notas */}
        <div>
          <label className="block mb-1 font-semibold">Observaciones / Notas</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Notas adicionales (opcional)"
          />
        </div>
        {/* Próxima Cita */}
        <div>
          <label className="block mb-1 font-semibold">Próxima Cita</label>
          <input
            type="date"
            value={nextAppointment}
            onChange={(e) => setNextAppointment(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition"
        >
          {recordToEdit ? "Guardar Nueva Versión" : "Guardar Ficha Médica"}
        </button>
      </form>
    </div>
  );
};

export default MedicalHistory;
