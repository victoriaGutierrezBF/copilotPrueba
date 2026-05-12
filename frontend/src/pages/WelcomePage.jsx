import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import styles from './WelcomePage.module.css';

export default function WelcomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.logo}>CP</span>
          <span className={styles.brandName}>CopilotPrueba</span>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Cerrar sesión
        </button>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>{user ? user[0].toUpperCase() : 'U'}</div>
          </div>
          <h1 className={styles.greeting}>¡Bienvenido, {user}!</h1>
          <p className={styles.message}>
            Has iniciado sesión correctamente. Tu sesión está activa y el token JWT ha sido
            almacenado de forma segura.
          </p>
          <div className={styles.badge}>
            <span className={styles.dot} />
            Sesión activa
          </div>
        </div>
      </main>
    </div>
  );
}
