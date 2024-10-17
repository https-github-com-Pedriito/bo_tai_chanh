import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { fetchProducts } from "../api";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [activeSection, setActiveSection] = useState("categories");
  const [categoryInput, setCategoryInput] = useState("");
  const [subCategoryInput, setSubCategoryInput] = useState("");
  const [productInput, setProductInput] = useState({
    name: "",
    price: "",
    category: "",
    subCategory: "",
    image: "",
    description: "",
    options: "",
  });
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [productIdToEdit, setProductIdToEdit] = useState(null);

  // Différentes fonctions pour les appels d'API
  // Fonction  catégorie

  // categories
  const addCategory = async () => {
    if (!categoryInput) return;
    console.log("Data :", JSON.stringify({ Name: categoryInput }));
    try {
      const response = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Name: categoryInput }),
      });
      if (!response.ok)
        throw new Error("Erreur lors de l'ajout de la catégorie");

      const newCategory = await response.json();
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      setCategoryInput("");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const updateCategory = async (id, categoryInput) => {
    try {
      const body = JSON.stringify({ Name: categoryInput });
      const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: "PUT",
        body: body,
        headers: { "Content-Type": "application/json" },
      });
      console.log("Body:", body);
      if (!response.ok)
        throw new Error("Erreur lors de la modification de la catégorie");
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error("Erreur lors de la suppression de la catégorie");
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  // Sous-catégories

  const deleteSubCategory = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/sub-categories/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok)
        throw new Error("Erreur lors de la suppression de la sous-catégorie");
      setSubCategories((prevSubCategories) =>
        prevSubCategories.filter((subCategory) => subCategory._id !== id)
      );
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const addSubCategory = async () => {
    console.log("Sub-category Input:", subCategoryInput);
    console.log("Selected Category:", selectedCategory);

    // Vérifiez que le champ d'entrée n'est pas vide et qu'une catégorie est sélectionnée
    if (!subCategoryInput || !selectedCategory) return; // Corrigé ici pour vérifier que selectedCategory n'est pas vide

    try {
      // Envoyer une requête POST à l'API
      const response = await fetch("http://localhost:3000/sub-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: subCategoryInput,
          categoryId: selectedCategory,
        }),
      });

      // Vérifiez si la réponse est correcte
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la sous-catégorie");
      }

      console.log("Response:", response);

      // Analysez la réponse JSON pour obtenir la nouvelle sous-catégorie
      const newSubCategory = await response.json();

      // Mettez à jour l'état avec la nouvelle sous-catégorie
      setSubCategories((prevSubCategories) => [
        ...prevSubCategories,
        newSubCategory,
      ]);

      // Réinitialisez les champs d'entrée
      setSubCategoryInput("");
      setSelectedCategory("");
    } catch (error) {
      // Gérer les erreurs et mettre à jour l'état d'erreur
      console.error(error);
      setError(error.message);
    }
  };

  const updateSubCategory = async (subCategoryId, updatedSubCategory) => {
    try {
      const body = JSON.stringify({
        name: updatedSubCategory.name,
        id: subCategoryId, // Nom de la sous-catégorie
        categoryId: updatedSubCategory.categoryId, // ID de la catégorie associée
      });
      console.log("Body:", body);
      const response = await fetch(
        `http://localhost:3000/sub-categories/${subCategoryId}`,
        {
          method: "PATCH", // Vous pouvez utiliser PATCH si vous ne mettez à jour qu'une partie des champs
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la sous-catégorie");
      }

      const data = await response.json();
      console.log("Sous-catégorie mise à jour avec succès:", data);
      // Vous pouvez retourner les données mises à jour pour les traiter après l'appel
      return data;
    } catch (error) {
      console.error("Erreur dans updateSubCategory:", error.message);
    }
  };

  // Produits

  const addProduct = async () => {
    // Vérifiez que le nom et le prix du produit sont fournis
    if (!productInput.name || !productInput.price) return;
    try {
      const body = JSON.stringify({
        name: productInput.name,
        price: Number(productInput.price), // S'assurer que le prix est un nombre
        Description: productInput.description,
        subCategoryId: productInput.subCategory, // Utilisation de "subCategoryId"
        imageUrl: productInput.image, // Utilisation de "imageUrl"
        options: productInput.options,
      });
      console.log("Body:", body);
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      // Gérer la réponse en cas d'erreur
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Erreur du serveur:", errorResponse);
        console.error("Détails de l'erreur:", errorResponse.details);
        throw new Error("Erreur lors de l'ajout du produit");
      }

      const newProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]);

      setProductInput({
        name: "",
        price: "",
        category: "",
        subCategory: "",
        image: "",
        description: "",
        options: "",
      });
    } catch (error) {
      console.error("Erreur:", error);
      setError(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      console.log("id", id);
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error("Erreur lors de la suppression du produit");

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const updateProduct = async () => {
    try {
      const body = JSON.stringify({
        name: productInput.name,
        price: Number(productInput.price), // S'assurer que le prix est un nombre
        Description: productInput.description,
        subCategoryId: productInput.subCategory, // Utilisation de "subCategoryId"
        imageUrl: productInput.image, // Utilisation de "imageUrl"
        options: productInput.options,
      });
      await fetch(`http://localhost:3000/products/${productIdToEdit}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });
      // Recharger les produits ou mettre à jour l'état local
      setIsEditing(false);
      setProductIdToEdit(null);
      setProductInput({ name: '', price: '', description: '', subCategory: '', image: '', options: '' }); // Réinitialiser les champs
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit", error);
    }
  };
  
  

  // Fonction pour récupérer les données depuis l'API
  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erreur ${response.status}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(`Erreur lors de la récupération des données: ${error}`);
      setError(`Erreur lors de la récupération des données: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData("http://localhost:3000/categories", setCategories);
    fetchData("http://localhost:3000/sub-categories", setSubCategories);
    fetchData("http://localhost:3000/products", setProducts);
  }, []);

  const renderCategories = () => (
    <section className="categories">
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">Catégories</h2>
      <input
        type="text"
        value={categoryInput}
        onChange={(e) => setCategoryInput(e.target.value)}
        placeholder="Ajouter une catégorie"
        className="border border-green-500 bg-gray-600 p-2 rounded-full mb-4 w-full"
      />
      <button
        onClick={() => addCategory(categoryInput, selectedCategory)}
        className="bg-green-600 text-white p-2 rounded-full mb-4 w-full sm:w-auto hover:bg-green-500 transition duration-200"
      >
        Ajouter Catégorie
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md relative mb-4"
          >
            {category.isEditing ? (
              <>
                <input
                  type="text"
                  value={categoryInput} // Utilisez categoryInput pour l'édition
                  onChange={(e) => setCategoryInput(e.target.value)}
                  className="border border-gray-400 bg-gray-700 p-2 rounded mb-2 w-full"
                />
                <button
                  onClick={() => {
                    // Mettez à jour la catégorie localement avant de faire la requête
                    const updatedCategory = {
                      ...category,
                      Name: categoryInput, // Mettez à jour le nom avec la valeur de categoryInput
                    };
                    updateCategory(category.id, categoryInput).then(() => {
                      setCategories((prevCategories) =>
                        prevCategories.map((cat) =>
                          cat.id === category.id ? updatedCategory : cat
                        )
                      );
                      fetchData(
                        "http://localhost:3000/categories",
                        setCategories
                      );
                      setCategoryInput(""); // Réinitialise le champ de saisie
                    });
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400 transition duration-200"
                >
                  Sauvegarder
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold">{category.Name}</h3>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => {
                      setCategoryInput(category.Name); // Met à jour le champ de saisie avec le nom de la catégorie à éditer
                      // Marque la catégorie comme étant en mode édition
                      setCategories((prevCategories) =>
                        prevCategories.map((cat) =>
                          cat.id === category.id
                            ? { ...cat, isEditing: true }
                            : { ...cat, isEditing: false }
                        )
                      );
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 transition duration-200"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition duration-200"
                  >
                    Supprimer
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  // État pour la catégorie sélectionnée

  // Dans votre fonction renderSubCategories
  const renderSubCategories = () => (
    <section className="subCategories p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
        Sous-Catégories
      </h2>

      <input
        type="text"
        value={subCategoryInput}
        onChange={(e) => setSubCategoryInput(e.target.value)}
        placeholder="Ajouter une sous-catégorie"
        className="border border-green-500 bg-gray-700 text-white p-3 rounded-full mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border border-green-500 bg-gray-700 text-white p-3 rounded-full mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
      >
        <option value="">Sélectionnez une catégorie</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.Name}
          </option>
        ))}
      </select>

      <button
        onClick={addSubCategory}
        className="bg-green-600 text-white p-3 rounded-full mb-4 w-full sm:w-auto hover:bg-green-500 transition duration-200"
      >
        Ajouter Sous-Catégorie
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {subCategories.map((subCategory) => {
          const associatedCategory = categories.find(
            (category) => category.id === subCategory.categoryId
          );

          return (
            <div
              key={subCategory.id}
              className="bg-gray-700 rounded-lg p-4 flex flex-col items-start shadow-lg transition transform hover:scale-105"
            >
              {subCategory.isEditing ? (
                <>
                  <input
                    type="text"
                    value={subCategoryInput}
                    onChange={(e) => setSubCategoryInput(e.target.value)}
                    className="border border-gray-400 bg-gray-600 text-white p-2 rounded mb-2 w-full"
                  />
                  <select
                    value={subCategory.categoryId || ""}
                    onChange={(e) => {
                      const newCategoryId = e.target.value;
                      // Met à jour le categoryId de la sous-catégorie
                      setSubCategories((prevSubCategories) =>
                        prevSubCategories.map((subCat) =>
                          subCat.id === subCategory.id
                            ? { ...subCat, categoryId: newCategoryId }
                            : subCat
                        )
                      );
                    }}
                    className="border border-gray-400 bg-gray-600 text-white p-2 rounded mb-2 w-full"
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.Name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      if (!subCategory.categoryId) {
                        alert("Veuillez sélectionner une catégorie.");
                        return;
                      }

                      const updatedSubCategory = {
                        ...subCategory,
                        name: subCategoryInput, // Met à jour le nom de la sous-catégorie
                        categoryId: subCategory.categoryId, // Assurez-vous que l'ID de la catégorie est mis à jour
                      };
                      console.log("Updated Sub-Category:", updatedSubCategory);

                      updateSubCategory(
                        subCategory.id,
                        updatedSubCategory
                      ).then(() => {
                        fetchData(
                          "http://localhost:3000/sub-categories",
                          setSubCategories
                        );
                        setSubCategories((prevSubCategories) =>
                          prevSubCategories.map((subCat) =>
                            subCat.id === subCategory.id
                              ? updatedSubCategory
                              : subCat
                          )
                        );
                        setSubCategoryInput(""); // Réinitialise le champ de saisie
                      });
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400 transition duration-200"
                  >
                    Sauvegarder
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {subCategory.name}
                  </h3>
                  <h5 className="text-lg text-gray-300">
                    Catégorie associée :{" "}
                    {associatedCategory
                      ? associatedCategory.Name
                      : "Non spécifiée"}
                  </h5>
                  <div className="flex justify-between mt-4 w-full">
                    <button
                      onClick={() => {
                        setSubCategoryInput(subCategory.name);
                        setSubCategories((prevSubCategories) =>
                          prevSubCategories.map((subCat) =>
                            subCat.id === subCategory.id
                              ? { ...subCat, isEditing: true }
                              : { ...subCat, isEditing: false }
                          )
                        );
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 transition duration-200"
                    >
                      Éditer
                    </button>
                    <button
                      onClick={() => {
                        deleteSubCategory(subCategory.id).then(() => {
                          // Après la suppression, rafraîchir les sous-catégories
                          fetchData(
                            "http://localhost:3000/sub-categories",
                            setSubCategories
                          );
                        });
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition duration-200"
                    >
                      Supprimer
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
  const renderProducts = () => (
    <section className="products">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Produits</h2>
  
      <input
        type="text"
        value={productInput.name}
        onChange={(e) =>
          setProductInput({ ...productInput, name: e.target.value })
        }
        placeholder="Nom du produit"
        className="border border-green-500 bg-gray-700 p-3 rounded-full mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
      />
  
      <input
        type="number"
        value={productInput.price}
        onChange={(e) =>
          setProductInput({ ...productInput, price: e.target.value })
        }
        placeholder="Prix du produit"
        className="border border-green-500 bg-gray-700 p-3 rounded-full mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
      />
  
      <input
        type="text"
        value={productInput.description}
        onChange={(e) =>
          setProductInput({ ...productInput, description: e.target.value })
        }
        placeholder="Description du produit"
        className="border border-green-500 bg-gray-700 p-3 rounded-full mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
      />
  
      <select
        value={productInput.subCategory}
        onChange={(e) =>
          setProductInput({ ...productInput, subCategory: e.target.value })
        }
        className="border border-green-500 bg-gray-700 p-3 rounded-full mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
      >
        <option value="">Sélectionnez une sous-catégorie</option>
        {subCategories.map((subCategory) => (
          <option key={subCategory._id} value={subCategory._id}>
            {subCategory.name}
          </option>
        ))}
      </select>
  
      <input
        type="text"
        value={productInput.image}
        onChange={(e) =>
          setProductInput({ ...productInput, image: e.target.value })
        }
        placeholder="URL de l'image du produit"
        className="border border-green-500 bg-gray-700 p-3 rounded-full mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
      />
  
      <select
        value={productInput.options}
        onChange={(e) =>
          setProductInput({ ...productInput, options: e.target.value })
        }
        className="border border-green-500 bg-gray-700 p-3 rounded-full mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
      >
        <option value="">Sélectionnez une option</option>
        <option value="avec oeufs">Avec oeufs</option>
        <option value="sans oeufs">Sans oeufs</option>
        <option value="1 oeuf">1 oeuf</option>
        <option value="2 oeufs">2 oeufs</option>
      </select>
  
      <button
        onClick={addProduct} // Ajout d'un produit
        className="bg-green-600 text-white p-3 rounded-full mb-4 w-full sm:w-auto hover:bg-green-500 transition duration-200"
      >
        Ajouter Produit
      </button>
  
      {/* Afficher le modal d'édition si ouvert */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white mb-2">Édition du Produit</h3>
            <input
              type="text"
              value={productInput.name}
              onChange={(e) =>
                setProductInput({ ...productInput, name: e.target.value })
              }
              placeholder="Nom du produit"
              className="border border-green-500 bg-gray-800 p-2 rounded-full mb-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            />
  
            <input
              type="number"
              value={productInput.price}
              onChange={(e) =>
                setProductInput({ ...productInput, price: e.target.value })
              }
              placeholder="Prix du produit"
              className="border border-green-500 bg-gray-800 p-2 rounded-full mb-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            />
  
            <input
              type="text"
              value={productInput.description}
              onChange={(e) =>
                setProductInput({ ...productInput, description: e.target.value })
              }
              placeholder="Description du produit"
              className="border border-green-500 bg-gray-800 p-2 rounded-full mb-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            />
  
            <select
              value={productInput.subCategory}
              onChange={(e) =>
                setProductInput({ ...productInput, subCategory: e.target.value })
              }
              className="border border-green-500 bg-gray-800 p-2 rounded-full mb-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            >
              <option value="">Sélectionnez une sous-catégorie</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory._id} value={subCategory._id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
  
            <input
              type="text"
              value={productInput.image}
              onChange={(e) =>
                setProductInput({ ...productInput, image: e.target.value })
              }
              placeholder="URL de l'image du produit"
              className="border border-green-500 bg-gray-800 p-2 rounded-full mb-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            />
  
            <select
              value={productInput.options}
              onChange={(e) =>
                setProductInput({ ...productInput, options: e.target.value })
              }
              className="border border-green-500 bg-gray-800 p-2 rounded-full mb-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            >
              <option value="">Sélectionnez une option</option>
              <option value="avec oeufs">Avec oeufs</option>
              <option value="sans oeufs">Sans oeufs</option>
              <option value="1 oeuf">1 oeuf</option>
              <option value="2 oeufs">2 oeufs</option>
            </select>
  
            <button
              onClick={() => updateProduct(productIdToEdit).then(()=>{
                fetchData("http://localhost:3000/products", setProducts);
                setIsModalOpen(false);
              })} // Passer l'ID du produit à mettre à jour
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-500 transition duration-200"
            >
              Enregistrer
            </button>
  
            <button
              onClick={() => {
                setIsModalOpen(false); // Fermer le modal
                setIsEditing(false); // Réinitialiser l'état d'édition
                setProductIdToEdit(null); // Réinitialiser l'ID du produit à éditer
              }}
              className="bg-red-500 text-white p-3 rounded-full hover:bg-red-400 transition duration-200 mt-2"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md relative mb-4"
          >
            <h3 className="text-xl font-semibold text-white">{product.name}</h3>
  
            <div className="flex flex-col mt-4">
              <img
                src={product.image}
                alt={product.description || "Image du produit"}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col mt-4">
              <p className="text-gray-300">{product.description}</p>
              <p className="text-gray-300">{product.options}</p>
              <p className="text-gray-300">{product.price} €</p>
              <p className="text-gray-300">{product.subCategoryId}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  setProductInput({
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    subCategory: product.subCategoryId,
                    image: product.image,
                    options: product.options,
                  });
                  setProductIdToEdit(product.id); // Récupérer l'ID du produit pour l'édition
                  setIsModalOpen(true); // Ouvrir le modal d'édition
                  setIsEditing(true); // Indiquer que nous sommes en mode édition
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition duration-200"
              >
                Éditer
              </button>
              <button
                onClick={() => deleteProduct(product.id)} // Logique de suppression
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition duration-200"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "categories":
        return renderCategories();
      case "subCategories":
        return renderSubCategories();
      case "products":
        return renderProducts();
      default:
        return null;
    }
  };

  return (
    <div className="dashboard p-4 sm:p-8 bg-black text-white min-h-screen">
      {!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Connexion</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="border border-green-500 bg-gray-700 p-3 rounded-full mb-4 w-full sm:w-64"
          />
          <button
            onClick={() => {
              if (password === "admin") {
                setIsLoggedIn(true);
                setError(""); // Réinitialiser l'erreur
              } else {
                setError("Mot de passe incorrect");
              }
            }}
            className="bg-green-600 text-white p-3 rounded-full w-full sm:w-auto hover:bg-green-500 transition duration-200"
          >
            Se connecter
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      ) : (
        <>
          <Header />
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/4 bg-green-800 p-4 rounded-lg sm:rounded-s-lg">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Sections</h2>
              <ul>
                <li
                  onClick={() => setActiveSection("categories")}
                  className={`cursor-pointer p-2 ${
                    activeSection === "categories" ? "bg-gray-700" : ""
                  }`}
                >
                  Catégories
                </li>
                <li
                  onClick={() => setActiveSection("subCategories")}
                  className={`cursor-pointer p-2 ${
                    activeSection === "subCategories" ? "bg-gray-700" : ""
                  }`}
                >
                  Sous-Catégories
                </li>
                <li
                  onClick={() => setActiveSection("products")}
                  className={`cursor-pointer p-2 ${
                    activeSection === "products" ? "bg-gray-700" : ""
                  }`}
                >
                  Produits
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-3/4 bg-gray-900 p-4 rounded-lg sm:rounded-e-lg mt-4 sm:mt-0">
              {renderContent()}
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;
