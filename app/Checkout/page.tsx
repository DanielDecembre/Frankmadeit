'use client'


import React, { useState } from 'react';

// Define the Item interface
interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Define the component props if needed
interface CheckoutProps {
  // Add any props here if your component receives any
}

const Checkout: React.FC<CheckoutProps> = () => {
  // Initialize state with Item type
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Product 1", price: 10, quantity: 1 },
    { id: 2, name: "Product 2", price: 20, quantity: 1 },
    // Add more initial items as needed
  ]);

  // Update the updateQuantity function with proper types
  const updateQuantity = (id: number, change: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ).filter(item => item.quantity > 0));
  };

  // Calculate total price
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Define styles with proper type
  const containerStyle: React.CSSProperties = {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '5px 10px',
    margin: '0 5px',
  };

  return (
    <div style={containerStyle}>
      <h1>Checkout</h1>
      {items.map(item => (
        <div key={item.id} style={itemStyle}>
          <span>{item.name} - ${item.price}</span>
          <div>
            <button style={buttonStyle} onClick={() => updateQuantity(item.id, -1)}>-</button>
            <span>{item.quantity}</span>
            <button style={buttonStyle} onClick={() => updateQuantity(item.id, 1)}>+</button>
          </div>
        </div>
      ))}
      <h2>Total: ${totalPrice.toFixed(2)}</h2>
    </div>
  );
};

export default Checkout;