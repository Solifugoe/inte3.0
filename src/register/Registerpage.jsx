import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import '../register/registerpage.css';
import { auth, db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const Registerpage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar la información del usuario en Firestore
      await setDoc(doc(db, 'datos_usuario', user.uid), {
        nombre: nombre,
        email: email,
        uid: user.uid
      });

      console.log('User registered:', user);
      registro();
    } catch (error) {
      setError(error.message);
      console.error('Error registering user:', error);
    }
  };

  const registro = () => {
    Swal.fire({
      title: '¡Registro exitoso!',
      text: 'Tu cuenta ha sido creada con éxito',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Registro</h1>
        {error && <p className="error-message" style={{color: "red"}}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre del Usuario</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Registerpage;
