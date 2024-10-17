import { useState } from "react";
import PropTypes from "prop-types";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import cafe from "../assets/Boissons/cafe.jpg";
import zombie from "../assets/Boissons/zombie.jpg";
import perlesdecoco from "../assets/Desserts/pdc.jpg";
import tiramisu from "../assets/Desserts/tiramisu.jpg";
import Milshake from "../assets/Desserts/Milshake.jpg";
import beignet_crevettes from "../assets/Thailandais/entrées/beignet_crevettes.jpeg";
import pad_thai_poulet from "../assets/Thailandais/plats/pad_thai_poulet.jpeg";
import Pad_thod_sam_rot from "../assets/Thailandais/poissons/Pad_thod_sam_rot.jpeg";
import yam_pet_yang from "../assets/Thailandais/salades et soupes/Yam_pet_yang.jpeg";
import soupe_miso from "../assets/Japonais/soupe_miso.jpeg";
import bo_bun_nem_porc from "../assets/Vietnamien/Plats/bo_bun_nem_porc.jpeg";
import pates_imperieux_nems from "../assets/Vietnamien/Entrees/Pates_imperiaux.jpeg";
import lap_kai from "../assets/Laotien/lap_kai.jpeg";
// Composant Card pour afficher une seule carte
const Card = ({ imageSrc, title, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{price}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

// Composant Menu qui affiche une grille de cartes avec une barre d'onglets
const PageMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("Laotien");

  const menuItems = [
    {
      category: "Laotien",
      imageSrc: lap_kai,
      title: "Lap Kaï",
      price: "12.99",
    },
    {
      category: "Vietnamien",
      subCategory: "Entrées Vietnamiennes",
      imageSrc: pates_imperieux_nems,
      title: "Pates impériaux Nems",
      price: "14.99",
    },
    {
      category: "Vietnamien",
      subCategory: "Plats Vietnamiennes",
      imageSrc: bo_bun_nem_porc,
      title: "Vietnamese Main Dish",
      price: "39.99",
    },
    {
      category: "Japonais",
      imageSrc: soupe_miso,
      title: "Soupe Miso",
      price: "19.99",
    },
    {
      category: "Thailandais",
      subCategory: "Entrées et accompagnements",
      imageSrc: beignet_crevettes,
      title: "Beignet Crevettes",
      price: "15.99",
    },
    {
      category: "Thailandais",
      subCategory: "Salades et soupes",
      imageSrc: yam_pet_yang,
      title: "Yam Pet Yang",
      price: "15.99",
    },
    {
      category: "Thailandais",
      subCategory: "Plats ",
      imageSrc: pad_thai_poulet,
      title: "Pad Thai Poulet",
      price: "16.99",
    },
    {
      category: "Thailandais",
      subCategory: "Poissons",
      imageSrc: Pad_thod_sam_rot,
      title: "Pad Thod Sam Rot",
      price: "22,99",
    },
    {
      category: "Desserts",
      subCategory: "Desserts Classiques",
      imageSrc: perlesdecoco,
      title: "Perles de coco",
      price: "6.99",
    },
    {
      category: "Desserts",
      subCategory: "Spécialités Glacées",
      imageSrc: tiramisu,
      title: "Tiramisu glacé",
      price: "4.99",
    },
    {
      category: "Desserts",
      subCategory: "Milshake",
      imageSrc: Milshake,
      title: "Milshake",
      price: "5.99",
    },
    {
      category: "Boissons",
      subCategory: "Boissons chaudes",
      imageSrc: cafe,
      title: "café",
      price: "5.99",
    },
    {
      category: "Boissons",
      subCategory: "Cocktails",
      imageSrc: zombie,
      title: "zombie",
      price: "5.99",
    },
  ];

  const categories = [
    "Laotien",
    "Vietnamien",
    "Japonais",
    "Thailandais",
    "Desserts",
    "Boissons",
  ];

  const filteredItems = menuItems.filter(
    (item) => item.category === selectedCategory
  );

  // Group items by subCategory
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.subCategory]) {
      acc[item.subCategory] = [];
    }
    acc[item.subCategory].push(item);
    return acc;
  }, {});

  return (
    <div className="p-8 bg-black">
      <Navbar />
      <div className="p-8 bg-black">
        {/* Barre d'onglets */}
        <div className="flex justify-start space-x-2 p-4 bg-gray-200 gap-20 px-8 rounded-full shadow-lg mb-12 bg-opacity-40 overflow-x-auto whitespace-nowrap ">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-5 rounded-full shadow-lg ${
                selectedCategory === category
                  ? "bg-green-500 text-white uppercase"
                  : "bg-whitespecial text-gray-800 uppercase"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grille de cartes */}
        <div className="p-4 space-y-8">
          {Object.keys(groupedItems).map((subCategory) => (
            <div key={subCategory}>
              {subCategory && subCategory !== "undefined" && (
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                  {subCategory}
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groupedItems[subCategory].map((item, index) => (
                  <Card
                    key={index}
                    imageSrc={item.imageSrc}
                    title={item.title}
                    price={item.price}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default PageMenu;
