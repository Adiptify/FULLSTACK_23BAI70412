import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const { language } = useLanguage();

  const greeting = {
    en: "Welcome to ShopSphere",
    es: "Bienvenido a ShopSphere",
    fr: "Bienvenue sur ShopSphere"
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '1rem 0', background: 'var(--card-bg)', borderBottom: '1px solid var(--border-color)' }}>
        <p style={{ fontWeight: 'bold', color: 'var(--orange)' }}>{greeting[language]}</p>
      </div>
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <footer className="gradient-bg" style={{ padding: '1.5rem', textAlign: 'center', marginTop: 'auto' }}>
        <p>&copy; 2026 ShopSphere. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
