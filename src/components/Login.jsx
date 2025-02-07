import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
      navigate('/admin', { replace: true }); // Redirect to admin dashboard after login success in context
    } else {
      setLoginError(result.error);
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Login</h2>
        {loginError && <p className="text-center text-red-500 mb-4">{loginError}</p>}
        <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <input
            type="text"
            placeholder="Usuario"
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
