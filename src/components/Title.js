import React from 'react';
import PropTypes from 'prop-types';

const padZeroes = num => (num < 10 ? `0${num}` : `${num}`);

const getMilliseconds = (num) => {
  const millisecondsString = Number(num % 1) !== 0
    ? Number((num % 1).toFixed(3)).toString().split('.')[1]
    : '';
  return millisecondsString ? `.${millisecondsString}` : '';
};

export const formatTime = (runTime) => {
  const hours = Math.floor(runTime / 3600);
  const minutes = Math.floor((runTime - (hours * 3600)) / 60);
  const seconds = Math.round(runTime - (hours * 3600) - (minutes * 60));
  const millisecondsString = getMilliseconds(runTime);
  const hhmmss = [hours, minutes, seconds].reduce(
    (acc, timeUnit) => (timeUnit > 0 ? [...acc, padZeroes(timeUnit)] : acc)
    , [],
  ).join(':');
  return `${hhmmss}${millisecondsString || ''}`;
};

const Title = ({ gameName, category, time }) => gameName && category && time &&
  <p>{gameName} - {category} in {formatTime(time)}</p>;

Title.propTypes = {
  gameName: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

export default Title;
