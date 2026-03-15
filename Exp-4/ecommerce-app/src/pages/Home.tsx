import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchProducts } from '../store/productsSlice';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Our Products</h1>
      
      {status === 'loading' && <p>Loading products...</p>}
      {status === 'failed' && <p style={{ color: 'var(--red)' }}>Error: {error}</p>}
      
      {status === 'succeeded' && (
        <div className="products-grid">
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
