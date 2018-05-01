import { getRunsWithVideos } from './App';

describe('getRunsWithVideos', () => {
  const sampleData = [{
    runs: [{
      run: {
        category: 'any%',
        times: { primary_t: 432.1 },
        videos: { links: [{ uri: 'https://www.twitch.tv/raptordaraptor/v/82702585' }] },
      },
    }],
  }, {
    runs: [{
      run: {
        category: '100%',
        times: { primary_t: 123.4 },
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
      { categoryId: 'any%', video: 'https://www.twitch.tv/raptordaraptor/v/82702585', time: 432.1 },
      { categoryId: '100%', video: 'https://www.twitch.tv/raptordaraptor/v/81625668', time: 123.4 },
    ]);
  });
});

