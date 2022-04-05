const clientID = 'df3bf367945c41c49b4f5e1d9de975b3';
const redirectURI = "http://localhost:3000/";

let userAccessToken;

const Spotify = {
    getAccessToken () {
        if (userAccessToken) {
            return userAccessToken;
        }
//      check if response url contains accesstoken
        let urlString = window.location.href;

        const accesTokenMatch = urlString.match('/access_token=([^&]*)/');
        const expiresInMatch =  urlString.match('/expires_in=([^&]*)/')
        
        if (accesTokenMatch && expiresInMatch)       
            {
                userAccessToken = accesTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);
                
                window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return userAccessToken;
            } else {
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
                window.location = accessUrl;
            }
            
    },
    search(searchTerm) {
        //accepts search term input paramter
        //pass the search term value (term) to a Spotify Request
        fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {
                Authorization: `Bearer${userAccessToken}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
            //code to execute with jsonReeponse
            // return the response as a list of tracks in json format
            console.log(jsonResponse);
            let arrayOfTracks = [];
            
            if (jsonResponse.tracks) {
            arrayOfTracks = 
            jsonResponse.map(resTrack => {
                const track = {
                  ID: resTrack.id,
                  Name: resTrack.name,
                  Artist: resTrack.artists[0].name,
                  Album: resTrack.album.name,
                  URI: resTrack.uri
                }
                return track;
            })
        }
            return arrayOfTracks;
        })    
    }  
};

export default Spotify;