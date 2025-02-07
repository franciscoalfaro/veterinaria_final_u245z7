import React, { useState } from 'react';
import supabase from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [registrationError, setRegistrationError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegistrationError(null);

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
        navigate('/login');
      }
    } catch (error) {
      setRegistrationError('Error al registrar usuario.');
      console.error('Registration error:', error);
    }
  };

  return (
    <section className="bg-gray-100 py-16 flex justify-center items-center min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:max-w-4xl">
          <div className="md:flex">
            <div className="p-12 flex-1">
              <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">Crear Nueva Cuenta</div>
              <h2 className="block mt-2 text-3xl leading-tight font-bold text-gray-900">Únete a Nuestra Comunidad</h2>
              <p className="mt-3 text-gray-700">Regístrate y comienza a cuidar de tu mascota con nosotros.</p>
              {registrationError && <p className="text-center text-red-500 mt-3">{registrationError}</p>}
              <form onSubmit={handleRegister} className="mt-8 space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Usuario</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Elige un usuario único"
                    className="shadow-md appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Contraseña</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Crea una contraseña segura"
                    className="shadow-md appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Rol</label>
                  <select
                    id="role"
                    className="shadow-md appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">Usuario Regular</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
                  >
                    Registrarse
                  </button>
                  <Link to="/login" className="inline-block align-baseline font-semibold text-sm text-indigo-600 hover:text-indigo-800 transition duration-300">
                    ¿Ya eres miembro? Inicia Sesión
                  </Link>
                </div>
              </form>
            </div>
            <div className="md:w-96 flex-shrink-0">
              <img className="h-full w-full object-cover" src="https://images.pexels.com/photos/716398/pexels-photo-716398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Register Pet" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
