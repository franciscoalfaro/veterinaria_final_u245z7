import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./pages/AdminDashboard";
import supabase from './supabaseClient';
import { AuthProvider, AuthContext } from './context/AuthContext'; // Import AuthProvider and AuthContext
import ServiceCreator from "./components/ServiceCreator";


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, userRole, logout } = useContext(AuthContext); // Use AuthContext

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout(); // Call logout function from AuthContext
  };


  return (
    <div className="relative flex flex-col min-h-screen">
      <nav className="bg-sky-500 text-white p-4 md:flex md:justify-between">
        <div className="flex items-center justify-between md:block">
          <span className="text-xl font-bold">Veterinaria</span>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:underline">Inicio</Link>
          {!isLoggedIn || userRole !== 'admin' ? (
            <>
              <Link to="/contact" className="hover:underline">Contacto</Link>
              <Link to="/appointment" className="hover:underline">Agendar Cita</Link>
              <Link to="/about" className="hover:underline">Sobre Nosotros</Link>
            </>
          ) : null}


          {isLoggedIn && userRole === 'admin' && (
            <>
              <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
              <Link to="/services" className="hover:underline">Services</Link>
              <button onClick={handleLogout} className="hover:underline">Cerrar Sesión</button>
            </>
          )}
        </div>

      </nav>

      {/* Sidebar */}
      <div
        className={`sidebar fixed top-0 left-0 h-full bg-sky-500 text-white p-4 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden z-30`}
      >
        <button onClick={toggleSidebar} className="absolute top-4 right-4 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <ul className="mt-8 space-y-4">
          <li><Link to="/" onClick={toggleSidebar}>Inicio</Link></li>
          {!isLoggedIn || userRole !== 'admin' ? (
            <>
              <li><Link to="/contact" onClick={toggleSidebar}>Contacto</Link></li>
              <li><Link to="/appointment" onClick={toggleSidebar}>Agendar Cita</Link></li>
            </>
          ) : null}
          <li><Link to="/about" onClick={toggleSidebar}>Sobre Nosotros</Link></li>

          {isLoggedIn && userRole === 'admin' && (
            <>
              <li><Link to="/admin" onClick={toggleSidebar}>Admin Dashboard</Link></li>
              <li><Link to="/services" onClick={toggleSidebar}>Services</Link></li>
              <li><button onClick={() => { handleLogout(); toggleSidebar(); }}>Cerrar Sesión</button></li>
            </>
          )}

          {!isLoggedIn && (
            <>
              <li><Link to="/login" onClick={toggleSidebar}>Login</Link></li>
              <li><Link to="/register" onClick={toggleSidebar}>Register</Link></li>
            </>
          )}
        </ul>

      </div>

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={isLoggedIn && userRole === 'admin' ? <ServiceCreator /> : <Login />} />
          <Route path="/admin" element={isLoggedIn && userRole === 'admin' ? <AdminDashboard /> : <Login />} /> {/* Protect AdminDashboard route */}
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-sky-500 text-white p-8 mt-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Veterinaria</h4>
            <p className="text-sm text-gray-300">
              Calle Principal #123<br />
              Ciudad, País
            </p>
            <p className="text-sm text-gray-300 mt-2">
              Email: info@veterinaria.com<br />
              Teléfono: +123-456-7890
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-100">Inicio</Link></li>
              <li><Link to="/about" className="hover:text-gray-100">Sobre Nosotros</Link></li>
              <li><Link to="/services" className="hover:text-gray-100">Servicios</Link></li>
              <li><Link to="/appointment" className="hover:text-gray-100">Agendar Cita</Link></li>
              <li><Link to="/contact" className="hover:text-gray-100">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Horario de Atención</h4>
            <p className="text-sm text-gray-300">
              Lunes - Viernes: 9:00 AM - 7:00 PM<br />
              Sábados: 10:00 AM - 4:00 PM<br />
              Domingos: Cerrado
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <i className="fab fa-facebook-f fa-lg"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-8 border-t border-gray-600 pt-4 flex justify-between items-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} Veterinaria. Todos los derechos reservados.
          </p>
          <div className="text-sm text-gray-300 space-x-4">
            <Link to="/privacy-policy" className="hover:text-gray-100">Política de Privacidad</Link>
            <Link to="/terms-of-service" className="hover:text-gray-100">Términos de Servicio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const RootApp = () => ( // Wrap App with AuthProvider
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default RootApp;

