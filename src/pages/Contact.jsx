import React from "react";

function Contact() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-full w-full object-cover md:w-48" src="https://images.pexels.com/photos/3771667/pexels-photo-3771667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Contact Us" />
            </div>
            <div className="p-8">
              <h2 className="block mt-1 text-3xl leading-tight font-bold text-gray-800">Contáctanos</h2>
              <p className="mt-2 text-gray-600">¿Tienes alguna pregunta o necesitas más información? Contáctanos completando el siguiente formulario y te responderemos lo antes posible.</p>
              <form className="mt-6 space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Tu nombre"
                    className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Tu correo electrónico"
                    className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Mensaje</label>
                  <textarea
                    id="message"
                    placeholder="Escribe tu mensaje aquí"
                    rows="4"
                    className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
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
