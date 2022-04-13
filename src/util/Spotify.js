const clientID = 'df3bf367945c41c49b4f5e1d9de975b3';
const redirectURI = 'https://arejas_jammming.surge.sh/';

let userAccessToken;

const Spotify = {
    getAccessToken () {
        if (userAccessToken) {
            return userAccessToken;
        }
//      check if response url contains accesstoken
        let urlString = window.location.href;

        const accesTokenMatch = urlString.match(/access_token=([^&]*)/);
        const expiresInMatch =  urlString.match(/expires_in=([^&]*)/);
        
        if (accesTokenMatch && expiresInMatch)       
            {
                userAccessToken = accesTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);
                
                window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return userAccessToken;
            } else {
                const scope = encodeURIComponent('playlist-modify-public streaming');
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=${scope}&redirect_uri=${redirectURI}`;
                window.location = accessUrl;
                
            }
            
    }
    ,
    async search(term) {
        //get the accessToken first!
        const accessToken = await Spotify.getAccessToken();

        //pass the search term value (term) to a Spotify Request
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
                return response.json();
        }).then(jsonResponse => {
            //code to execute with jsonReeponse
            // return the response as a list of tracks in json format
           if (!jsonResponse.tracks) {
               console.log('this happens');
               return [];
           }
            return jsonResponse.tracks.items.map(track => (
                {
                  id: track.id,
                  name: track.name,
                  artist: track.artists[0].name,
                  album: track.album.name,
                  uri: track.uri
                }) 
            )
        });    
    },
    

    async savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {          
            return;
        }
        let currentAccessToken = Spotify.getAccessToken();
        let headers = {
            Authorization: `Bearer ${currentAccessToken}`
        };
        let userId;

        //get userId
        await fetch(`https://api.spotify.com/v1/me`, {
            headers : headers
        }).then(response => 
            {
                if (response.ok) {
                return response.json()
            }
            throw new Error('Request Failed!');
        }, networkError=>{
            console.log(networkError.message);
        }
            
        ).then(jsonResponse => {   
            userId = jsonResponse.id;
            console.log(userId);
            
        })

        //make post request to create a new playlist and returns a playlist id
        const urlToFetch = `https://api.spotify.com/v1/users/${userId}/playlists`;
        let addPlaylistHeaders = 
            {
                Authorization: `Bearer ${currentAccessToken}`,
                'Content-Type': 'application/json',
            }

        
        let playlistID;

        await fetch(urlToFetch, {
            method: 'POST',
            headers: addPlaylistHeaders,  
            body: JSON.stringify({name: name})
        }).then(
        response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request Failed!');
        }, networkError => console.log(networkError.message)
        ).then(
            jsonResponse => {
                console.log(jsonResponse);
                playlistID = jsonResponse.id;
                console.log(playlistID);
            }
        )

         //make post request to add tracks to the playlist (array)   
            const urlToAddTracks = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
            const instructions = {
                method: 'POST',
                headers: addPlaylistHeaders,
                body: JSON.stringify({uris: trackUris})
            }

            await fetch(urlToAddTracks, instructions).then(
                response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Request failed!')
                }, networkError => {
                    console.log(networkError.message)
                }
                
            ).then(
                jsonResponse => {
                    console.log(jsonResponse);
                    playlistID = jsonResponse.id
                    console.log(playlistID);
                }
            )

    }
};

export default Spotify;