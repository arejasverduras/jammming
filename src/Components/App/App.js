
import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify  from '../../util/Spotify';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
    playlistName: "",
    playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    })
  }

  addTrack(track){
    //the track argument is filled by the this.props.track?
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => 
      savedTrack.id === track.id
    )) {
      return;
    }
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  
    removeTrack(track) {
      let tracks = this.state.playlistTracks;
      let trackId = tracks.findIndex( (item )=> item.id === track.id);
      tracks.splice(trackId,1);
      this.setState({playlistTracks: tracks});
    }

    updatePlaylistName (name) {
      this.setState({playlistName: name})
    }

    savePlaylist() {
      const trackURIs = this.state.playlistTracks.map(track => 
        track.uri); 
        Spotify.savePlaylist(this.state.playlistName, trackURIs).then(()=>{
          this.setState({
            playlistName: "New playlist",
            playlistTracks: []})  
        
        })
        
      
    }

  render() {
    return (
    <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      {/* <SpotifyPlayer /> */}
      <SearchBar
        onSearch={this.search} />
      <div className="App-playlist">
        <SearchResults 
        searchResults={this.state.searchResults} 
        onAdd={this.addTrack}
        />
        <Playlist playlistName={this.state.playlistName} 
        playlistTracks={this.state.playlistTracks}
        onRemove={this.removeTrack}
        onNameChange={this.updatePlaylistName}
        onSave={this.savePlaylist}
        />
      </div>
    </div>
  </div>
    )
  }
}

export default App;
