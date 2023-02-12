import React from 'react'

import './styles.css'

import Header from '../../components/organisms/header'
import Wheel from '../../components/organisms/wheel'
import Cloud, { CloudVariant } from '../../components/atoms/cloud'

function HomePage() {
  return (
    <>
      <Header />

      <main>
        <div className="container main-section">
          <section id="wheel">
            <Wheel isPreviewMode />
          </section>

          <section id="intro">
            {/* TODO: Export me to separate component */}
            <div className="decorations">
              <Cloud id="cloud-decoration-1" position={{ top: -30, left: -8 }} color="#edebd8" />
              <Cloud id="cloud-decoration-2" position={{ top: -10, left: 50 }} variant={CloudVariant.Two} />
              <Cloud
                id="cloud-decoration-3"
                position={{ top: -5, left: 130 }}
                variant={CloudVariant.Two}
                color="#edebd8"
                size={50}
              />

              <Cloud id="cloud-decoration-4" position={{ top: -20, right: -8 }} />
              <Cloud
                id="cloud-decoration-5"
                position={{ top: -20, right: 50 }}
                variant={CloudVariant.Two}
                color="#edebd8"
                size={180}
              />
            </div>
            <div className="content">
              <h1>Do you need help?</h1>
              <p>
                {/* Sometimes you have a lot of things on your mind and you cannot choose only one to do. We can help you.. */}
                Whether you&apos;re struggling to choose what to eat for dinner, or can&apos;t decide on your next
                career move, we&apos;re here to help. <br />
                <br />
                Just ask us a question and provide your options, and we&apos;ll pick one for you.
              </p>
              <div className="actions">
                <button type="button" className="primary">
                  Ask now
                </button>
                <button type="button" className="secondary">
                  Learn more
                </button>
              </div>
            </div>
            <img src="/images/Intro-Man.png" className="intro-man" alt="" />
          </section>
        </div>
      </main>
    </>
  )
}

export default HomePage
