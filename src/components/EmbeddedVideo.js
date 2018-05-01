import React from 'react';
import PropTypes from 'prop-types';
import Youtube from 'react-youtube';
import Twitch from 'react-twitch-embed-video';
import videoUrlParser from 'js-video-url-parser';

const EmbeddedVideo = ({ videoUrl }) => {
  const parsedUrl = videoUrlParser.parse(videoUrl);

  if (parsedUrl && parsedUrl.mediaType === 'video') {
    switch (parsedUrl.provider) {
      case 'youtube':
        return <Youtube videoId={parsedUrl.id} />;
      case 'twitch':
        return <Twitch video={parsedUrl.id} />;
      default:
        return <a href={videoUrl}>{videoUrl}</a>;
    }
  }
  return <a href={videoUrl}>{videoUrl}</a>;
};
EmbeddedVideo.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default EmbeddedVideo;

