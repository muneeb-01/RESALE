import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaUser, FaCog, FaSearch, FaBars } from "react-icons/fa";
import { create } from "zustand";
import { PiShoppingCartSimple } from "react-icons/pi";

const mockProducts = [
  {
    id: 1,
    name: "T-Shirt",
    price: 20,
    category: "Shirts",
    color: "Red",
    size: "M",
    image:
      "https://images.unsplash.com/photo-1583743814966-92d1ff4595e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80",
  },
  {
    id: 2,
    name: "Jeans",
    price: 50,
    category: "Pants",
    color: "Blue",
    size: "L",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80",
  },
  {
    id: 3,
    name: "Dress",
    price: 40,
    category: "Dresses",
    color: "Green",
    size: "S",
    image:
      "https://images.unsplash.com/photo-1591360238940-aee530ae6a14?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80",
  },
  {
    id: 4,
    name: "Jacket",
    price: 80,
    category: "Jackets",
    color: "Black",
    size: "M",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80",
  },
  {
    id: 5,
    name: "Shorts",
    price: 30,
    category: "Pants",
    color: "Red",
    size: "L",
    image:
      "https://images.unsplash.com/photo-1602293589930-45aad59ba7d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80",
  },
];

const categories = ["Shirts", "Pants", "Dresses", "Jackets"];
const colors = ["Red", "Blue", "Green", "Black"];
const sizes = ["S", "M", "L"];

const useFilterStore = create((set) => ({
  filters: {
    categories: [],
    colors: [],
    sizes: [],
    sort: "lowToHigh",
  },
  setFilter: (type, value) =>
    set((state) => {
      const newFilters = { ...state.filters };
      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter((v) => v !== value);
      } else {
        newFilters[type] = [...newFilters[type], value];
      }
      return { filters: newFilters };
    }),
  setSort: (sort) =>
    set((state) => ({
      filters: { ...state.filters, sort },
    })),
}));

function Navbar({ toggleSidebar }) {
  return (
    <nav className="section craftr2 bg-gradient-to-r from-green-600 to-teal-800 p-4 flex items-center justify-between shadow-lg">
      <Link
        to="/app"
        className="flex text-white items-center text-xl font-bold transition-transform hover:scale-105"
      >
        Cloth Cycle
      </Link>
      <div className="flex-1 mx-4 relative">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 pl-8 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white transition"
        />
        <FaSearch className="absolute left-2 top-3 text-white/70" />
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to="/profile"
          className="hover:text-gray-300 text-white transition"
        >
          <FaUser size={24} />
        </Link>
        <Link
          to="/settings"
          className="hover:text-gray-300 text-white transition"
        >
          <FaCog size={24} />
        </Link>
      </div>
      <button
        className="md:hidden ml-4 hover:text-gray-300 transition"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>
    </nav>
  );
}

function Sidebar() {
  const { filters, setFilter, setSort } = useFilterStore();

  const handleCheckboxChange = (type, value) => {
    setFilter(type, value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <aside className="w-64 sticky top-0 min-h-screen bg-white p-6 shadow-xl border-r border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Filters</h2>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Categories</h3>
        {categories.map((cat) => (
          <label key={cat} className="block mb-2 text-gray-600">
            <input
              type="checkbox"
              checked={filters.categories.includes(cat)}
              onChange={() => handleCheckboxChange("categories", cat)}
              className="mr-2 accent-blue-600"
            />
            {cat}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Colors</h3>
        {colors.map((col) => (
          <label key={col} className="block mb-2 text-gray-600">
            <input
              type="checkbox"
              checked={filters.colors.includes(col)}
              onChange={() => handleCheckboxChange("colors", col)}
              className="mr-2 accent-blue-600"
            />
            {col}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Sizes</h3>
        {sizes.map((sz) => (
          <label key={sz} className="block mb-2 text-gray-600">
            <input
              type="checkbox"
              checked={filters.sizes.includes(sz)}
              onChange={() => handleCheckboxChange("sizes", sz)}
              className="mr-2 accent-blue-600"
            />
            {sz}
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Sort by Price</h3>
        <select
          value={filters.sort}
          onChange={handleSortChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        >
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>
    </aside>
  );
}

function Product({ item }) {
  return (
    <div
      className="product-card bg-white rounded-2xl border border-gray-200 shadow-sm 
      hover:shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-1
      p-4 w-full"
    >
      <Link
        to={`/Shop/${item.id}/${item.name}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="block"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-64 object-cover rounded-xl md:h-56 sm:h-48"
          loading="lazy"
        />
      </Link>
      <div className="mt-3 flex justify-between items-start">
        <div className="flex-1">
          <span className="text-sm text-gray-500 block">{item.category}</span>
          <h5 className="text-lg font-semibold text-gray-900 truncate">
            {item.name}
          </h5>
          <div className="text-sm text-gray-600 mt-1">
            <span>Color: {item.color}</span> | <span>Size: {item.size}</span>
          </div>
          <h4 className="text-xl font-bold text-teal-600 mt-1">
            ${item.price}
          </h4>
        </div>
        <button
          className="p-2 rounded-full hover:bg-teal-600 hover:text-white 
            transition-colors duration-150"
          aria-label="Add to cart"
        >
          <PiShoppingCartSimple className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

// ProductList Component
function ProductList({ products }) {
  return (
    <div className="product-list container mx-auto px-4 py-8">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 
        gap-6 auto-rows-fr"
      >
        {mockProducts.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    document.body.setAttribute("theme", "light");
    return () => {
      document.body.removeAttribute("theme");
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <div className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
          <Sidebar />
        </div>
        <main className="flex-1 p-6">
          <ProductList />
        </main>
      </div>
    </div>
  );
}
