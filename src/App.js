import React, { Component } from 'react';
import { chain } from 'lodash';
import Title from './components/Title';
import EmbeddedVideo from './components/EmbeddedVideo';
import {
  fetchRecordsForGame,
  fetchAdditionalGameCount,
  fetchGamesAtIndex,
  fetchCategoryNameById,
} from './network';

const getRandomIntWithMax = maxInt => Math.floor(Math.random() * maxInt);

export const getRunsWithVideos = records =>
  chain(records)
    .map(({ runs }) => runs)
    .flatMap(runs =>
      runs.map(({ run: { videos, category, times } }) =>
        ({ videos, category, time: times && times.primary_t })))
    .filter(({ videos }) => videos)
    .filter(({ videos: links }) => links)
    .map(({ videos: { links }, category, time }) =>
      ({ video: links[0].uri, categoryId: category, time }))
    .value();

const findGameWithVideos = async ([game, ...games]) => {
  const { id, names: { international } } = game;
  const records = await fetchRecordsForGame(id);
  const runsWithVideos = getRunsWithVideos(records);
  if (runsWithVideos.length) {
    const randomGamesIndex = getRandomIntWithMax(runsWithVideos.length);
    const { video, categoryId, time } = runsWithVideos[randomGamesIndex];
    return video.length ? {
      video, categoryId, name: international, time,
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
      time: 0,
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
      name, video, categoryId, time,
    } = await findGameWithVideos(games);

    const category = await fetchCategoryNameById(categoryId);
    this.setState({
      name,
      video,
      category,
      time,
    });
  }
  render() {
    return (
      <div >
        <div>
          <Title gameName={this.state.name} category={this.state.category} time={this.state.time} />
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
