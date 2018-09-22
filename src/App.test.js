import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// components
import App from './App';
import Movie from './components/Movie';
import Video from './components/Video';

// apis
import apis from './apis';

describe('App', function () {
  describe('renders the <Video /> component which contains one video tag', () => {
    const wrapper = shallow(<Video />);
    expect(wrapper.find('.app-video').length).toEqual(1);
  });
  
  describe('renders the <Movie /> comopnent where isLoading should be equal to true', () => {
    const movie = {
      title: 'test',
      images: [
        {
          url: 'test_url'
        }
      ]
    };
    const wrapper = shallow(<Movie movie={ movie } />);
    expect(wrapper.state().isLoading).toEqual(true);
    
    it('should have one img tag', () => {
      expect(wrapper.find('img').length).toEqual(1);
    });
    it('should have one b tag', () => {
      expect(wrapper.find('b').length).toEqual(1);
    });
  });

  describe('renders the <App \>', async () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().movies.length).toEqual(0);
    expect(wrapper.state().watchedMovies.length).toEqual(0);

    it('retrieves movies from the end point', async () => {
      await apis.movies_index()
          .then(data => {
            expect(data.entries.length).toEqual(30);
          });
    });

    it('clear the watchedMovies state in the App', () => {
      wrapper.find('.app-movies-clear-button').first().simulate('click');
      expect(wrapper.state().watchedMovies.length).toEqual(0);
    });
  });

});
