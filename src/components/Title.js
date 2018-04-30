import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ gameName, category }) => gameName && category && <p>{gameName} - {category}</p>;
Title.propTypes = {
  gameName: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Title;
