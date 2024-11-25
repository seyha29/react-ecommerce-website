import { createContext, useState, useMemo } from "react";
import { products as initialProducts } from "../assets/assets"; // Importing initial products
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create the ShopContext to share data across components
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  // Constants for currency and delivery fee
  const currency = "$";
  const delivery_fee = 10;

  // State hooks for search functionality and cart items
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  // Memoize the products array to avoid unnecessary recalculations on re-renders
  const products = useMemo(() => initialProducts, [initialProducts]);

  // Add product to cart
  const addToCart = (itemId, size) => {
    console.log('Adding to cart:', itemId, size); // Debugging line
    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    const product = products.find((product) => product._id === itemId);

    if (!product) {
      toast.error('Product not found');
      return;
    }

    // Update cart with the new product and selected size
    setCartItems((prevState) => {
      const updatedCart = { ...prevState };

      if (updatedCart[itemId]) {
        updatedCart[itemId][size] = updatedCart[itemId][size] ? updatedCart[itemId][size] + 1 : 1;
      } else {
        updatedCart[itemId] = { [size]: 1 };
      }

      console.log('Updated Cart:', updatedCart); // Debugging line
      return updatedCart;
    });
  };

  // Get the total number of items in the cart
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, itemSizes) => {
      return total + Object.values(itemSizes).reduce((sum, qty) => sum + qty, 0);
    }, 0);
  };

  // Update quantity of an item in the cart
  const updateQuantity = (itemId, size, quantity) => {
    if (quantity < 0) return; // Prevent negative quantity

    // Update the cart with the new quantity or remove the item if quantity is 0
    setCartItems((prevState) => {
      const updatedCart = { ...prevState };
      if (quantity === 0) {
        delete updatedCart[itemId][size];
        if (Object.keys(updatedCart[itemId]).length === 0) {
          delete updatedCart[itemId];
        }
      } else {
        updatedCart[itemId] = {
          ...updatedCart[itemId],
          [size]: quantity,
        };
      }
      return updatedCart;
    });
  };

  // Calculate the total price of items in the cart including delivery fee
  const getCartAmount = () => {
    let totalAmount = 0;

    // Loop over each product in the cart and calculate the total price
    for (const itemId in cartItems) {
      const product = products.find((product) => product._id === itemId);
      if (!product) continue;

      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        totalAmount += (product.price || 0) * quantity; // Default to 0 if price is missing
      }
    }

    return totalAmount + delivery_fee;
  };

  // Provide the necessary values and functions to the children components
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
