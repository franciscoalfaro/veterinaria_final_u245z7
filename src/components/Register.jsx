import React, { useState } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [registrationError, setRegistrationError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegistrationError(null);

    // Hash the password using SHA-256
    const hashedPassword = CryptoJS.SHA256(password).toString();

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([
          { username: username, password: hashedPassword, role: role }
        ]);

      if (error) {
        setRegistrationError('Error al registrar usuario.');
        console.error('Registration error:', error);
      } else {
        console.log('Registration successful:', data);
        alert('Registro exitoso!');
        navigate('/login'); // Redirect to login page after registration
      }
    } catch (error) {
      setRegistrationError('Error al registrar usuario.');
      console.error('Registration error:', error);
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Registro de Usuario</h2>
        {registrationError && <p className="text-center text-red-500 mb-4">{registrationError}</p>}
        <form onSubmit={handleRegister} className="max-w-md mx-auto space-y-4 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <input
            type="text"
            placeholder="Usuario"
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/*
            <select
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Usuario Regular</option>
            <option value="admin">Administrador</option>
          </select>
          
          */}

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
            Registrarse
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
