import React from 'react';

import styles from './Modal.css';



function Modal({ id, className, children }) {
  const classes = `${styles.className} modal ${className || ''}`;

  return (
    <div id={id} className={classes}>
      { children }
    </div>
  );
}



export default Modal;
