import React, { useState, useEffect } from 'react';
import "./infinity.css";
import gas from './assets/gas.png';

function Infinity() {
  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [orderSent, setOrderSent] = useState(false);
  
  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Check for existing login on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('gasExpressUser');
    if (savedUser) {
      setIsLoggedIn(true);
      setUsername(JSON.parse(savedUser).username);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple validation - in real app, verify against backend
    if (username && password) {
      localStorage.setItem('gasExpressUser', JSON.stringify({ username }));
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('gasExpressUser');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      alert('Please login to place an order');
      return;
    }
    
    const message = `New Gas Cylinder Order:\n\nName: ${name}\nPhone: ${phone}\nType: ${type}\nAddress: ${address}\nQuantity: ${quantity}\nTotal: Ksh ${1250 * quantity}`;
    const whatsappUrl = `https://wa.me/254101541820?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setOrderSent(true);
    
    setTimeout(() => {
      setName('');
      setPhone('');
      setType('');
      setAddress('');
      setQuantity(1);
      setOrderSent(false);
    }, 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        <header className="header">
          <h1>GasExpress</h1>
          <p>Please login to place your order</p>
        </header>
        
        <main className="main-content">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="header">
        <h1>GasExpress</h1>
        <p>Fast & Reliable Gas Delivery</p>
        <button onClick={handleLogout} className="logout-button">
          Logout ({username})
        </button>
      </header>
      
      <main className="main-content">
        <div className="product-card">
          <div className="product-image">
            <img src={gas} alt="Gas Cylinder" />
          </div>
          <div className="product-details">
            <h2>Standard Gas Cylinder</h2>
            <p className="price">Ksh 1,250</p>
            <p className="delivery">Free Delivery</p>
            <div className="features">
              <p>✓ 13kg Capacity</p>
              <p>✓ High Quality</p>
              <p>✓ 5mins Delivery</p>
            </div>
          </div>
        </div>
        
        <form className="order-form" onSubmit={handleSubmit}>
          <h2>Place Your Order</h2>
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <div className="total">
            <p>Total: <span>Ksh {1250 * quantity}</span></p>
          </div>
          
          <button type="submit" className="order-button">
            {orderSent ? 'Order Sent!' : 'Order via WhatsApp'}
          </button>
          
          <p className="whatsapp-note">
            You'll be redirected to WhatsApp to confirm your order
          </p>
        </form>
      </main>
    
      <footer className="footer">
        <p>© 2025 GasExpress. All rights reserved.</p>
        <p>Call us: 0115991191</p>
      </footer>
    </div>
  );
}
export default Infinity;
