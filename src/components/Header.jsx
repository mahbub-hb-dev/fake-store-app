import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import CategoryDropdown from "./CategoryDropdown";
import Cart from "./Cart";
import { useCart } from "../context/CartContext";

const Header = ({ categories, onCategorySelect, searchValue, setSearchValue }) => {
  const { cart } = useCart();

  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [animate, setAnimate] = useState(false);

  /* total cart quantity */
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  /* resize detect */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* badge animation */
  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(t);
    }
  }, [totalItems]);

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50 px-4 py-3 animate-slideDown">
        {/* ===== MAIN FLEX CONTAINER ===== */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3">

          {/* LOGO */}
          <Link
            to="/"
            onClick={() => {
              setSearchValue("");
              onCategorySelect("");
            }}
            className="text-xl font-bold text-indigo-600"> FakeStore
          </Link>

          {/* SEARCH BAR */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="order-last md:order-none border rounded px-3 py-2 w-full md:flex-1"
          />

          {/* CATEGORIES (mobile + desktop inside same block) */}
          <div className="relative ml-auto">
            {/* Desktop categories */}
            <nav className="hidden md:flex gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategorySelect(cat)}
                  className="hover:text-indigo-600 font-medium"
                >
                  {cat}
                </button>
              ))}
            </nav>

            {/* Mobile dropdown */}
            {isMobile && (
              <>
                <button
                  onClick={() => setMobileDropdown(!mobileDropdown)}
                  className="px-3 py-1 border rounded font-medium text-sm hover:bg-gray-100"
                > Categories
                </button>

                {mobileDropdown && (
                  <CategoryDropdown
                    categories={categories}
                    onSelect={(cat) => {
                      onCategorySelect(cat);
                      setMobileDropdown(false);
                    }}
                  />
                )}
              </>
            )}
          </div>

          {/* CART ICON */}
          <button className="relative text-2xl ml-auto md:ml-auto hover:text-red-500" onClick={() => setCartOpen(true)} >
            <FiShoppingCart />
            {totalItems > 0 && (
              <span
                className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center
                ${animate ? "scale-125" : "scale-100"} transition-transform`}> {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        isMobile={isMobile}
      />
    </>
  );
};

export default Header;
