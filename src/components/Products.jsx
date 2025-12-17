import React from "react";
import ProductModal from "./ProductModal";
import { useCart } from "../context/CartContext";

const Products = ({ products }) => {
  const { dispatch } = useCart();
  const [modalProduct, setModalProduct] = React.useState(null);

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <>
      <section className="flex flex-wrap gap-5 justify-center py-7 px-3">
        {products && products.length > 0 ? (
          products.map((product) => (

            <article key={product.id} className="shadow-xl bg-white rounded-lg p-3 w-[300px]">
              <img src={product.images[0]} alt={product.title} className="w-full" />
              <h3 className="font-medium text-lg mt-2">{product.title}</h3>
              <p className="text-fuchsia-500 font-medium">{product.category}</p>
              <p className="text-red-500 font-medium">{product.price}$</p>
              <button className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700" onClick={() => setModalProduct(product)}> Buy Now </button>
              <button className="mt-2 ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => handleAddToCart(product)}> Add to Cart </button>
            </article>
            
          ))
        ) : (<p className="text-center text-gray-500">No products found.</p>)}
      </section>

      {modalProduct && (<ProductModal product={modalProduct} onClose={() => setModalProduct(null)} onAddToCart={handleAddToCart} />)}
    </>
  );
};

export default Products;
