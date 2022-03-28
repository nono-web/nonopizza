import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Styles from '../../styles/Login.module.css';

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

   const handleClick = async () => {
    try {
      await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.wrapper}>
        <h1>Tableau de Bord Admin</h1>
        <input
          placeholder="Pseudo"
          className={Styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="mot de passe"
          type="password"
          className={Styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={Styles.button}>
          Connection
        </button>
        {error && <span className={Styles.error}>Mauvais mot de passe ou pseudo</span>}
      </div>
    </div>
  );
};

export default Login;
