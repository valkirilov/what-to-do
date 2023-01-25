import React from 'react'

import './styles.css'

interface WheelSegmentProps {
  offset: number
  value: number
  color: string
}

function WheelSegment(props: WheelSegmentProps) {
  const { offset, value, color } = props

  return (
    <div
      className="segment"
      data-label="Pizza"
      style={
        {
          '--offset': offset,
          '--value': value,
          '--bg': color,
        } as React.CSSProperties
      }
      key={`segment-${offset}`}
    />
  )
}

export default WheelSegment
