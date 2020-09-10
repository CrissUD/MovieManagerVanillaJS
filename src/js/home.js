// ELEMENTOS DOM
const $actionContainer = document.getElementById('action');
const $terrorContainer = document.getElementById('terror');
const $animationContainer = document.getElementById('animation');
const $crimeContainer = document.querySelector('.myPlaylist');
const $userContainer = document.querySelector('.playlistFriends');
const $sideBar = document.getElementById('home-sidebar');
const $closeMenu = document.getElementById('close-menu');

const $burgerButton = document.querySelector('.burger-button');
const $closeButton = document.querySelector('.close-button');

const $modal = document.getElementById('modal');
const $hideModal = document.getElementById('hide-modal');
const $overlay = document.getElementById('overlay');
const $modalTitle = $modal.querySelector('h1');
const $modalImage = $modal.querySelector('img');
const $modalDesc = $modal.querySelector('p');
const $modalUser = document.getElementById('modalUser');
const $hideModalUser = document.getElementById('modalUser-btn-close');
const $userButton = document.getElementById('user-button');

const $home = document.getElementById('home');
const $form = document.getElementById('form');
const $featuringContainer = document.getElementById('featuring');

// RUTAS APIS EXTERNAS
const MOVIE_URL = 'https://yts.mx/api/v2/list_movies.json?';
const PERSON_URL = 'https://randomuser.me/api/';

