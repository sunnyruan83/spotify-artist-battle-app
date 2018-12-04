import SpotifyAPI from "../api/spotify.js";
import {getHashParams} from "../helpers/url.js";
import {STATE_KEY} from "../helpers/constants.js";

const USER_PROFILE = document.getElementById('user-profile');
const {access_token, state} = getHashParams();
const storedState = localStorage.getItem(STATE_KEY);


const outputTemplate = ({display_name, id, email, uri, external_urls, images, country}) =>`<h1>Logged in as </h1>
  <div class="media">
    <div class="pull-left">
      <img class="media-object" width="150" src="">
    </div>
    <div class="media-body">
      <dl class="dl-horizontal">
        <dt>Display name</dt><dd class="clearfix">${display_name}</dd>
        <dt>Id</dt><dd>${id}</dd>
        <dt>Email</dt><dd>${email}</dd>
        <dt>Spotify URI</dt><dd><a href="${uri}">${uri}</a></dd>
        <dt>Link</dt><dd><a href="${external_urls.spotify}">${external_urls.spotify}</a></dd>
        <dt>Profile Image</dt><dd class="clearfix"><a href=""></a></dd>
        <dt>Country</dt><dd>${country}</dd>
      </dl>
    </div>
  </div>`
!function(t){var e={};function n(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(i,s,function(e){return t[e]}.bind(null,s));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="dist",n(n.s=3)}([function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return s}),n.d(e,"c",function(){return r});const i="https://did-spotify-template.herokuapp.com/",s="029ceff091cb40ea81924d75ae03368f",r="spotify_auth_state"},function(t,e,n){"use strict";function i(){const t={};let e,n=/([^&;=]+)=?([^&;]*)/g,i=window.location.hash.substring(1);for(;e=n.exec(i);)t[e[1]]=decodeURIComponent(e[2]);return t}function s(t){let e="";const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let i=0;i<t;i++)e+=n.charAt(Math.floor(Math.random()*n.length));return e}n.d(e,"b",function(){return i}),n.d(e,"a",function(){return s})},,function(t,e,n){"use strict";n.r(e);var i=n(1),s=n(0),r=t=>{const e=t.images.length?t.images[1]:{url:"/images/spotify-icon.jpg"},n=document.createElement("div");return n.classList="card mx-auto mb-3",n.style="width: 120px;",n.innerHTML=`<div>\n    <img style="min-height:120px;" class="card-img-top" src="${e.url}" alt="${t.name}" height="120" width="120">\n    <h5 class="card-title text-center">${t.name}</h5>\n  </div>`,n};class o{constructor(t,e,n,i,s,r){this.api=t,this.container=e,this.searchButton=n,this.input=i,this.display=s,this.selectedCallback=r,this.artists=null,this.selectedArtist=null,this.searchButton.addEventListener("click",()=>this.displayArtists())}selectArtist(t){this.selectedArtist=this.artists.find(e=>e.id===t),this.container.innerHTML="";const e=r(this.selectedArtist);this.container.appendChild(e),this.selectedCallback(this.selectedArtist)}displayArtist(t){const e=r(t);return e.addEventListener("click",()=>this.selectArtist(t.id)),e}displayArtists(){this.display.innerHTML="",this.api.getArtists(this.input.value).then(({artists:t})=>{this.artists=t,t.forEach(t=>this.display.appendChild(this.displayArtist(t)))})}}const{access_token:c,state:a}=Object(i.b)(),l=localStorage.getItem(s.c),d={},u=t=>{d[t.id]=t,2===Object.keys(d).length&&(t=>{const e=t.reduce((t,e)=>t.score>e.popularity*e.followers.total?t:{id:e.id,score:e.popularity*e.followers.total},{id:null,score:0}),n=t.find(t=>t.id===e.id),i=r(n),s=document.createElement("div");s.classList="text-center",s.innerHTML=`with a score of ${e.score}`,document.getElementById("winner").appendChild(i),document.getElementById("winner").appendChild(s),document.getElementById("show-selection").style.display="none",document.getElementById("show-winner").style.display="block"})(Object.values(d))};if(c&&null!=a&&a===l){const t=(t=>{const e=e=>fetch(`https://api.spotify.com/v1/artists?ids=${e}`,{headers:{Authorization:`Bearer ${t}`}}).then(t=>t.json());return{getUserData:()=>fetch("https://api.spotify.com/v1/me",{headers:{Authorization:`Bearer ${t}`}}).then(t=>t.json()),getArtists:n=>fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(n)}&type=artist&limit=10`,{headers:{Authorization:`Bearer ${t}`}}).then(t=>t.json()).then(({artists:t})=>{const n=t.items.map(t=>t.id).join(",");return e(n)})}})(c);new o(t,document.getElementById("container"),document.getElementById("artist-search"),document.getElementById("artist-input"),document.getElementById("artists"),u),new o(t,document.getElementById("container-2"),document.getElementById("artist-search-2"),document.getElementById("artist-input-2"),document.getElementById("artists-2"),u)}else window.location="/"}]);

if (!access_token || (state == null || state !== storedState)) {
  window.location = "/";
} else {
  SpotifyAPI.getUserData(access_token).then(data => {
    USER_PROFILE.innerHTML = outputTemplate(data);
  });
}