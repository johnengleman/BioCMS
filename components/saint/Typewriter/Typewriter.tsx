'use client'

import { Typewriter } from 'react-simple-typewriter'

const TypeWriter = () => (
  <Typewriter
    words={[
      'Light in the Darkness.',
      'Pillar of Faith.',
      'Soldier for Christ.',
      'Temple of the Holy Spirit.',
      'Light to the World.',
      'Friend.',
    ]}
    deleteSpeed={20}
    delaySpeed={3000}
    loop
  />
)

export default TypeWriter
