import React from "react";
import { Component } from "react/cjs/react.production.min";
import PokeCard from "./components/PokeCard";
import './components/Pokedex.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      pokemonDetails: [],
      pokemonName: null,
      offset: 1,
      loadNumber: 24,
    };
    this.handleMoreClick = this.handleMoreClick.bind(this);
  }

  getNextOffset() {
    return this.state.offset + 1;
  }

  getPreviousOffset() {
    return this.state.offset - 1;
  }

  handleMoreClick(event) {
    const newOffset = this.getNextOffset();
    this.setState({ offset: newOffset }, () => {
      this.getMorePokemon();
    });
  }

  handleMinusClick(event) {
    if (this.state.offset > 1) {
      const oldOffset = this.getPreviousOffset();

      this.setState({ offset: oldOffset }, () => {
        this.getMorePokemon();
      });
    }
  }

  componentDidMount() {
    this.getMorePokemon();
  }

  getMorePokemon() {
    let url = "https://pokeapi.co/api/v2/pokemon/" + this.state.offset;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (this.state.pokemonDetails.length === 0) {
            var temp = this.state.pokemonDetails;
            temp.push(data);
            this.setState({ pokemonDetails: temp });
          } else {
            temp = this.state.pokemonDetails;
            temp.shift();
            temp.push(data);
            this.setState({ pokemonDetails: temp });
          }
        }
      })
      .catch(console.log);
  }

  render() {
    const { pokemonDetails } = this.state;

    const renderedPokemonList = pokemonDetails.map((pokemon, index) => {
      return <PokeCard pokemon={pokemon} />;
    });

    return (
      <div className="container">
        <div class="row">
          <div class="col-sm-6 col-md-6 col-lg-6 principal">
            <div class="principal-conteudo">
              <div class="circulo">
                <div class="col circulo-principal">
                  <div class="col circulo-principal2">
                    <div class="col circulo-principal3"></div>
                  </div>
                </div>

                <div class="col circulo-principal-pequeno">
                  <div class="circulo-principal-painel vermelho"></div>
                  <div class="circulo-principal-painel amarelo"></div>
                  <div class="circulo-principal-painel verde"></div>
                </div>
              </div>
              <div class="linha-principal">
                <div class="linha-principal-reta"></div>
                <div class="linha-principal-inclinada"></div>
                <div class="linha-principal-reta2"></div>
              </div>

              <div class="principal-baixo">
                <div class="principal-baixo-borda-superior"></div>
                <div class="principal-baixo-borda-superior-inclinada"></div>
                <div class="principal-baixo-borda-superior-reta"></div>

                <div class="principal-baixo-borda-superior-lateral"></div>

                <div class="linha-principal-lateral">
                  <div class="linha-principal-lateral-reta"></div>
                </div>

                <div class="col principal-visor">
                  <div class="col principal-visor2"></div>
                  <div>{renderedPokemonList}</div>
                  <div class="col principal-visor-corte"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-3 col-md-6 col-lg-6 principal"></div>
        </div>

   
        <button
          type="button"
          className="btn btn-secondary btn-block"
          key="minus-button"
          id="minus-button"
          onClick={this.handleMinusClick.bind(this)}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          key="more-button"
          id="more-button"
          onClick={this.handleMoreClick.bind(this)}
        >
          Next
        </button>
      </div>
    );
  }
}

export default App;
