import React, { Component } from 'react';

const fetchAdditionalGameCount = async (currentAmountOfGames) => {
  const response = await fetch(`https://www.speedrun.com/api/v1/games?_bulk=yes&max=1000&offset=${currentAmountOfGames}`);
  const json = await response.json();
  return json.pagination.size;
};

const fetchRandomGame = async (numberOfGames) => {
  const randomGameIndex = Math.floor(Math.random() * numberOfGames);
  const response = await fetch(`https://www.speedrun.com/api/v1/games?offset=${randomGameIndex}`);
  const json = await response.json();
  return json.data[0];
};

const fetchRandomRecordsForGame = async (gameId) => {
  const response = fetch(`https://www.speedrun.com/api/v1/games/${gameId}/records?top=1`);
  const json = await response.json();
  return json;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      numberOfGames: 12000,
      name: '',
      records: [],
    };
    this.getNumberOfGames = this.getNumberOfGames.bind(this);
    this.getRandomWR = this.getRandomWR.bind(this);
  }

  async getNumberOfGames() {
    this.setState({
      numberOfGames: this.state.numberOfGames + await fetchAdditionalGameCount(this.state.numberOfGames),
    });
  }
  async getRandomWR() {
    const { id, names: { international } } = await fetchRandomGame(this.state.numberOfGames);
    const records = await fetchRandomRecordsForGame(id);
    this.setState({
      records,
      name: international,
    });
  }
  render() {
    console.log(this.state.records);
    return (
      <div >
        <p>{this.state.numberOfGames}</p>
        <button onClick={this.getNumberOfGames}>
          Get number of Games
        </button>
        <p>{this.state.name}</p>
        <button onClick={this.getRandomWR}>
          Get Random WR
        </button>
      </div>
    );
  }
}

export default App;
