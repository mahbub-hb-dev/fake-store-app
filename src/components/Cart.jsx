import { useCart } from "../context/CartContext";

const Cart = ({ isOpen, onClose, isMobile }) => {
  const { cart, dispatch } = useCart();

  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-0 right-0 z-50 bg-white shadow-lg ${
        isMobile ? "w-full h-full" : "w-96 h-full"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="font-bold text-lg">Cart</h2>
        <button onClick={onClose} className="text-xl">✕</button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 && <p>Your cart is empty.</p>}

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center mb-4"
          >
            <div className="flex items-center gap-2">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-red-500">
                  ${item.price} × {item.quantity}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    className="px-2 border rounded"
                    onClick={() =>
                      dispatch({
                        type: "DECREASE_QTY",
                        payload: item.id,
                      })
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="px-2 border rounded"
                    onClick={() =>
                      dispatch({
                        type: "INCREASE_QTY",
                        payload: item.id,
                      })
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: item.id,
                })
              }
              className="text-red-500 font-bold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="p-4 border-t">
          <p className="font-bold">
            Total: $
            {cart.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )}
          </p>
          <button className="mt-2 w-full bg-indigo-600 text-white py-2 rounded">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
