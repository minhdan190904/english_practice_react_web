import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/policy', label: 'Privacy Policy' },
    { path: '/delete-account', label: 'Delete Account' },
    { path: '/admin', label: 'Admin' },
  ];

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <GraduationCap size={32} color="var(--primary-color)" />
          <span className="logo-text gradient-text">VG English</span>
        </Link>
        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="nav-link">
              {link.label}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="active-indicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
