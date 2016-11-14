import React, { Component } from 'react'

import styles from './Modal.css'



class Modal extends Component {
  render() {
    const { id, className, children } = this.props
    const classes = `${styles.className} modal ${className || ''}`

    return (
      <div id={id} className={classes}>
        { children }
      </div>
    )
  }
}



export default Modal
