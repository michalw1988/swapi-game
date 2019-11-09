import React from 'react';
import './App.css';
import MainComponent from './MainComponent/MainComponent';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="md">
        <MainComponent />
      </Container>
    </div>
  );
}

export default App;
