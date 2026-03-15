import React from 'react';
import type { Product } from '../store/productsSlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    }));
  };

  return (
    <div className="card">
      <div style={{ padding: '1rem', backgroundColor: 'white', display: 'flex', justifyContent: 'center' }}>
        <img src={product.image} alt={product.title} style={{ height: '150px', objectFit: 'contain' }} />
      </div>
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--navy)' }}>{product.title}</h3>
        <p style={{ fontWeight: 'bold', color: 'var(--red)', marginBottom: '1rem', marginTop: 'auto' }}>${product.price.toFixed(2)}</p>
        <button className="btn-primary" onClick={handleAdd}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
