import Template from './template.js';
import Render from './render.js';
import Modal from './modal.js';
import Events from './events.js';

// ELEMENTOS DOM
const $actionContainer = document.getElementById('action');
const $terrorContainer = document.getElementById('terror');
const $animationContainer = document.getElementById('animation');
const $crimeContainer = document.querySelector('.myPlaylist');
const $sideBar = document.getElementById('home-sidebar');
const $overlay = document.getElementById('overlay');

// RUTAS APIS EXTERNAS
const MOVIE_URL = 'https://yts.mx/api/v2/list_movies.json?';
const PERSON_URL = 'https://randomuser.me/api/';

// Objetos
const template = new Template();
const modal = new Modal($sideBar, $overlay);
const events = new Events(template, modal, $sideBar, $overlay, MOVIE_URL);
const render = new Render(template, events);


(async function load(){

  // Función encargada de pedir datos externos a Apis
  async function getData(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  events.getData = getData;

  // Funciones encargada de guardar información en cache ------------------------------------------
  async function cacheExist(category){
    const listName = `${category}List`;
    const cacheList = window.localStorage.getItem(listName);
    if(cacheList){
      console.log("storage")
      return JSON.parse(cacheList);
    }
    else{
      const { data: { movies: data } } = await getData(`${MOVIE_URL}genre=${category}`);
      window.localStorage.setItem('listName', JSON.stringify(data));
      return data;
    }
  }

  createUsers();
  
  // Llamadas asíncronas a la obtención de información y muestra de ellas  ------------------------------------------
  async function createUsers(){
    for(let i = 0; i < (Math.random() * (10  - 2) + 2); i ++){
      const { results } = await getData(PERSON_URL);
      render.renderUser(i, results);
    }
  }

  const crimeList = await cacheExist('crime');
  modal.movieList.crimeList = crimeList;
  render.renderMovieList(crimeList, $crimeContainer, 'crime', true);

  const actionList = await cacheExist('action');
  modal.movieList.actionList = actionList;
  render.renderMovieList(actionList, $actionContainer, 'action', false);

  const terrorList = await cacheExist('horror');
  modal.movieList.terrorList = terrorList;
  render.renderMovieList(terrorList, $terrorContainer, 'horror', false);
  
  const animationList = await cacheExist('animation');
  modal.movieList.animationList = animationList;
  render.renderMovieList(animationList, $animationContainer, 'animation', false);
})()