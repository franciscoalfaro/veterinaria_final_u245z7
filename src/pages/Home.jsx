import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AboutUs from "./AboutUs";
import OurServices from "./OurServices";
import ListComment from "../components/ListComment";
import supabase from "../supabaseClient";

function Home() {
  const [banners, setBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  console.log(banners)

  useEffect(() => {
    fetchImageBanner();
  }, []);

  // Si existen varios banners, se cambia la imagen automáticamente cada 5 segundos.
  useEffect(() => {
    if (banners.length > 1) {
      const timer = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [banners]);

  // Obtiene los banners desde Supabase
  const fetchImageBanner = async () => {
    const { data, error } = await supabase.from("banner").select("*");
    if (error) {
      console.error("Error fetching banner:", error);
    } else {
      setBanners(data);
    }
  };

  return (
    <div>
      {/* Sección Hero: muestra la imagen del banner */}
      <div className="relative h-[500px] w-full overflow-hidden">
        {banners.length > 0 ? (
          
          <img src={banners[currentBanner].url} alt={banners[currentBanner].name_banner || "Banner"}
            className="object-cover w-full h-full transition-all duration-500"
          />
        ) : (
          <img src="/imagenes/veterinaria.webp" alt="Veterinaria Banner" className="object-cover w-full h-full" />
        )}
        <div className="absolute inset-0 bg-sky-500/40 flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Clínica Veterinaria
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Cuidado profesional para tu mejor amigo
            </p>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="mt-8">
        <AboutUs />
      </div>

      {/* Our Services Section */}
      <div className="mt-8">
        <OurServices />
      </div>

      {/* Call to Action Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-600">
            ¿Necesitas nuestros servicios?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/appointment" className="w-full sm:w-auto">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                Agendar Cita
              </button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="bg-transparent hover:bg-blue-600 text-blue-600 font-semibold hover:text-white py-2 px-4 border border-blue-600 hover:border-transparent rounded w-full">
                Contáctanos
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Comentarios */}
      <ListComment />
    </div>
  );
}

export default Home;
