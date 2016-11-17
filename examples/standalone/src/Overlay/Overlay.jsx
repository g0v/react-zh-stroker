import React, { Component } from 'react'

import styles from './Overlay.css'



class Overlay extends Component {
  render() {
    const { id, className, children, show, onClick } = this.props
    const classes = `${styles.className} overlay ${className || ''}`

    return (
      !!show &&
        <div className={classes}>
          <div className="overlay__backdrop" onClick={onClick} />
          { children }
        </div>
    )
  }
}



export default Overlay
