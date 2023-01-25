import React from 'react'

import WheelSegment from '../../atoms/wheel-segment'

import './styles.css'

interface WheelProps {
  isPreviewMode?: boolean // TODO: Make it optional?
}

function Wheel({ isPreviewMode = false }: WheelProps) {
  const items = 10
  const value = 100 / items
  const colors = ['#FEC561', '#46967B']

  return (
    <div className="lottery-wheel">
      <div className="border">
        <div className="wheel">
          <div className="pie">
            {Array.from(Array(items).keys()).map((_, index) => {
              const offset = 100 / items + index * value
              const color = colors[index % 2]

              return <WheelSegment key={`wheel-segment-${offset}`} offset={offset} value={value} color={color} />
            })}
          </div>

          {!isPreviewMode && (
            <div className="center">
              <div className="avatar">
                <img src="/images/Lottery-Circle--Man.png" alt="" />
                {/* <span>?</span> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Wheel
