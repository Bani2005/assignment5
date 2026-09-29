import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Banarasi Silk Saree",
    price: 2499,
    emoji: "🥻",
    category: "Traditional Wear",
  },
  {
    id: 2,
    name: "Kundan Jhumka",
    price: 699,
    emoji: "💎",
    category: "Jewellery",
  },
  {
    id: 3,
    name: "Handcrafted Diya Set",
    price: 399,
    emoji: "🪔",
    category: "Home Decor",
  },
  {
    id: 4,
    name: "Block Print Kurti",
    price: 999,
    emoji: "👗",
    category: "Ethnic Wear",
  },
  {
    id: 5,
    name: "Terracotta Vase",
    price: 599,
    emoji: "🏺",
    category: "Handicraft",
  },
  {
    id: 6,
    name: "Phulkari Dupatta",
    price: 799,
    emoji: "🧣",
    category: "Accessories",
  },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 79;

  const total = subtotal + delivery;

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">🇮🇳 DesiCart</div>

        <nav>
          <a href="#home">Home</a>
          <a href="#products">Shop</a>
          <a href="#cart">Cart</a>
        </nav>

        <div className="nav-icons">
          <button className="icon-btn">♡</button>

          <button className="cart-btn">
            🛒
            <span>{totalItems}</span>
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="small-title">✨ MADE WITH INDIAN LOVE</div>

          <h1>
            Celebrate
            <br />
            <span>India in Style</span>
          </h1>

          <p className="hero-text">
            Discover beautiful Indian fashion, jewellery,
            handicrafts and home decor — all in one place.
          </p>

          <a href="#products" className="explore-btn">
            Explore Collection →
          </a>
        </div>

        <div className="hero-image">🥻</div>
      </section>

      {/* PRODUCTS */}
      <section className="products-section" id="products">
        <div className="section-label">OUR COLLECTION</div>

        <h2>Desi Favourites ❤️</h2>

        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <span>{product.emoji}</span>
              </div>

              <span className="offer">MADE IN INDIA 🇮🇳</span>

              <h3>{product.name}</h3>

              <p className="category">{product.category}</p>

              <div className="product-bottom">
                <strong>₹{product.price}</strong>

                <button
                  className="add-btn"
                  onClick={() => addToCart(product)}
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CART */}
      <section className="cart-section" id="cart">
        <div className="section-label">YOUR BAG</div>

        <div className="cart-header">
          <h2>Shopping Cart 🛍️</h2>

          <span className="item-count">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>

            <h3>Your cart is empty</h3>

            <p>
              Add some beautiful Indian products to your cart!
            </p>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-product-icon">
                    {item.emoji}
                  </div>

                  <div className="cart-product-info">
                    <h3>{item.name}</h3>
                    <p>₹{item.price} each</p>
                  </div>

                  <div className="quantity-control">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <strong className="item-total">
                    ₹{item.price * item.quantity}
                  </strong>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="cart-summary">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="summary-row">
                <span>Delivery</span>

                <span>
                  {delivery === 0 ? "FREE 🎉" : `₹${delivery}`}
                </span>
              </div>

              <hr />

              <div className="summary-total">
                <span>Total</span>
                <strong>₹{total}</strong>
              </div>

              <button
                className="checkout-btn"
                onClick={() =>
                  alert("Thank you for shopping with DesiCart! 🇮🇳")
                }
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer>
        <p>
          🇮🇳 DesiCart — Bringing India's beautiful traditions
          to your doorstep ❤️
        </p>
      </footer>
    </div>
  );
}

export default App;