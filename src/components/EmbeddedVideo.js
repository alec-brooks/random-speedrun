import React from 'react';
import PropTypes from 'prop-types';
import Youtube from 'react-youtube';
import Twitch from 'react-twitch-embed-video';
import videoUrlParser from 'js-video-url-parser';

const EmbeddedVideo = ({ videoUrl }) => {
  const { provider, id } = videoUrlParser.parse(videoUrl);
  switch (provider) {
    case 'youtube':
      return <Youtube videoId={id} />;
    case 'twitch':
      return <Twitch video={id} />;
    default:
      return videoUrl;
  }
};
EmbeddedVideo.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default EmbeddedVideo;

