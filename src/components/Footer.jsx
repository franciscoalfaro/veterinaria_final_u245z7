import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ contactInfo, businessHours, socialNetworks }) => {
    return (
        <footer className="bg-sky-500 text-white p-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h4 className="text-lg font-semibold mb-4">Veterinaria</h4>
                    {contactInfo && (
                        <>
                            <p className="text-sm text-gray-300">
                                {contactInfo.direccion}<br />
                                {contactInfo.ciudad}
                            </p>
                            <p className="text-sm text-gray-300 mt-2">
                                Email: {contactInfo.email}<br />
                                Teléfono: {contactInfo.phone}
                            </p>
                        </>
                    )}
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Navegación</h4>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-gray-100">Inicio</Link></li>
                        <li><Link to="/about" className="hover:text-gray-100">Sobre Nosotros</Link></li>
                        <li><Link to="/appointment" className="hover:text-gray-100">Agendar Cita</Link></li>
                        <li><Link to="/contact" className="hover:text-gray-100">Contacto</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Horario de Atención</h4>
                    <ul className="space-y-2">
                        {businessHours && businessHours.map(hour => (
                            <li key={hour.id} className="text-sm text-gray-300">
                                {hour.day_of_week}: {hour.opening_time} - {hour.closing_time}
                            </li>
                        ))}

                        {socialNetworks && socialNetworks.map(social => (
                            <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                                {social.name_social === 'facebook' && <i className="fab fa-facebook-f fa-lg"></i>}
                                {social.name_social === 'twitter' && <i className="fab fa-twitter fa-lg"></i>}
                                {social.name_social === 'instagram' && <i className="fab fa-instagram fa-lg"></i>}
                                {/* Add icons for other social networks if needed */}
                            </a>
                        ))}
                    </ul>

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
    );
};

export default Footer;

