import React, { Component } from 'react'

import styles from './Overlay.css'



class Overlay extends Component {
  render() {
    const { id, className, children, show } = this.props
    const classes = `${styles.className} overlay ${className || ''}`

    return (
      !!show &&
        <div className={classes}>
          <div className="overlay__backdrop" />
          { children }
        </div>
    )
  }
}



export default Overlay
