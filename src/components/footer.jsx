import { SocialIcon } from "react-social-icons";
const Footer = () => {
  return (
    <footer className="bg-black h-60 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mt-4 md:mb-0">
            <a href="#home" className="hover:underline">
              Accueil
            </a>
            <a href="#about" className="hover:underline">
              Avis
            </a>
            <a href="#services" className="hover:underline">
              Menu
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </div>
          <div className="flex space-x-6 align-baseline">
            <div>
              <SocialIcon url="www.facebook.com/ShashaThaiGrill/" />
            </div>
            <SocialIcon url="instagram.com" />
          </div>
        </div>
        <div className="text-center mt-20 mb-0">
          <p>&copy; 2024 ShashaThaiGrill All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
