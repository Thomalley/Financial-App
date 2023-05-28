import React from 'react';
import useStyles from './styles';

function Home() {
  const styles = useStyles();

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.home}>
        <img className={styles.image} src="/logo_example.png" alt="Tubesoft logo" />
        <div className={styles.homeLink}>
          <a href="/login">Login</a>
          <a href="/register">Registarse</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
