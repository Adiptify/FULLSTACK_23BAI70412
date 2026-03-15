import React from 'react';
import { ShoppingCart, Moon, Sun, Globe, LogIn, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  
  const cartItemsCount = useSelector((state: RootState) => 
    state.cart.items.reduce((total: number, item: any) => total + item.quantity, 0)
  );

  return (
    <nav className="gradient-bg" style={{ padding: '1rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
          ShopSphere
        </Link>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <Globe size={18} />
             <select 
               value={language} 
               onChange={(e) => setLanguage(e.target.value as 'en'|'es'|'fr')}
               style={{ background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '4px' }}
             >
               <option value="en" style={{color: 'black'}}>EN</option>
               <option value="es" style={{color: 'black'}}>ES</option>
               <option value="fr" style={{color: 'black'}}>FR</option>
             </select>
          </div>

          <button onClick={toggleTheme} style={{ color: 'white' }}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem' }}>{user.name}</span>
              <button onClick={logout} style={{ color: 'white' }}><LogOut size={20}/></button>
            </div>
          ) : (
            <Link to="/login" style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
              <LogIn size={20} />
            </Link>
          )}

          <Link to="/cart" style={{ color: 'white', position: 'relative' }}>
            <ShoppingCart size={24} />
            {cartItemsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: 'var(--yellow)',
                color: 'var(--navy)',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
