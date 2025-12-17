import { useState } from "react";
import { useCart } from "../context/CartContext";

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  if (!product) return null;

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-5 w-11/12 max-w-md relative">

        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}> ✕ </button>
        <img src={product.images[0]} alt={product.title} className="w-full h-40 object-cover rounded"/>
        <h2 className="text-lg font-bold mt-2">{product.title}</h2>
        <p className="text-red-500 font-semibold">${product.price}</p>
        <p className="text-gray-600 mt-1">{product.description}</p>

        <div className="mt-3 flex items-center gap-2">
          <label>Quantity:</label>
          <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className="border px-2 py-1 w-16"/>
        </div>
        
        <button onClick={addToCart} className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"> Add to Cart </button>
      </div>
    </div>
  );
};

export default ProductModal;
