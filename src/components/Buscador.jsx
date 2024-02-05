import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


const Buscador = ({ setPokemones, initialPokemonList }) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [filteredPokemones, setFilteredPokemones] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [emptySearch, setEmptySearch] = useState(false);

  useEffect(() => {
    setFilteredPokemones(initialPokemonList);
    setNotFound(false);
  }, [initialPokemonList]);

  const handleBusquedaChange = (event) => {
    setTerminoBusqueda(event.target.value);
    setNotFound(false);
    setEmptySearch(false);
  };

  const handleBusquedaSubmit = async (event) => {
    event.preventDefault();

    if (!terminoBusqueda) {
      setEmptySearch(true);
      setNotFound(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${terminoBusqueda.toLowerCase()}`
      );
      setFilteredPokemones([response.data]);
      setNotFound(false);
      setEmptySearch(false);
    } catch (error) {
      console.error("Error al buscar Pokémon:", error.message);
      setFilteredPokemones([]);
      setNotFound(true);
      setEmptySearch(false);
    }
  };

  const handleClearSearch = () => {
    setTerminoBusqueda("");
    setFilteredPokemones(initialPokemonList);
    setNotFound(false);
    setEmptySearch(false);
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Buscador de Pokémon</h2>
      <form onSubmit={handleBusquedaSubmit} className="d-flex justify-content-center">
        <div className="input-group">
          <input
            type="text"
            id="busqueda"
            className="form-control"
            placeholder="Nombre del Pokémon"
            value={terminoBusqueda}
            onChange={handleBusquedaChange}
          />
          <button className="btn btn-primary" type="submit">
            Buscar
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleClearSearch}
          >
            Limpiar
          </button>
        </div>
      </form>
      {emptySearch && (
        <div className="alert alert-warning text-center mt-3" role="alert">
          Por favor, ingrese el nombre del Pokémon que desea buscar.
        </div>
      )}
      {notFound && (
        <div className="alert alert-danger text-center mt-3" role="alert">
          El Pokémon no fue encontrado. ¡Intenta con otro nombre!
        </div>
      )}
      {filteredPokemones && filteredPokemones.length > 0 && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            {filteredPokemones.map((pokemon) => (
              <div key={pokemon.name} className="card mb-3">
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="card-img-top"
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-center font-weight-bold mt-2">{pokemon.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Buscador;
