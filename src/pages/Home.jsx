import { useState, useEffect } from "react";
import Header from "../components/Header";
import ProductModal from "../components/ProductModal";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalProduct, setModalProduct] = useState(null);

  const categories = ["beauty", "furniture", "groceries", "fragrances"];

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      });
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [search, selectedCategory, products]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header categories={categories} onCategorySelect={setSelectedCategory} searchValue={search} setSearchValue={setSearch} />

      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProducts.map((p) => (
          <div key={p.id} className="bg-white p-3 rounded shadow">
            <img src={p.images[0]} alt={p.title} className="w-full h-40 object-cover rounded" />
            <h3 className="font-medium mt-2">{p.title}</h3>
            <p className="text-red-500 font-semibold">${p.price}</p>
            <p className="text-gray-600 text-sm"> {p.description.substring(0, 60)}... </p>
            <button onClick={() => setModalProduct(p)} className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 w-full"> Buy Now </button>
          </div>
        ))}
      </main>

      {/* Modal */}
      {modalProduct && (<ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />)}
    </div>
  );
};

export default Home;
