import React from 'react';
import ReactDOM from 'react-dom';
import App, { getRunsWithVideos } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
describe('getRunsWithVideos', () => {
  const sampleData = [{
    runs: [{
      place: 1,
      run: {
        id: '0y6vp7qm',
        videos: { links: [{ uri: 'https://www.twitch.tv/raptordaraptor/v/82702585' }] },
      },
    }],
  }, {
    runs: [{
      place: 1,
      run: {
        id: '1zxwr48m',
        videos: { links: [{ uri: 'https://www.twitch.tv/raptordaraptor/v/81625668' }] },
      },
    }],
  }, {
    runs: [{
      place: 1,
      run: {
        id: '0znor47y',
        videos: null,
      },
    }],
  }, {
    runs: [],
  }];
  it('should get runs with records', () => {
    expect(getRunsWithVideos(sampleData)).toEqual([
      'https://www.twitch.tv/raptordaraptor/v/82702585',
      'https://www.twitch.tv/raptordaraptor/v/81625668',
    ]);
  });
});

