import React from 'react';
import useStyles from './styles';

function PostRegister() {
  const styles = useStyles();

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.home}>
        <div className={styles.homeLink}>
          <h1>Porfavor espere a que le llegue un correo de verificacion</h1>
        </div>
      </div>
    </div>
  );
}

export default PostRegister;
