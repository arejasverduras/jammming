
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
    ],
    playlistName: "Michiel's Customs",
    playlistTracks: [
      {name: "One", artist: "AOne", album: "A-type", id: 1 },
      {name: "Two", artist: "ATwo", album: "A-type", id: 2 },
      {name: "Three", artist: "AThree", album: "A-type", id: 3 },
      {name: "Four", artist: "AFour", album: "A-type", id: 4 }
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
        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
      </div>
    </div>
  </div>
    )
  }
}

export default App;
