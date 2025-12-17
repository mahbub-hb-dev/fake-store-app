import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import CategoryDropdown from "./CategoryDropdown";
import Cart from "./Cart";
import { useCart } from "../context/CartContext";

const Header = ({
  categories,
  onCategorySelect,
  searchValue,
  setSearchValue,
}) => {
  const { cart } = useCart();

  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [animate, setAnimate] = useState(false);

  /* 🔢 total quantity (important part) */
  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  /* 🖥 resize detect */
  useEffect(() => {
    const handleResize = () =>
    setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  /* 🎯 badge animation trigger */
  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50 px-4 py-3 flex items-center justify-between gap-2 flex-wrap">
        {/* Logo */}
        <Link to="/" onClick={() => {
            setSearchValue("");
            onCategorySelect("");
          }}
          className="text-xl font-bold text-indigo-600 cursor-pointer"
        > FakeStore
        </Link>

        {/* Search */}
        <input type="text" placeholder="Search products..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="border rounded px-3 py-1 flex-1 min-w-37.5"/>

        {/* Desktop Categories */}
        <nav className="hidden md:flex gap-4">
          {categories.map((cat) => (
            <button key={cat} onClick={() => onCategorySelect(cat)} className="hover:text-indigo-600 font-medium"> {cat} </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Mobile Category Dropdown */}
          {isMobile && (
            <div className="relative">
              <button onClick={() => setMobileDropdown(!mobileDropdown)} className="px-2 py-1 border rounded"> Categories </button>

              {mobileDropdown && (
                <CategoryDropdown
                  categories={categories}
                  onSelect={(cat) => {
                    onCategorySelect(cat);
                    setMobileDropdown(false);
                  }}
                />
              )}
            </div>
          )}

          {/* Cart Icon */}
          <button className="relative text-2xl" onClick={() => setCartOpen(true)}>
            <FiShoppingCart />

            {/* Badge */}
            {totalItems > 0 && (
              <span
                className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center
                ${animate ? "scale-125" : "scale-100"} transition-transform`}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Cart Panel */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} isMobile={isMobile}/>
    </>
  );
};

export default Header;
