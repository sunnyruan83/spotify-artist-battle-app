import SpotifyAPI from "../api/spotify.js";
import {getHashParams} from "../helpers/url.js";
import {STATE_KEY} from "../helpers/constants.js";

  const USER_PROFILE = document.getElementById('user-profile');
  const {access_token, state} = getHashParams();
  const storedState = localStorage.getItem(STATE_KEY);

  var artist1 = null;
  var artist2 = null;
  var winner = '';


 if (!access_token || (state == null || state !== storedState)) {
    window.location = "/";
  } else {
    document.getElementById("artist-search").addEventListener("click", () => {
      const input = document.getElementById("artist-input");
      SpotifyAPI.getArtist(access_token, input.value).then((data) => {
        artist1 = data.artists.items[0];
        document.getElementById("container").innerHTML = `<div>
        <img src="${artist1.images[0].url}" />
        <div>${artist1.name}</div></div>`;
           })
    })
    }
    if (!access_token || (state == null || state !== storedState)) {
    window.location = "/";
  } else {
    document.getElementById("artist-search-2").addEventListener("click", () => {
      const input2 = document.getElementById("artist-input-2");
      SpotifyAPI.getArtist(access_token, input2.value).then((data) => {
        artist2 = data.artists.items[0];
        document.getElementById("container-2").innerHTML = `<div>
        <img src="${artist2.images[0].url}" />
        <div>${artist2.name}</div></div>`;
           })
     })
  }




document.getElementById("Battle").addEventListener("click", () => {
    //Call spotify API to get artist 1 details(including followers)
    console.log('artist 1', artist1);
    if(artist1 && artist2) {
      if(artist1.followers.total > artist2.followers.total) {
        winner = artist1.name;
      } else {
        winner = artist2.name;
      }
    } else {
      alert('No artist in compare')
    }


  document.getElementById("winner").innerHTML = `<div>${winner}</div>`;
  document.getElementById("show-winner").style.display = 'block';
});
