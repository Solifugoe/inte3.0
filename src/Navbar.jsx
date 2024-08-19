import React, { useState, useEffect } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signOut } from './firebaseConfig/firebase';
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebaseConfig/firebase';

export const Navbar = () => {
  const navigate = useNavigate();
  const handleLogoHome = () => {
    navigate('/');
  };

  const [user] = useAuthState(auth);
  const [userName, setUserName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth).catch(error => {
      console.error('Error signing out: ', error);
    });
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const userDocRef = doc(db, 'datos_usuario', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserName(userDoc.data().nombre);
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUserName();
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="src/assets/images/logo3.png" alt="Logo" onClick={handleLogoHome}/>
      </div>
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>


        {user ? (
          <div className={`navbar-user ${isOpen ? '' : 'desktop'}`}>
            <span className="navbar-username">Hola, {userName} !</span>
            {user && <Link to="/graficas" onClick={closeMenu}>Graficas</Link>}
            <span className="navbar-signouting" onClick={handleSignOut}>Cerrar Sesion</span>
          </div>
        ) : (
          <>
            <Link to="/login" className="navbar-signin" onClick={closeMenu}>Iniciar Sesion</Link>
            <Link to="/register" className="navbar-signup" onClick={closeMenu}>Registrarse</Link>
          </>
        )}
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
