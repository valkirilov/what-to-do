import React from 'react'

import './styles.css'

import Header from '../../components/organisms/header'
import Wheel from '../../components/organisms/wheel'

function AskPage() {
  return (
    <>
      <Header />

      <main>
        <section id="wheel">
          <Wheel />
        </section>

        <section id="ask-question">
          <h1>You need help?</h1>
          <p>Sometimes you have a lot of things on your mind and you cannot choose only one to do. We can help you..</p>
          <button type="button">Ask us now</button>
        </section>
      </main>
    </>
  )
}

export default AskPage
