import React from 'react'
import './App.css'
import GameComponent from './GameComponent'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'


function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="md">
        <GameComponent />
      </Container>
    </div>
  )
}

export default App
