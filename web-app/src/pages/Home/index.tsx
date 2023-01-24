import React from 'react'

import './styles.css'

import Header from '../../components/organisms/header'

function HomePage() {
  const items = 10
  const value = 100 / items
  const colors = ['#FEC561', '#46967B']

  return (
    <div className="App">
      <Header />

      <main>
        <section id="wheel">
          <div className="lottery-wheel">
            <div className="border">
              <div className="wheel">
                <div className="pie">
                  {Array.from(Array(items).keys()).map((_, index) => {
                    const offset = 100 / items + index * value
                    const color = colors[index % 2]

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
                  })}
                </div>

                <div className="center">
                  <div className="avatar">
                    {/* <img src="/images/Lottery-Circle--Man.png" alt="" /> */}
                    <span>?</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="intro">
          <h1>You need help?</h1>
          <p>Sometimes you have a lot of things on your mind and you cannot choose only one to do. We can help you..</p>
          <button type="button">As us now</button>
          <img src="/images/Intro-Man.png" className="intro-man" alt="" />
        </section>
      </main>
    </div>
  )
}

export default HomePage