(async function load(){

  // Función encargada de pedir datos externos a Apis
  async function getData(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  // FUNCIONES TEMPLATE -------------------------------------------------------------------------
  function movieSearchTemplate(movie) {
    return (
    `<div class="movieSearch">
      <div class="movie-close">
        <button class="movie-close-button">
          <figure>
            <img src="src/images/close.png">
          </figure>
        </button>
      </div>
      <div class="movie-info">
        <div class="movieSearch-image">
          <img src="${movie.medium_cover_image}" width="95" height="135" alt="">
        </div>
        <div class="movieSearch-content">
          <p class="movieSearch-title">Película encontrada</p>
          <p class="movieSearch-album">${movie.title}</p>
        </div>
      </div>
    </div>`
    )
  }

  function movieItemTemplate (movie, category){
    return (
    `<div class="primaryPlaylistItem" data-index-number="${movie.id}" data-category="${category}">
      <div class="primaryPlaylistItem-image">
          <img src="${movie.medium_cover_image}">
      </div>
      <h4 class="primaryPlaylistItem-title">
          ${movie.title}
      </h4>
    </div>`
    )
  }
  
  function movieListTemplate (movie, category){
    return (
    `<li class="myPlaylist-item" data-index-number="${movie.id}" data-category="${category}">
      <a href="#">
          ${movie.title}
      </a>
    </li>`
    )
  }

  function userItemTemplate (id, user){
    return (
    `<li class="playlistFriends-item data-index-number="${id}">
      <a href="#">
        <img src="${user.picture.medium}" alt="img User" />
          ${user.name.first} ${user.name.last} 
      </a>
    </li>`
    )
  }

  // FUNCIONES EVENTOS -------------------------------------------------------------------------
  $hideModal.addEventListener('click', hideModal);

  $userButton.addEventListener('click', () =>{
    $overlay.classList.add('active');
    $modalUser.style.animation = 'modalIn .8s forwards';
  });

  $hideModalUser.addEventListener('click', () =>{
    $overlay.classList.remove('active');
    $modalUser.style.animation = 'modalOut .8s forwards';
  });

  $burgerButton.addEventListener('click', () =>{
    $overlay.classList.add('active');
    $sideBar.classList.add('active');
    $closeMenu.classList.add('active');
  })

  $closeButton.addEventListener('click', () =>{
    $overlay.classList.remove('active');
    $sideBar.classList.remove('active');
    $closeMenu.classList.remove('active');
  })

  function addEventClick($movieElement) {
    $movieElement.addEventListener('click', () =>{
      showModal($movieElement);
    });
  }

  $form.addEventListener('submit', async event =>{
    event.preventDefault();
    $featuringContainer.style.display = "flex";
    $featuringContainer.innerHTML = '';
    $home.classList.add('search-active');
    const $loader = document.createElement('img');
    setAttributes($loader, { src: 'src/images/loader.gif', height: 70, width: 70 });
    $featuringContainer.append($loader);

    const data = new FormData($form);
    try{
    const { data: { movies } } = await getData(`${MOVIE_URL}limit=1&query_term=${data.get('name')}`);
    const HTMLString = movieSearchTemplate(movies[0]);
    $featuringContainer.innerHTML = HTMLString;
    const $closeButton = $featuringContainer.querySelector('.movie-close-button');
    $closeButton.addEventListener('click', () => {
      $home.classList.remove('search-active')
      $featuringContainer.style.display = "none";
    });
    }catch (error){
      alert(`La película "${data.get('name')}" no fue encontrada`);
      $loader.remove();
      $home.classList.remove('search-active');
    }
  });

  // Funciones relacionadas con la creación de elementos en el DOM ------------------------------------------
  function createElement (HTMLString) {
    const $element = document.implementation.createHTMLDocument();
      $element.body.innerHTML = HTMLString;
      return $element.body.children[0];
  }

  function setAttributes($element, attributes){
    for(const attr in attributes)
      $element.setAttribute(attr, attributes[attr]);
  }

  // Funciones relacionadas con la muestra del Modal una vez se oprime click  ------------------------------------------
  function showModal($movieSelected){
    const id = parseInt($movieSelected.dataset.indexNumber, 10);
    const category = $movieSelected.dataset.category;
    const movieSelected = findMovie(id, category);
    $modalTitle.innerHTML = movieSelected.title;
    (movieSelected.summary.length > 400)
    ? $modalDesc.textContent = movieSelected.summary.substring(0, 400)
    : $modalDesc.textContent = movieSelected.summary;
    $modalImage.src = movieSelected.medium_cover_image;
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';
  }

  function hideModal(){
    if(!$sideBar.classList.contains('active'))
      $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';
  }

  // Funciones relacionadas con la búsqueda de un elemento en una lista  ------------------------------------------
  const findByID = (movieList, id) => movieList.find(movie => movie.id === id);

  function findMovie(id, category) {
    switch(category){
      case 'action':
        return findByID(actionList, id);
      case 'horror':
        return findByID(terrorList, id);
      case 'animation':
        return findByID(animationList, id);
      case 'crime':
        return findByID(crimeList, id);
      default:
        return undefined;
    }
  }

  // Funciones relacionadas con la creación y renderización de elementos en el DOM------------------------------------------
  function renderMovieList(movieList, $container, category, iscrime){
    if($container.children[0])
      $container.children[0].remove();
    movieList.forEach(movie => {
      let HTMLString;
      if(iscrime)
        HTMLString = movieListTemplate(movie, category);
      else
        HTMLString = movieItemTemplate(movie, category);
      const $movieElement = createElement(HTMLString);
      if ($movieElement.querySelector('img')){
        $movieImage = $movieElement.querySelector('img');
        $movieImage.addEventListener('load', event => event.srcElement.classList.add('fadeIn'));
      }
      addEventClick($movieElement);
      $container.append($movieElement);
    });
  }

  async function renderUsers(){
    for(let i = 0; i < (Math.random() * 20 + 2); i ++){
      const { results } = await getData(`${PERSON_URL}`);
      const HTMLString = userItemTemplate (i, results[0]);
      const $userElement = createElement(HTMLString);
      $userContainer.append($userElement);
    }
  }

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

  // Llamadas asincrónicas a la obtención de información y muestra de ellas  ------------------------------------------
  renderUsers();

  const crimeList = await cacheExist('crime');
  renderMovieList(crimeList, $crimeContainer, 'crime', true);

  const actionList = await cacheExist('action');
  renderMovieList(actionList, $actionContainer, 'action', false);

  const terrorList = await cacheExist('horror');
  renderMovieList(terrorList, $terrorContainer, 'horror', false);
  
  const animationList = await cacheExist('animation');
  renderMovieList(animationList, $animationContainer, 'animation', false);
})()