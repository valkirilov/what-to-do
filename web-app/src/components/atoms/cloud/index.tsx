import React from 'react'

import './styles.css'

// Note: Keep those values in sync with the corresponding CSS classes
// TODO: Maybe move this to a separate file at some point?
export enum CloudVariant {
  One = 'cloud--variant-1',
  Two = 'cloud--variant-2',
}

interface CloudProps {
  id: string
  variant?: CloudVariant
  size?: number
  color?: string
  position: {
    top?: number
    left?: number
    right?: number
  }
}

function Cloud({ id, variant = CloudVariant.One, size = 100, color = '#ffffff', position }: CloudProps) {
  return (
    <div
      id={id}
      className={`cloud ${variant}`}
      style={
        {
          '--cloudColor': color,
          '--cloudSize': size,
          '--cloudPositionTopOffset': position.top,
          '--cloudPositionLeftOffset': position.left,
          '--cloudPositionRightOffset': position.right,
        } as React.CSSProperties
      }
    />
  )
}

export default Cloud
