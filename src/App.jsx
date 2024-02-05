import React, { useState } from 'react';
import MiApi from "./components/MiApi";
import Buscador from "./components/Buscador";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [pokemones, setPokemones] = useState([]);

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1>Lista de Pokémon</h1>
          </div>
        </div>
        <Buscador setPokemones={setPokemones} />
        <MiApi pokemones={pokemones} cantidadPokemones={100} />
      </div>
    </>
  );
}

export default App;