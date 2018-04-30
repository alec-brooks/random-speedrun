import React, { Component } from 'react';
import { chain } from 'lodash';

const getRandomIntWithMax = maxInt => Math.floor(Math.random() * maxInt);

const fetchAdditionalGameCount = async (currentAmountOfGames) => {
  const response = await fetch(`https://www.speedrun.com/api/v1/games?_bulk=yes&max=1000&offset=${currentAmountOfGames}`);
  const json = await response.json();
  return json.pagination.size;
};

const fetchGameByNumber = async (gameNumber) => {
  const response = await fetch(`https://www.speedrun.com/api/v1/games?offset=${gameNumber}`);
  const json = await response.json();
  return json.data[0];
};

const fetchRecordsForGame = async (gameId) => {
  const response = await fetch(`https://www.speedrun.com/api/v1/games/${gameId}/records?top=1`);
  const json = await response.json();
  return json.data;
};

const fetchCategoryNameById = async (categoryId) => {
  const response = await fetch(`https://www.speedrun.com/api/v1/categories/${categoryId}`);
  const json = await response.json();
  return json.data.name;
};

export const getRunsWithVideos = records =>
  chain(records)
    .map(({ runs }) => runs)
    .flatMap(runs =>
      runs.map(({ run: { videos, category } }) =>
        ({ videos, category })))
    .filter(({ videos }) => videos)
    .map(({ videos: { links }, category }) => ({ video: links[0].uri, categoryId: category }))
    .value();

class App extends Component {
  constructor() {
    super();
    this.state = {
      numberOfGames: 12000,
      name: '',
      video: '',
      category: '',
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
    const randomGameNumber = getRandomIntWithMax(this.state.numberOfGames);
    const { id, names: { international } } = await fetchGameByNumber(randomGameNumber);
    const records = await fetchRecordsForGame(id);
    const runsWithVideos = getRunsWithVideos(records);
    const { video, categoryId } = runsWithVideos[getRandomIntWithMax(runsWithVideos.length)];
    const category = await fetchCategoryNameById(categoryId);
    this.setState({
      name: international,
      video,
      category,
    });
  }
  render() {
    return (
      <div >
        <p>{this.state.numberOfGames}</p>
        <button onClick={this.getNumberOfGames}>
          Get number of Games
        </button>
        <p>{this.state.name} - {this.state.category}</p>
        <button onClick={this.getRandomWR}>
          Get Random WR
        </button>
        <p>{this.state.video}</p>
      </div>
    );
  }
}

export default App;
