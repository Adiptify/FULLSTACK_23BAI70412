import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { incrementQuantity, decrementQuantity, removeFromCart, clearCart } from '../store/cartSlice';

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '2rem 1rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--navy)' }}>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Shopping Cart</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {items.map(item => (
          <div key={item.id} className="card" style={{ flexDirection: 'row', alignItems: 'center', padding: '1rem', gap: '1rem' }}>
            <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
            <div style={{ flexGrow: 1 }}>
              <h4 style={{ color: 'var(--navy)', marginBottom: '0.5rem' }}>{item.title}</h4>
              <p style={{ fontWeight: 'bold', color: 'var(--red)' }}>${item.price.toFixed(2)}</p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button onClick={() => dispatch(decrementQuantity(item.id))} style={{ padding: '0.5rem', background: '#e0e0e0', borderRadius: '4px' }}>-</button>
              <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
              <button onClick={() => dispatch(incrementQuantity(item.id))} style={{ padding: '0.5rem', background: '#e0e0e0', borderRadius: '4px' }}>+</button>
            </div>
            
            <button onClick={() => dispatch(removeFromCart(item.id))} style={{ color: 'var(--red)', fontWeight: 'bold' }}>Remove</button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <h2 style={{ color: 'var(--navy)' }}>Total: <span style={{ color: 'var(--red)' }}>${total.toFixed(2)}</span></h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary" onClick={() => dispatch(clearCart())}>Clear Cart</button>
          <button className="btn-primary">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
