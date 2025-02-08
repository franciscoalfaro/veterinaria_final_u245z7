import React from "react";
import { Link } from "react-router-dom";
import AboutUs from "./AboutUs";
import OurServices from "./OurServices";
import ListComment from "../components/ListComment";

function Home() {
  return (
    <div>
      <div className="relative h-[500px] w-full overflow-hidden">
        <img src="/imagenes/veterinaria.webp"
          alt="Veterinaria Banner" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-sky-500/40 flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Clínica Veterinaria</h1>
            <p className="text-xl md:text-2xl text-white/90">Cuidado profesional para tu mejor amigo</p>
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
      <section className="py-12 bg-withe-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-600">¿Necesitas nuestros servicios?</h2>
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

   

      <ListComment></ListComment>
   

    </div>
  );
}

export default Home;
