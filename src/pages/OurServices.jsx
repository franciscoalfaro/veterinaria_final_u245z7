import React, { useEffect, useState } from "react";
import supabase from '../supabaseClient';

function OurServices() {
  const [services, setServices] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchOurServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('name', { ascending: false });

      if (error) {
        console.error("Error fetching ourServices:", error);
        setFetchError('Could not fetch ourServices.');
        setServices(null);
      }
      if (data) {
        setServices(data);
        setFetchError(null);
      }
    };

    fetchOurServices();
  }, []);


  return (
    <section className="py-12 bg-white-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Nuestros Servicios</h2>
        {fetchError && (<p className="text-center text-red-500 mb-4">{fetchError}</p>)}

        {services && services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg shadow-blue-500/50 p-6 hover:shadow-2xl hover:shadow-blue-500/70 transition-shadow duration-300 border border-gray-200"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-blue-600">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-700">${service.price}</span>
                  {/* 
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Consultar
                  </button>*/}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Sin servicios disponibles</p>
        )}
      </div>
    </section>



  );
}

export default OurServices;
