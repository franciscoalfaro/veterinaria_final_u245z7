import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);

    const result = await login(username, password);
    if (result.success) {
      navigate('/admin', { replace: true });
    } else {
      setLoginError(result.error);
    }
  };

  return (
    <section className="bg-gray-100 py-16 flex justify-center items-center min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="p-10 flex-1">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Acceso Administrador</div>
              <h2 className="block mt-2 text-3xl leading-tight font-bold text-gray-800">Bienvenido de Nuevo</h2>
              <p className="mt-2 text-gray-600">Inicia sesión para acceder al panel de administración.</p>
              {loginError && <p className="text-center text-red-500 mt-3">{loginError}</p>}
              <form onSubmit={handleLogin} className="mt-6 space-y-5">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Usuario</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Ingresa tu usuario"
                    className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Contraseña</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
                  >
                    Iniciar Sesión
                  </button>
                  <Link to="/register" className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800 transition duration-300">
                    Registrarse
                  </Link>
                </div>
              </form>
            </div>
            <div className="md:w-64 flex-shrink-0">
              <img className="h-full w-full object-cover" src="https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Veterinarian Clinic" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
