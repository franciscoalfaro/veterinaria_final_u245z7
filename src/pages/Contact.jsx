import React from "react";

function Contact() {
  return (
    <section className="bg-gray-50 py-24 flex justify-center items-center min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-4xl">
          <div className="md:flex">
            <div className="md:w-1/2 flex-shrink-0">
              <img
                className="h-full w-full object-cover"
                src="https://images.pexels.com/photos/3771667/pexels-photo-3771667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Contact Us at Veterinaria"
              />
            </div>
            <div className="p-8 flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Listo para Conectarte?</h2>
              <p className="mt-2 text-base md:text-lg text-gray-700 mb-8">
                Nuestro equipo está listo para responder a tus preguntas y ayudarte en lo que necesites. ¡Escríbenos!
              </p>
              <form className="mt-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Tu nombre y apellido"
                    className="shadow-md appearance-none border rounded w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Tu dirección de correo electrónico"
                    className="shadow-md appearance-none border rounded w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    placeholder="¿Cómo podemos ayudarte?"
                    rows="4"
                    className="shadow-md appearance-none border rounded w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex justify-start">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
                  >
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
