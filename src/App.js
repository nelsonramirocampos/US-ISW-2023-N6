import React from 'react';
import Formulario from './components/FormularioPedido';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header /> 
      <Formulario />
      <Footer /> 
    </div>
  );
}

export default App;
