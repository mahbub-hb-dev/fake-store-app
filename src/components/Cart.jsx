import { useState } from "react";
import { useCart } from "../context/CartContext";

const Cart = ({ isOpen, onClose, isMobile }) => {
  const { cart, dispatch } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    dispatch({ type: "CLEAR_CART" });
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 z-50 bg-white shadow-lg flex flex-col
        ${isMobile ? "w-full h-full" : "w-96 h-full"}`}
      >
        {/* ================= Cart Header ================= */}
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="font-bold text-lg">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* ================= Cart Body ================= */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 gap-4">
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2 border-b border-gray-300 pb-3"
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      ${item.price}
                    </p>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        className="px-2 border rounded hover:bg-gray-100 active:bg-gray-200"
                        onClick={() =>
                          dispatch({
                            type: "DECREASE_QTY",
                            payload: { id: item.id }
                          })
                        }
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 border rounded hover:bg-gray-100 active:bg-gray-200"
                        onClick={() =>
                          dispatch({
                            type: "INCREASE_QTY",
                            payload: { id: item.id }
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: { id: item.id }
                    })
                  }
                  className="text-red-500 font-bold border px-2.5 rounded hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* ================= Cart Footer ================= */}
        {cart.length > 0 && (
          <div className="p-4 border-t space-y-2">
            <p className="font-bold">
              Total: ${total.toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Checkout
            </button>
            <button
              onClick={() => dispatch({ type: "CLEAR_CART" })}
              className="w-full bg-red-500 text-white py-2 rounded"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>

      {/* ================= Success Modal ================= */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg">
            <h3 className="text-lg font-bold text-green-600">
              🎉 Order Placed Successfully!
            </h3>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
