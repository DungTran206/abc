import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // Calculate total items in the cart dynamically
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // 3 Categories, 6 unique plants per category (18 total)
  const plants = [
    // Category 1: Air Purifying
    { category: "Air Purifying", name: "Snake Plant", cost: 15, image: "https://via.placeholder.com/150" },
    { category: "Air Purifying", name: "Spider Plant", cost: 12, image: "https://via.placeholder.com/150" },
    { category: "Air Purifying", name: "Peace Lily", cost: 18, image: "https://via.placeholder.com/150" },
    { category: "Air Purifying", name: "Boston Fern", cost: 14, image: "https://via.placeholder.com/150" },
    { category: "Air Purifying", name: "Rubber Plant", cost: 20, image: "https://via.placeholder.com/150" },
    { category: "Air Purifying", name: "Aloe Vera", cost: 10, image: "https://via.placeholder.com/150" },
    
    // Category 2: Pet Friendly
    { category: "Pet Friendly", name: "Areca Palm", cost: 25, image: "https://via.placeholder.com/150" },
    { category: "Pet Friendly", name: "Calathea", cost: 22, image: "https://via.placeholder.com/150" },
    { category: "Pet Friendly", name: "Money Tree", cost: 30, image: "https://via.placeholder.com/150" },
    { category: "Pet Friendly", name: "Cast Iron Plant", cost: 28, image: "https://via.placeholder.com/150" },
    { category: "Pet Friendly", name: "Polka Dot Plant", cost: 12, image: "https://via.placeholder.com/150" },
    { category: "Pet Friendly", name: "Haworthia", cost: 15, image: "https://via.placeholder.com/150" },

    // Category 3: Succulents
    { category: "Succulents", name: "Echeveria", cost: 8, image: "https://via.placeholder.com/150" },
    { category: "Succulents", name: "Jade Plant", cost: 12, image: "https://via.placeholder.com/150" },
    { category: "Succulents", name: "Burro's Tail", cost: 14, image: "https://via.placeholder.com/150" },
    { category: "Succulents", name: "Zebra Plant", cost: 10, image: "https://via.placeholder.com/150" },
    { category: "Succulents", name: "String of Pearls", cost: 18, image: "https://via.placeholder.com/150" },
    { category: "Succulents", name: "Panda Plant", cost: 11, image: "https://via.placeholder.com/150" }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  // Group plants by category
  const categorizedPlants = plants.reduce((acc, plant) => {
    if (!acc[plant.category]) acc[plant.category] = [];
    acc[plant.category].push(plant);
    return acc;
  }, {});

  return (
    <div>
      {/* Navbar visible on both views */}
      <nav className="navbar">
        <div className="nav-logo" onClick={() => setShowCart(false)}>Paradise Nursery</div>
        <div className="nav-links">
          <button onClick={() => setShowCart(false)}>Plants</button>
          <button onClick={() => setShowCart(true)}>
            🛒 Cart ({totalCartItems})
          </button>
        </div>
      </nav>

      {/* Toggle between Product List and Cart Component */}
      {!showCart ? (
        <div className="product-list">
          {Object.keys(categorizedPlants).map((category) => (
            <div key={category}>
              <h2 className="category-title">{category}</h2>
              <div className="product-grid">
                {categorizedPlants[category].map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3>{plant.name}</h3>
                    <p>${plant.cost}</p>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={cartItems.some(item => item.name === plant.name)}
                    >
                      {cartItems.some(item => item.name === plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;