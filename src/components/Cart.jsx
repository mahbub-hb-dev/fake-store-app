import { useCart } from "../context/CartContext";

const Cart = ({ isOpen, onClose, isMobile }) => {
  const { cart, dispatch } = useCart();

  if (!isOpen) return null;

  return (
    <div className={`fixed top-0 right-0 z-50 bg-white shadow-lg ${isMobile ? "w-full h-full" : "w-96 h-full"} flex flex-col`}>
      
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="font-bold text-lg">Cart</h2>
        <button onClick={onClose} className="text-gray-500 text-xl"> ✕ </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 && <p>Your cart is empty.</p>}
        
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <img src={item.images[0]} alt={item.title} className="w-12 h-12 object-cover rounded" />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-red-500">${item.price} x {item.quantity}</p>
              </div>
            </div>
            <button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: { id: item.id } })} className="text-red-500 font-bold"> ✕ </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t">
          <p className="font-bold"> Total: $ {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} </p>
          <button className="mt-2 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"> Checkout </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
