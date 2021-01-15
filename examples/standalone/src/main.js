import punycode from 'punycode'
import React, { useRef, useState, useCallback, useEffect } from 'react'
import { render } from 'react-dom'

import Overlay from './Overlay'
import Modal from './Modal'
import { data as D, Word } from 'react-zh-stroker'
import data from './data'



function WordPlayer({ data }) {
  const anime = useRef();
  const [before, setBefore] = useState(0);
  const [after, setAfter] = useState(0);
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    if (before < 60) {
      setBefore(before + 1);
    } else if (progress < data.length) {
      setProgress(progress + 20);
    } else if (after < 60) {
      setAfter(after + 1);
    } else {
      setBefore(0);
      setAfter(0);
      setProgress(0);
    }
    anime.current = requestAnimationFrame(update);
  }, [data, before, after, progress]);

  useEffect(() => {
    anime.current = requestAnimationFrame(update);
    return () => {
      if (!anime.current) return;
      cancelAnimationFrame(anime.current);
      anime.current = undefined;
    }
  }, [update]);

  // track size is 65 instead of 50 in the bopomofo mode
  return (
    <Word
      data={data}
      color="#000"
      trackSize={400}
      progress={progress}
    />
  );
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
  const d = data[padZeros(4, cp.toString(16))] || D.stroke.empty

  if (d === D.stroke.empty) {
    console.warn(`stroke: ${char} not found`)
  }

  draw(element, d, true)
}
