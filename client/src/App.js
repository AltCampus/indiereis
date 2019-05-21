import React, { Component } from 'react';
import './stylesheets/index.scss';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import CountryInput from './components/CountryInput';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Hero />
        <CountryInput />
        <Footer />
      </div>
    );
  }
}

export default App;
