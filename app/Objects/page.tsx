'use client'

import React from 'react';
import { ShoppingBag, Heart, } from 'lucide-react';
import "./objects.css"

const DecorShopHomepage = () => {
  const fixedPrices = {
    'NRS BLK': 49.99,
    'NSR BLU': 54.99,
    'MATCHES': 39.99
  };

  return (
    <div className="decor-shop">
      {/* Header */}
      <header>
        <nav>
          <ul>
            <li><button>Home</button></li>
            <li><button>Films</button></li>
          </ul>
        </nav>
        <h1>Frank</h1>
        <div className="header-icons">
          <button><Heart /></button>
          <button><ShoppingBag /></button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>PRODUCTS FOR THE SOUL</h2>
          <p>Breathing new life into cultural craft</p>
          <button className="cta-button">Shop now</button>
        </div>
      </section>

      {/* Favorites Section */}
      <section className="favorites-section">
        <h3>New Arrivals</h3>
        <p>Thought Expressions</p>
        <div className="product-grid">
          {['NRS BLK', 'NSR BLU', 'MATCHES'].map((item, index) => (
            <div key={index} className="product-card">
              <div className="product-image"></div>
              <h4>{item}</h4>
              <p>${fixedPrices[item].toFixed(2)}</p>
              <button className="add-to-cart">Add to cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        {['NSR', 'Fine Art', 'Interior Objects'].map((category, index) => (
          <div key={index} className="category-item">
            <h3>{category}</h3>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DecorShopHomepage;