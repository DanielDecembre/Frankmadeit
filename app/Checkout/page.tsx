'use client'


import React, { useState } from 'react';

const ShoppingCartVisual = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: 'Cashmere Blend Sweater', price: 299.99, quantity: 1 },
    { id: 2, name: 'Italian Leather Belt', price: 149.99, quantity: 1 },
  ]);

  const updateQuantity = (id, change) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ).filter(item => item.quantity > 0));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const styles = {
    page: {
      fontFamily: 'Helvetica, Arial, sans-serif',
      backgroundColor: '#000000',
      color: '#e0e0e0',
      padding: '20px',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#121212',
      borderRadius: '12px',
      padding: '30px',
      width: '800px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    },
    header: {
      borderBottom: '1px solid #2a2a2a',
      paddingBottom: '20px',
      marginBottom: '30px',
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: '300',
      margin: '0',
      color: '#ffffff',
    },
    content: {
      display: 'flex',
    },
    cartItems: {
      flex: '3',
      marginRight: '30px',
    },
    cartItem: {
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
    },
    itemImage: {
      width: '60px',
      height: '60px',
      backgroundColor: '#2a2a2a',
      marginRight: '15px',
    },
    itemDetails: {
      flex: 1,
    },
    quantityControl: {
      display: 'flex',
      alignItems: 'center',
    },
    quantityButton: {
      backgroundColor: 'transparent',
      border: '1px solid #4a4a4a',
      color: '#ffffff',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '16px',
      margin: '0 5px',
    },
    quantity: {
      margin: '0 10px',
      fontSize: '14px',
      minWidth: '20px',
      textAlign: 'center',
    },
    orderSummary: {
      flex: '2',
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      padding: '20px',
    },
    summaryTitle: {
      fontSize: '18px',
      fontWeight: '400',
      marginBottom: '20px',
      color: '#ffffff',
    },
    summaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
    },
    checkoutButton: {
      backgroundColor: isHovered ? '#808080' : '#ffffff',
      color: isHovered ? '#ffffff' : '#000000',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      display: 'inline-block',
      marginTop: '20px',
    },
    emptyCart: {
      textAlign: 'center',
      padding: '20px',
      color: '#b0b0b0',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.headerTitle}>SHOPPING BAG</h1>
        </header>
        <div style={styles.content}>
          <div style={styles.cartItems}>
            {items.length > 0 ? (
              items.map(item => (
                <div key={item.id} style={styles.cartItem}>
                  <div style={styles.itemImage}></div>
                  <div style={styles.itemDetails}>
                    <div style={{color: '#ffffff'}}>{item.name}</div>
                    <div style={{color: '#b0b0b0'}}>${item.price.toFixed(2)}</div>
                  </div>
                  <div style={styles.quantityControl}>
                    <button style={styles.quantityButton} onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button style={styles.quantityButton} onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.emptyCart}>Your shopping bag is empty.</div>
            )}
          </div>
          <div style={styles.orderSummary}>
            <h2 style={styles.summaryTitle}>ORDER SUMMARY</h2>
            <div style={styles.summaryItem}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={styles.summaryItem}>
              <span>Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div style={{...styles.summaryItem, fontWeight: 'bold', marginTop: '10px'}}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button 
              style={styles.checkoutButton}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartVisual;