
import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';


export class App extends React.Component {

  render() {
    return (
    <div>
    <h1>Ja<span class="highlight">mmm</span>ing</h1>
    <div class="App">
      <SearchBar />
      <div class="App-playlist">
        {/* <!-- Add a SearchResults component -->
        <!-- Add a Playlist component --> */}
      </div>
    </div>
  </div>
    )
  }
}

export default App;
