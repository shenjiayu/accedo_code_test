import React, { Component } from 'react';
import './App.css';
import apis from './apis';
import utils from './utils';
import Movie from './components/Movie';
import Video from './components/Video';

class App extends Component {

  constructor(props) {
    super(props);

    // init the state with an empty array of movies
    this.state = {
      // states for movies carousel
      movies: [],
      totalCount: 0,
      onFocusIndex: -1,
      videoSrc: null,
      isRefreshing: false,

      // states for previously watched movies
      watchedMovies: [],
      onFocusWatchedIndex: -1
    };

    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleClickOnMovie = this._handleClickOnMovie.bind(this);
    this._openFullscreen = this._openFullscreen.bind(this);
    this._stopPlayer = this._stopPlayer.bind(this);
    this._refreshMovies = this._refreshMovies.bind(this);
    this._updateWatchedMovies = this._updateWatchedMovies.bind(this);
  }

  componentDidMount() {
    // listen to keydown event
    document.addEventListener('keydown', this._handleKeyDown);

    // listen to dbclick event
    document.addEventListener('dblclick', this._openFullscreen);
    
    // listen to esc click
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(event => {
      document.addEventListener(event, this._stopPlayer);
    });

    this._refreshMovies();

    // sync watched movies from localstorage if exists
    const watchedMovies = JSON.parse(utils.getItem('watchedMovies')) || [];
    this.setState({
      watchedMovies
    });
  }

  _handleKeyDown(e) {
    const {
      movies,
      onFocusIndex,
      watchedMovies,
      onFocusWatchedIndex
    } = this.state;
    let nextIndex;
    switch( e.keyCode ) {
      // move the focus indicator to left
      case 37:
        if (onFocusIndex === -1 && onFocusWatchedIndex !== -1) {
          nextIndex = onFocusWatchedIndex - 1;
          if (nextIndex >= 0) {
            this._handleClickOnMovie(nextIndex, 'history');
          }
        } else {
          nextIndex = onFocusIndex - 1;
          if (nextIndex >= 0) {
            this._handleClickOnMovie(nextIndex);
          }
        }
        break;
      case 38:
        if (onFocusIndex === -1) {
          this._handleClickOnMovie(0);
        }
        break;
      // move the focus indicator to right
      case 39:
        if (onFocusIndex === -1 && onFocusWatchedIndex !== -1) {
          nextIndex = onFocusWatchedIndex + 1;
          if (nextIndex <= watchedMovies.length - 1) {
            this._handleClickOnMovie(nextIndex, 'history');
          }
        } else {
          nextIndex = onFocusIndex + 1;
          if (nextIndex <= movies.length - 1) {
            this._handleClickOnMovie(nextIndex);
          }
        }
        break;
      case 40:
        if (onFocusWatchedIndex === -1 && watchedMovies.length > 0) {
          this._handleClickOnMovie(0, 'history');
        }
        break;
      // open the video in fullscreen
      case 13:
        const movie = (onFocusIndex !== -1) ? movies[onFocusIndex] : watchedMovies[onFocusWatchedIndex];
        this._updateWatchedMovies(movie, watchedMovies);
        break;
      default: 
        break;
    }
  }

  _handleClickOnMovie(index, type = 'index') {
    let movie;
    // make sure the onfocus movie is always within the view
    // push the newly watched movie into watchedMovies state
    // TODO need to check if url exists
    if (type === 'index') {
      this.refs[`movie-${index}`].refs['app-movie-container'].scrollIntoView();
      movie = this.state.movies[index];
    } else {
      this.refs[`watched-movie-${index}`].refs['app-movie-container'].scrollIntoView();
      movie = this.state.watchedMovies[index];
    }
    
    const url = movie.contents[0].url;
    if (type === 'index') {
      this.setState({
        onFocusIndex: index,
        onFocusWatchedIndex: -1,
        videoSrc: url
      });
    } else {
      this.setState({
        onFocusIndex: -1,
        onFocusWatchedIndex: index,
        videoSrc: url
      });
    }
  }

  _openFullscreen() {
    const elem = this.refs.videoContainerRef.refs.videoRef;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

  _stopPlayer() {
    const state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    if (!state) {
      this.refs.videoContainerRef.refs.videoRef.pause();
    }
  }

  _refreshMovies() {
    this.setState({
      isRefreshing: true
    });
    apis.movies_index()
      .then(data => {
        if (data !== undefined) {
          this.setState({
            movies: data.entries,
            totalCount: data.totalCount,
            isRefreshing: false
          });
        } else {
          this.setState({
            isRefreshing: false
          });
        }
      });
  }

  _clearHistory() {
    this.setState({
      watchedMovies: []
    });

    utils.setItem('watchedMovies', []);
  }

  _updateWatchedMovies(movie, watchedMovies) {
    // if the movie is at the head of the watchedMovies array
    // do nothing
    // else
    // remove it from the array and unshift to the head
    const i = watchedMovies.findIndex(m => {
      return m.title === movie.title;
    });
    if (i !== -1 && i !== 0) {
      watchedMovies.splice(i, 1);
      watchedMovies.unshift(movie);
    } else if (i === -1) {
      watchedMovies.unshift(movie);
    }

    this.setState({
      watchedMovies
    });

    // sync the updated watched movies into local storage
    utils.setItem('watchedMovies', watchedMovies);

    this._openFullscreen();
  }

  render() {
    // destructure the movies, onFocusIndex, and videoSrc from the state
    const {
      movies,
      onFocusIndex,
      videoSrc,
      isRefreshing,

      watchedMovies,
      onFocusWatchedIndex
    } = this.state;

    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Home</h1>
        </header>
        <div className="app-container">
          <div>
            <h1 className="app-movies-text">Movies</h1>
            <a className="app-movies-refresh-button" onClick={ () => this._refreshMovies() }><i className={"fas fa-sync-alt" + (isRefreshing ? " fa-spin" : "")}></i>REFRESH</a>
          </div>
          <div className="app-movies-list">
            { movies.length > 0 && movies.map((movie, index) => (
              <Movie
                ref={ `movie-${index}` }
                key={ index }
                movie={ movie }
                onfocus={ onFocusIndex === index ? true : false }
                onClick={ (e) => this._handleClickOnMovie(index) }
              />
            )) }
          </div>
          <div className="app-history">
            <h1 className="app-history-text">History</h1>
            <a className="app-movies-clear-button" onClick={ () => this._clearHistory() }><i className="fas fa-trash-alt"></i>CLEAR</a>
          </div>
          <div className="app-watched-movies-list">
            { watchedMovies.length > 0 && watchedMovies.map((movie, index) => (
              <Movie
                ref={ `watched-movie-${index}` }
                key={ index }
                movie={ movie }
                onfocus={ onFocusWatchedIndex === index ? true : false }
                onClick={ (e) => this._handleClickOnMovie(index, 'history') }
              />
            )) }
          </div>
        </div>
        <Video ref="videoContainerRef" src={ videoSrc } />
      </div>
    );
  }
}

export default App;
