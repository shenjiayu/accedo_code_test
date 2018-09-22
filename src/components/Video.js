import React, { Component } from 'react';

class Video extends Component {

  render() {
    const { src } = this.props;
    return (
      <video
        className="app-video"
        ref="videoRef"
        src={ src }
        type="video/mp4"
        controls
        onEnded={ () => this.refs.videoRef.webkitExitFullScreen() }
      >
      </video>
    );
  }
}

export default Video;