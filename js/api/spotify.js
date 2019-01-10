const getArtist = (accessToken, query) => {
  return fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
  }).then(response => response.json())
};

export default {
  getArtist
}