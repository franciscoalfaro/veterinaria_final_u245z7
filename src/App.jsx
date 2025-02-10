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
import Information from "./pages/Information";
import Footer from "./components/Footer";
import CommentSection from "./components/CommentSection";
import  Error  from "./pages/Error";
import ChangeImage from "./components/ChangeImage";


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, userRole, logout } = useContext(AuthContext); // Use AuthContext
  const [contactInfo, setContactInfo] = useState(null);
  const [businessHours, setBusinessHours] = useState([]);
  const [socialNetworks, setSocialNetworks] = useState([]);

  useEffect(() => {
    fetchFooterData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout(); // Call logout function from AuthContext
  };


  const fetchFooterData = async () => {
    const { data: infoData } = await supabase.from('information').select('*').single();
    setContactInfo(infoData);

    const { data: hoursData } = await supabase.from('business_hours').select('*');
    setBusinessHours(hoursData);

    const { data: socialData } = await supabase.from('social_network').select('*');
    setSocialNetworks(socialData);
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
              <Link to="/admin" className="hover:underline">Panel</Link>
              <Link to="/banner" className="hover:underline">Banner</Link>
              <Link to="/services" className="hover:underline">Servicios</Link>
              <Link to="/information" className="hover:underline" >Informacion</Link>
              <button onClick={handleLogout} className="hover:underline">Cerrar Sesión</button>
            </>
          )}

          {isLoggedIn && userRole === 'user' && (
            <>
              <Link to="/comment" className="hover:underline" onClick={toggleSidebar}>Comentar</Link>
              <button className="hover:underline" onClick={() => { handleLogout(); toggleSidebar(); }}>Cerrar Sesión</button>
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
              <li><Link to="/admin" onClick={toggleSidebar}>Panel</Link></li>
              <li><Link to="/banner" onClick={toggleSidebar}>Banner</Link></li>
              <li><Link to="/services" onClick={toggleSidebar}>Servicios</Link></li>
              <li><Link to="/information" onClick={toggleSidebar}>Informacion</Link></li>
              <li><button onClick={() => { handleLogout(); toggleSidebar(); }}>Cerrar Sesión</button></li>
            </>
          )}

          {isLoggedIn && userRole === 'user' && (
            <>
              <li><Link to="/comment" onClick={toggleSidebar}>Comentar</Link></li>
              <li><button onClick={() => { handleLogout(); toggleSidebar(); }}>Cerrar Sesión</button></li>
            </>
          )}

          {!isLoggedIn && (
            <>
              <li><Link to="/login" onClick={toggleSidebar}>Login</Link></li>
              <li><Link to="/register" onClick={toggleSidebar}>Registro</Link></li>
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
          <Route path="/comment" element={isLoggedIn && userRole === 'user' ? <CommentSection /> : <Login />} />
          
          <Route path="/banner" element={isLoggedIn && userRole === 'admin' ? <ChangeImage /> : <Login />} />
          <Route path="/information" element={isLoggedIn && userRole === 'admin' ? <Information /> : <Login />} />
          <Route path="/services" element={isLoggedIn && userRole === 'admin' ? <ServiceCreator /> : <Login />} />
          <Route path="/admin" element={isLoggedIn && userRole === 'admin' ? <AdminDashboard /> : <Login />} /> {/* Protect AdminDashboard route */}

          {/* agregar una ruta de error */}
          <Route path='*' element={<Error></Error>}></Route>

        </Routes>
      </div>

      {/* Footer */}
      <Footer contactInfo={contactInfo} businessHours={businessHours} socialNetworks={socialNetworks} />
    </div>
  );
}

const RootApp = () => ( // Wrap App with AuthProvider
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default RootApp;

