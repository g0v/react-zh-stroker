import punycode from 'punycode'
import React, { Component } from 'react'
import { render } from 'react-dom'

import Overlay from './Overlay'
import Modal from './Modal'
import { Word } from 'react-zh-stroker'
import stroke from 'react-zh-stroker/lib/data/stroke'
import data from './data'



class WordPlayer extends Component {
  state = {
    progress: 0
  }

  componentDidMount() {
    this.update = this._update.bind(this)
    this.update()
  }

  _update() {
    const { data } = this.props
    let { progress } = this.state
    progress += 20

    this.setState({ progress })
    if (progress < data.length) {
      requestAnimationFrame(this.update)
    }
  }

  render() {
    const { data } = this.props
    const { progress } = this.state

    return (
      <Word data={data} color="#000" progress={progress} />
    )
  }
}



global.zhStroker = (id, char) => {
  const element = document.getElementById(id)
  const [cp = ''] = punycode.ucs2.decode(char)
  const d = data[cp.toString(16)] || stroke.empty

  if (d === stroke.empty) {
    console.warn(`stroke: ${char} not found`)
  }

  render(
    <Overlay show={true}>
      <Modal>
        <WordPlayer data={d} />
      </Modal>
    </Overlay>,
    element
  )
}
