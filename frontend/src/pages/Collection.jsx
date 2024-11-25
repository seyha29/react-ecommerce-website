import React, { useEffect, useState, useContext, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
const Shops = () => {
  const [products, setProducts] = useState([]);  // Store products data
  const [loading, setLoading] = useState(true);   // Loading state
  const [error, setError] = useState(null);       // Error state

  useEffect(() => {
    // Fetch data from the fake store API
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);  // Set the fetched products to state
        setLoading(false);  // Set loading to false once data is fetched
      } catch (err) {
        setError(err.message);  // Set error message if the fetch fails
        setLoading(false);  // Stop loading in case of error
      }
    };

    fetchProducts();  // Call the function to fetch data
  }, []);  // Empty dependency array ensures this runs once after component mounts

  if (loading) {
    return <p>Loading...</p>;  // Show loading message while data is being fetched
  }

  if (error) {
    return <p>Error: {error}</p>;  // Display error message if there was an issue fetching data
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Shops</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="border-b py-2">
            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p>{product.description}</p>
            <p className="font-bold mt-2">${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Collection = () => {
  const { products = [], search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    console.log("All Products:", products);

    // Search filter
    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter (case-insensitive)
    if (category.length > 0) {
      console.log("Selected Categories: ", category);
      filtered = filtered.filter((item) =>
        category.some((cat) => item.category?.toLowerCase() === cat.toLowerCase())
      );
    }

    // Subcategory filter (case-insensitive)
    if (subcategory.length > 0) {
      console.log("Selected Subcategories: ", subcategory);
      filtered = filtered.filter((item) =>
        subcategory.some((subcat) => item.subCategory?.toLowerCase() === subcat.toLowerCase())
      );
    }

    console.log("Filtered Products After Category and Subcategory Filters: ", filtered);

    // Sorting based on price
    switch (sortType) {
      case 'low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  }, [products, category, subcategory, search, showSearch, sortType]);

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 8);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTER
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="Dropdown icon"
          />
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Men', 'Women', 'Kids'].map((cat) => (
              <p key={cat} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                />
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </p>
            ))}
          </div>
        </div>

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Topwear', 'Bottomwear', 'Winterwear'].map((subcat) => (
              <p key={subcat} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={subcat}
                  onChange={toggleSubCategory}
                />
                {subcat.charAt(0).toUpperCase() + subcat.slice(1)}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            className="border-2 border-gray-300 text-base sm:text-2xl mb-4"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredAndSortedProducts.slice(0, visibleProducts).map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>

        {visibleProducts < filteredAndSortedProducts.length && (
          <div className="text-center mt-4">
            <button
              onClick={loadMoreProducts}
              className="bg-gray-700 text-white py-2 px-6 rounded"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
