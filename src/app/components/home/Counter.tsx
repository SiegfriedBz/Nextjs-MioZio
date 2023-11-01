'use client'

import Countdown from 'react-countdown'

const Counter = () => {
  return <Countdown date={Date.now() + 3600 * 24 * 1000} />
}

export default Counter
