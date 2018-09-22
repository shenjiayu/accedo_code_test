import React, { Component } from 'react';
import '../App.css';
// import utils from '../utils';

class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    this._handleImgOnLoad = this._handleImgOnLoad.bind(this);
  }

  _handleImgOnLoad(e) {
    this.setState({
      isLoading: false
    });

    // get the base64 data from the image save it to the localstorage
    // const imgData = utils.getBase64FromImage(e.target);
    
  }

  render() {
    const {
      movie,
      onfocus,
      onClick
    } = this.props;
    const { isLoading } = this.state;

    return (
      <div ref="app-movie-container" className={"app-movie-container" + (onfocus ? " app-movie-container-onfocus" : "")} onClick={ () => onClick() }>
        <div className="app-movie-placeholder">
          { isLoading ? <i className="fas fa-spinner fa-spin fa-lg"></i> : null }
          <img
            alt={ movie.title }
            src={ movie.images[0] ? movie.images[0].url : 'https://via.placeholder.com/214x317' }
            onLoad={ (e) => this._handleImgOnLoad(e) }
            onError={ (e) => { e.target.src = 'https://via.placeholder.com/214x317' } }
          />
        </div>
        <div><b>Title: </b>{ movie.title }</div>
      </div>
    );
  }
}

export default Movie;