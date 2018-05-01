export const fetchAdditionalGameCount = async (currentAmountOfGames) => {
  const response = await fetch(`https://www.speedrun.com/api/v1/games?_bulk=yes&max=1000&offset=${currentAmountOfGames}`);
  const json = await response.json();
  return json.pagination.size;
};

export const fetchGamesAtIndex = async (gameNumber) => {
  const response = await fetch(`https://www.speedrun.com/api/v1/games?offset=${gameNumber}`);
  const json = await response.json();
  return json.data;
};

export const fetchRecordsForGame = async (gameId) => {
  const response = await fetch(`https://www.speedrun.com/api/v1/games/${gameId}/records?top=1`);
  const json = await response.json();
  return json.data;
};

export const fetchCategoryNameById = async (categoryId) => {
  const response = await fetch(`https://www.speedrun.com/api/v1/categories/${categoryId}`);
  const json = await response.json();
  return json.data.name;
};
