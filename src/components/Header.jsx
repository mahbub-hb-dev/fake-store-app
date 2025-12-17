import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import { FiShoppingCart } from "react-icons/fi";
import Cart from "./Cart";

const Header = ({ categories, onCategorySelect, searchValue, setSearchValue }) => {
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50 px-4 py-3 flex items-center justify-between gap-2 flex-wrap">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-600 cursor-pointer" onClick={() => {setSearchValue(""); onCategorySelect("")}}> FakeStore </Link>

        {/* Search bar (always visible) */}
        <input type="text" 
          placeholder="Search products..." 
          value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
          className="border rounded px-3 py-1 flex-1 min-w-[150px]"
        />

        {/* Desktop Categories */}
        <nav className="hidden md:flex gap-4">
          {categories.map((cat) => (
            <button key={cat} onClick={() => onCategorySelect(cat)} className="hover:text-indigo-600 font-medium"> {cat} </button>
          ))}
        </nav>

        {/* Mobile dropdown + cart */}
        <div className="flex items-center gap-2">
          {/* Mobile category dropdown */}
          {isMobile && (
            <div className="relative">
              <button onClick={() => setMobileDropdown(!mobileDropdown)} className="px-2 py-1 border rounded"> Categories </button>
              {mobileDropdown && (
                <CategoryDropdown categories={categories} onSelect={(cat) => {
                    onCategorySelect(cat);
                    setMobileDropdown(false);
                  }}
                />
              )}
            </div>
          )}

          {/* Cart icon */}
          <button className="relative text-2xl" onClick={() => setCartOpen(true)}>
            <FiShoppingCart />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </header>

      {/* Cart Drawer / Modal */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} isMobile={isMobile} />
    </>
  );
};

export default Header;
