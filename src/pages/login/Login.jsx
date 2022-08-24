import React, {useState} from 'react'
import axios from 'axios';

const Login = () => {

const getHashParams = () => {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
        }
        return (hashParams);
        
       
}

const topTracksLorde = (token) => {
    // setTracks(tracks => []);
    let limit = 2
    let searchArtistUrl = new URL("https://api.spotify.com/v1/search?q="+ search +"&limit="+ limit +"&type=artist&country=BR");
    let searchAlbumUrl = new URL("https://api.spotify.com/v1/search?q="+ search +"&limit="+ limit +"&type=album&country=BR");
    let searchTrackUrl = new URL("https://api.spotify.com/v1/search?q="+ search +"&limit="+ limit +"&type=track&country=BR");

    axios
    .get(searchArtistUrl,
      { headers: {
        Authorization: `Bearer ${token}`
        }})
    .then(dados => {
      // console.log(dados.artists.items[0].images[0].url)
      console.log(dados)
      // var newTracks = dados.artists.items.map((track, index) => (<li key={index}>{track.name}</li>))
      setArtist(dados.data.artists.items)
      console.log(artist)
    })
    .catch(function(error) {
        // manipulate the error response here
        console.log(error.response.data.error.message)
        alert('busque um novo token')
    });

    axios
    .get(searchAlbumUrl,
      { headers: {
        Authorization: `Bearer ${token}`
        }})
    .then(dados => {
      // console.log(dados.artists.items[0].images[0].url)
      console.log(dados)
      // var newTracks = dados.artists.items.map((track, index) => (<li key={index}>{track.name}</li>))
      setAlbums(dados.data.albums.items)
      // console.log(artist)
    })
    .catch(function(error) {
        // manipulate the error response here
        console.log(error)
    });

    axios
    .get(searchTrackUrl,
      { headers: {
        Authorization: `Bearer ${token}`
        }})
    .then(dados => {
      // console.log(dados.artists.items[0].images[0].url)
      console.log(dados)
      // var newTracks = dados.artists.items.map((track, index) => (<li key={index}>{track.name}</li>))
      setTracks(dados.data.tracks.items)
      console.log(tracks)
    })
    .catch(function(error) {
        // manipulate the error response here
        console.log(error)
    });


}

const handleChange = event => {
  SetSearch(event.target.value);

  console.log('value is:', event.target.value);
};


const [parametro, setParametro] = useState(getHashParams())
const [token, setToken] = useState((parametro.access_token))
const [artist, setArtist] = useState([])
const [tracks, setTracks] = useState([])
const [albums, setAlbums] = useState([])
const [search, SetSearch] = useState("")


  return (
    <div> 
    <button ><a href="http://localhost:8888/login">Login com Spotfy</a></button>
    <input onChange={handleChange}></input>
    <button onClick={() => topTracksLorde(token)}>Buscar</button>
    <p>Artistas</p>
    {artist.map((artist, index) => {
      return (
        <li key={index}><img width={40} src={artist.images[0] ? artist.images[0].url : ""}/>{artist.name}</li>
      )
    })}
    <p>Albuns</p>
    {albums.map((album, index) => {
      return (
        <li key={index}><img width={40} src={album.images[0] ? album.images[0].url : ""}/>{album.name}</li>
      )
    })}
    <p>Musicas</p>
    {tracks.map((track, index) => {
      return (
        <li key={index}><img width={40} src={track.album.images[0] ? track.album.images[0].url : ""}/>{track.name}</li>
      )
    })} 
    </div>
  )
}




export default Login