'use client'

import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import "./objects.css"

// Define types for our data structures
type FixedPrices = {
  [key: string]: number;
};

type Category = string;

interface Product {
  name: string;
  price: number;
}

const DecorShopHomepage: React.FC = () => {
  const fixedPrices: FixedPrices = {
    'NRS BLK': 49.99,
    'NSR BLU': 54.99,
    'MATCHES': 39.99
  };

  const products: Product[] = Object.entries(fixedPrices).map(([name, price]) => ({ name, price }));
  const categories: Category[] = ['NSR', 'Fine Art', 'Interior Objects'];

  return (
    <div className="decor-shop">
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

      <section className="hero-section">
        <div className="hero-content">
          <h2>PRODUCTS FOR THE SOUL</h2>
          <p>Breathing new life into cultural craft</p>
          <button className="cta-button">Shop now</button>
        </div>
      </section>

      <section className="favorites-section">
        <h3>New Arrivals</h3>
        <p>Thought Expressions</p>
        <div className="product-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-image"></div>
              <h4>{product.name}</h4>
              <p>${product.price.toFixed(2)}</p>
              <button className="add-to-cart">Add to cart</button>
            </div>
          ))}
        </div>
      </section>

      <section className="categories-section">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <h3>{category}</h3>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DecorShopHomepage;