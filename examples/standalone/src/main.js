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
    before: 0,
    after: 0,
    progress: 0,
  }

  componentDidMount() {
    this.update = this._update.bind(this)
    this.update()
  }

  _update() {
    const { data } = this.props
    let { before, after, progress } = this.state

    if (before < 60) {
      before += 1
    } else if (progress < data.length) {
      progress += 20
    } else if (after < 60) {
      after += 1
    } else {
      before = 0
      after = 0
      progress = 0
    }

    this.setState({ before, after, progress })
    requestAnimationFrame(this.update)
  }

  render() {
    const { data } = this.props
    const { progress } = this.state

    // track size is 65 instead of 50 in the bopomofo mode
    return (
      <Word data={data} color="#000" trackSize={400} progress={progress} />
    )
  }
}



// main
const zeros = (count) => {
  let ret = ''
  for(let i = 0; i < count; ++i) ret += '0'
  return ret
}

const padZeros = (width, str) => {
  if (width <= str.length) return str
  return zeros(width - str.length) + str
}

const draw = (element, data, show) =>
  render(
    <Overlay
      show={show}
      onClick={() => draw(element, data, false)}
    >
      <Modal>
        <WordPlayer data={data} />
      </Modal>
    </Overlay>,
    element
  )

global.zhStroker = (id, char) => {
  const element = document.getElementById(id)
  const [cp = ''] = punycode.ucs2.decode(char)
  const d = data[padZeros(4, cp.toString(16))] || stroke.empty

  if (d === stroke.empty) {
    console.warn(`stroke: ${char} not found`)
  }

  draw(element, d, true)
}
