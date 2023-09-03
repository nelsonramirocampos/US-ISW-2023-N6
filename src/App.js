import React from 'react';
import './App.css'; // Puedes importar tus estilos personalizados si los tienes
import Header from './components/Header'; // Importa el componente de encabezado
import Footer from './components/Footer'; // Importa el componente de encabezado
import FormularioPedido from './components/FormularioPedido';

function App() {
  return (
    <div className="App">
      <Header />
      <FormularioPedido />
      <Footer />
    </div>
  );
}

export default App;
