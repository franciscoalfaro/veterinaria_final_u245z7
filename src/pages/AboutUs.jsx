import React from "react";

function AboutUs() {
  const images = [
    {
      src: "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Veterinario examinando a un perro",
    },
    {
      src: "https://images.pexels.com/photos/6235116/pexels-photo-6235116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Gato en una clínica veterinaria",
    },
    {
      src: "https://images.pexels.com/photos/5490255/pexels-photo-5490255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Perro feliz en una clínica veterinaria",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Sobre Nosotros</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="mb-4 text-gray-600">
            Somos una clínica veterinaria comprometida con el bienestar de tus mascotas. Nuestro equipo de profesionales
            altamente calificados está dedicado a proporcionar el mejor cuidado y atención a todos los animales.
          </p>
          <p className="text-gray-600">
            Con años de experiencia y tecnología de vanguardia, ofrecemos una amplia gama de servicios, desde chequeos
            de rutina hasta procedimientos especializados, siempre con el objetivo de mantener a tus compañeros peludos
            felices y saludables.
          </p>
        </div>

        {/* Image Gallery */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div key={index} className="bg-white hover:shadow-2xl rounded-lg shadow-md overflow-hidden transition-shadow duration-300 p-4 border border-gray-200">
              <img src={image.src} alt={image.alt} className="w-full h-48 object-cover" />
              <div className="p-4">
                <p className="text-gray-600 text-center">
                  {/* You can add a caption here if needed */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
