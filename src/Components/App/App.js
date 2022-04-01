
import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {
          id: 1,
          name: 'the beach',
          artist: 'splendid',
          album: 'skeffah'
      },{
        id: 2,
        name: 'Animal wisdom',
        artist: 'Brian Jonestown Massacre',
        album: 'Something else'
      },{
        id: 3,
        name: 'In the shade of the Mango Tree',
        artist: 'Luiz Bonfa',
        album: 'The Brazilian Scene'
      }
    ]
    }
  }
  render() {
    return (
    <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar />
      <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} />
        <Playlist />
      </div>
    </div>
  </div>
    )
  }
}

export default App;
