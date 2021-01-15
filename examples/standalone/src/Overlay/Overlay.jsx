import React from 'react';

import styles from './Overlay.css';



function Overlay({ id, className, children, show, onClick }) {
  const classes = `${styles.className} overlay ${className || ''}`;

  return (
    !!show &&
      <div className={classes}>
        <div className="overlay__backdrop" onClick={onClick} />
        { children }
      </div>
  );
}



export default Overlay;
