import React from 'react';
import Formulario from './components/Formulario'; // Asegúrate de proporcionar la ruta correcta a tu componente Formulario
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
