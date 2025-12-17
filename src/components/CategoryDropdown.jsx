
const CategoryDropdown = ({ categories, onSelect }) => {
  return (
    <div className="absolute top-10 right-0 bg-white shadow-lg border rounded w-40 z-50">

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className="block w-full text-left px-3 py-2 hover:bg-gray-100"
        >
          {cat}
        </button>
      ))}
      
    </div>
  );
};

export default CategoryDropdown;
