import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./pages/AdminDashboard";
import supabase from "./supabaseClient";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ServiceCreator from "./components/ServiceCreator";
import Information from "./pages/Information";
import Footer from "./components/Footer";
import CommentSection from "./components/CommentSection";
import Error from "./pages/Error";
import ChangeImage from "./components/ChangeImage";
import MedicalHistory from "./components/medicalHistory";
import MedicalHistorySearch from "./pages/MedicalHistorySearch";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, userRole, logout } = useContext(AuthContext);
  const [contactInfo, setContactInfo] = useState(null);
  const [businessHours, setBusinessHours] = useState([]);
  const [socialNetworks, setSocialNetworks] = useState([]);
  const whatsappLink = socialNetworks?.find(social => social.name_social === "whatsapp")?.url;

  const handleRedirect = () => {
    if (whatsappAccount) {
      const phoneNumber = whatsappAccount.url.replace("https://wa.me/", ""); // Extrae el número
      const message = encodeURIComponent("Hola, quiero más información sobre sus servicios."); // Personaliza tu mensaje
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
  
      window.open(whatsappLink, "_blank");
    } else {
      alert("No hay un enlace de WhatsApp disponible.");
    }
  };

  useEffect(() => {
    fetchFooterData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const fetchFooterData = async () => {
    const { data: infoData } = await supabase.from("information").select("*").single();
    setContactInfo(infoData);

    const { data: hoursData } = await supabase.from("business_hours").select("*");
    setBusinessHours(hoursData);

    const { data: socialData } = await supabase.from("social_network").select("*");
    setSocialNetworks(socialData);
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* NAVBAR */}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Menú para escritorio */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:underline">
            Inicio
          </Link>
          {/* Vistas públicas para usuarios no autenticados o que no sean admin */}
          {(!isLoggedIn || (isLoggedIn && userRole !== "admin" && userRole !== "veterinario")) && (
            <>
              <Link to="/contact" className="hover:underline">
                Contacto
              </Link>
              <Link to="/appointment" className="hover:underline">
                Agendar Cita
              </Link>
              <Link to="/about" className="hover:underline">
                Sobre Nosotros
              </Link>
            </>
          )}
          {/* Vistas para admin */}
          {isLoggedIn && userRole === "admin" && (
            <>
              <Link to="/banner" className="hover:underline">
                Banner
              </Link>
              <Link to="/services" className="hover:underline">
                Servicios
              </Link>
              <Link to="/information" className="hover:underline">
                Información
              </Link>
              <button onClick={handleLogout} className="hover:underline">
                Cerrar Sesión
              </button>
            </>
          )}
          {/* Vistas para usuario común */}
          {isLoggedIn && userRole === "user" && (
            <>
              <Link to="/comment" className="hover:underline">
                Comentar
              </Link>
              <button onClick={handleLogout} className="hover:underline">
                Cerrar Sesión
              </button>
            </>
          )}
          {/* Vistas para veterinario */}
          {isLoggedIn && userRole === "veterinario" && (
            <>
              <Link to="/admin" className="hover:underline">
                Panel
              </Link>
              <Link to="/medical-history" className="hover:underline">
                Registro Médico
              </Link>
              <Link to="/search" className="hover:underline">
                Buscar
              </Link>
              <button onClick={handleLogout} className="hover:underline">
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Sidebar para móviles */}
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
          <li>
            <Link to="/" onClick={toggleSidebar}>
              Inicio
            </Link>
          </li>
          {(!isLoggedIn || (isLoggedIn && userRole !== "admin" && userRole !== "veterinario")) && (
            <>
              <li>
                <Link to="/contact" onClick={toggleSidebar}>
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/appointment" onClick={toggleSidebar}>
                  Agendar Cita
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={toggleSidebar}>
                  Sobre Nosotros
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && userRole === "admin" && (
            <>
              <li>
                <Link to="/banner" onClick={toggleSidebar}>
                  Banner
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={toggleSidebar}>
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/information" onClick={toggleSidebar}>
                  Información
                </Link>
              </li>
              <li>
                <button onClick={() => { handleLogout(); toggleSidebar(); }}>
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
          {isLoggedIn && userRole === "user" && (
            <>
              <li>
                <Link to="/comment" onClick={toggleSidebar}>
                  Comentar
                </Link>
              </li>
              <li>
                <button onClick={() => { handleLogout(); toggleSidebar(); }}>
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
          {isLoggedIn && userRole === "veterinario" && (
            <>
              <li>
                <Link to="/admin" onClick={toggleSidebar}>
                  Panel
                </Link>
              </li>
              <li>
                <Link to="/medical-history" onClick={toggleSidebar}>
                  Registro Médico
                </Link>
              </li>
              <li>
                <Link to="/search" onClick={toggleSidebar}>
                  Buscar
                </Link>
              </li>
              <li>
                <button onClick={() => { handleLogout(); toggleSidebar(); }}>
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li>
                <Link to="/login" onClick={toggleSidebar}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={toggleSidebar}>
                  Registro
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* RUTAS */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Vistas para usuarios comunes */}
          <Route path="/comment" element={isLoggedIn && userRole === "user" ? <CommentSection /> : <Login />} />
          {/* Vistas para admin */}
          <Route path="/banner" element={isLoggedIn && userRole === "admin" ? <ChangeImage /> : <Login />} />
          <Route path="/services" element={isLoggedIn && userRole === "admin" ? <ServiceCreator /> : <Login />} />
          <Route path="/information" element={isLoggedIn && userRole === "admin" ? <Information /> : <Login />} />
          {/* Vistas para veterinario */}
          <Route path="/medical-history" element={isLoggedIn && userRole === "veterinario" ? <MedicalHistory /> : <Login />} />
          <Route path="/search" element={isLoggedIn && userRole === "veterinario" ? <MedicalHistorySearch /> : <Login />} />
          <Route path="/admin" element={isLoggedIn && userRole === "veterinario" ? <AdminDashboard /> : <Login />} />
          {/* Ruta de error */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>

      {/* FOOTER */}
      <Footer
        contactInfo={contactInfo}
        businessHours={businessHours}
        socialNetworks={socialNetworks}
      />


      {whatsappLink && (
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#25D366] text-white p-3 rounded-full shadow-xl hover:bg-[#128C7E] hover:scale-110 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      )}



    </div>
  );
}

const RootApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default RootApp;
