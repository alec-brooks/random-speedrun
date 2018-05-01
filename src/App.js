import React, { Component } from 'react';
import { chain } from 'lodash';
import Title from './components/Title';
import EmbeddedVideo from './components/EmbeddedVideo';

const getRandomIntWithMax = maxInt => Math.floor(Math.random() * maxInt);

const fetchAdditionalGameCount = async (currentAmountOfGames) => {
  const response = await fetch(`https://www.speedrun.com/api/v1/games?_bulk=yes&max=1000&offset=${currentAmountOfGames}`);
  const json = await response.json();
  return json.pagination.size;
};

const fetchGamesAtIndex = async (gameNumber) => {
  const response = await fetch(`https://www.speedrun.com/api/v1/games?offset=${gameNumber}`);
  const json = await response.json();
  return json.data;
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
    .filter(({ videos: links }) => links)
    .map(({ videos: { links }, category }) => ({ video: links[0].uri, categoryId: category }))
    .value();


const findGameWithVideos = async ([game, ...games]) => {
  const { id, names: { international } } = game;
  const records = await fetchRecordsForGame(id);
  const runsWithVideos = getRunsWithVideos(records);
  if (runsWithVideos.length) {
    const randomGamesIndex = getRandomIntWithMax(runsWithVideos.length);
    const { video, categoryId } = runsWithVideos[randomGamesIndex];
    return video.length ? {
      video, categoryId, name: international,
    } : findGameWithVideos(games);
  }
  return findGameWithVideos(games);
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      numberOfGames: 12000,
      name: '',
      video: '',
      category: '',
    };
    this.accurateNumberOfGames = this.accurateNumberOfGames.bind(this);
    this.randomWR = this.randomWR.bind(this);
  }
  componentWillMount() {
    this.accurateNumberOfGames();
  }

  async accurateNumberOfGames() {
    this.setState({
      numberOfGames:
        this.state.numberOfGames + await fetchAdditionalGameCount(this.state.numberOfGames),
    });
  }

  async randomWR() {
    const gamesInFetch = 20;
    const randomGameNumber = getRandomIntWithMax(this.state.numberOfGames - gamesInFetch);
    const games = await fetchGamesAtIndex(randomGameNumber);
    const {
      name, video, categoryId,
    } = await findGameWithVideos(games);

    const category = await fetchCategoryNameById(categoryId);
    this.setState({
      name,
      video,
      category,
    });
  }
  render() {
    return (
      <div >
        <div>
          <Title gameName={this.state.name} category={this.state.category} />
          {this.state.video && <EmbeddedVideo videoUrl={this.state.video} />}
        </div>
        <button onClick={this.randomWR}>
          Get Random WR
        </button>
      </div >
    );
  }
}

export default App;
