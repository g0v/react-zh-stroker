import React, { Component } from 'react'
import { render } from 'react-dom'

import Overlay from './Overlay'
import Modal from './Modal'
import { Word } from 'react-zh-stroker'
import computeLength from 'react-zh-stroker/lib/data/computeLength'
import data from 'react-zh-stroker/json/840c.json'
const moe = computeLength(data)



class WordPlayer extends Component {
  state = {
    progress: 0
  }

  componentDidMount() {
    console.log('mount')
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



global.zhStroker = (id) => {
  const element = document.getElementById(id)
  render(
    <Overlay show={true}>
      <Modal>
        <WordPlayer data={moe} />
      </Modal>
    </Overlay>,
    element
  )
}
