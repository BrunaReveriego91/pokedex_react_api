import React from "react";
import { Component } from "react/cjs/react.production.min";
import api from "./api";

class App extends Component {
  state = {
    pokemons: [],
    loading: true,
  };

  async componentDidMount() {
    const response = await api.get("pokemon/eevee");
    this.setState({ pokemons: [response.data], loading: false });
  }

  render() {
    const array = this.state;

    return (
      <div>
        <h1>Lista Pokémon:</h1>

        {array.pokemons.map((pokemon,index) => (
          pokemon.abilities.map((ab,index) => (
            <li key={index}>{ab.ability.name}</li>
          ))
          ))}
      </div>
    );
  }
}

export default App;
