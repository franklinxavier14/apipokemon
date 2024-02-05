import React, { useState, useEffect } from "react";
import axios from "axios";

const MiApi = ({ pokemones, cantidadPokemones }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [showListHeader, setShowListHeader] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${cantidadPokemones}`
        );
        setPokemonList(response.data.results);
      } catch (error) {
        console.error("Error al obtener lista de Pokémon:", error.message);
      }
    };

    fetchPokemonList();
  }, [cantidadPokemones]);

  useEffect(() => {
    if (pokemones.length === 0) {
      setPokemonList([]);
      setShowListHeader(true);
    } else {
      setShowListHeader(false);
    }
  }, [pokemones]);

  const sortPokemonList = () => {
    const sortedList = [...pokemonList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setPokemonList(sortedList);
  };

  return (
    <div className="container my-5">
      {showListHeader && (
        <div>
          <h3 className="text-center mb-4">Lista de Pokémon</h3>
          <div className="d-flex justify-content-center mb-3">
            <button className="btn btn-primary" onClick={sortPokemonList}>
              Ordenar por nombre
            </button>
          </div>
        </div>
      )}
      <div className="row justify-content-center">
        {pokemones.length > 0 ? (
          pokemones.map((pokemon) => (
            <div key={pokemon.name} className="col-md-3 mb-3">
              <div className="card h-100 d-flex align-items-center">
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="card-img-top"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title font-weight-bold">{pokemon.name}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          pokemonList.map((pokemon) => (
            <div key={pokemon.name} className="col-md-3 mb-3">
              <div className="card h-100 d-flex align-items-center">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`}
                  alt={pokemon.name}
                  className="card-img-top"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title font-weight-bold">{pokemon.name}</h5>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MiApi;
