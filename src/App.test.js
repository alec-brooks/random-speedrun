import { getRunsWithVideos } from './App';

describe('getRunsWithVideos', () => {
  const sampleData = [{
    runs: [{
      run: {
        category: 'any%',
        videos: { links: [{ uri: 'https://www.twitch.tv/raptordaraptor/v/82702585' }] },
      },
    }],
  }, {
    runs: [{
      run: {
        category: '100%',
        videos: { links: [{ uri: 'https://www.twitch.tv/raptordaraptor/v/81625668' }] },
      },
    }],
  }, {
    runs: [{
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
      { categoryId: 'any%', video: 'https://www.twitch.tv/raptordaraptor/v/82702585' },
      { categoryId: '100%', video: 'https://www.twitch.tv/raptordaraptor/v/81625668' },
    ]);
  });
});

