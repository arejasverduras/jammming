import React from 'react';

export class SpotifyPlayer extends React.Component {
    render() {
        return (
            <div className='controlsContainer'>
                
        <button id="togglePlay">Play / Pause</button>
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
        <script>{
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = 'BQB2zaIw868nzSKW-A6iNSaSXIVpAYD535ZYjUAqT06CiBVxVEPaGBr_8a58yHUezD9W1IpuemJasOFUQvXUZ2ET-4klTE_MwGnjU8Axu8B_QYlqRWNQGvoRmnvu8O_nuKrMPrFKt3u9q6sd0Y_1EwxNXMYFE5M';
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('initialization_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('authentication_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('account_error', ({ message }) => {
                console.error(message);
            });

            document.getElementById('togglePlay').onclick = function() {
              player.togglePlay();
            };

            player.connect();
        }}
            </script>
            </div>
        )
    }
}