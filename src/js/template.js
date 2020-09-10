class Template {
  movieSearchTemplate(movie) {
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

  movieItemTemplate (movie, category){
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
  
  movieListTemplate (movie, category){
    return (
    `<li class="myPlaylist-item" data-index-number="${movie.id}" data-category="${category}">
      <a href="#">
          ${movie.title}
      </a>
    </li>`
    )
  }

  userItemTemplate (id, user){
    return (
    `<li class="playlistFriends-item data-index-number="${id}">
      <a href="#">
        <img src="${user.picture.medium}" alt="img User" />
          ${user.name.first} ${user.name.last} 
      </a>
    </li>`
    )
  }

  // Funciones relacionadas con la creación de elementos en el DOM ------------------------------------------
  createElement (HTMLString) {
    const $element = document.implementation.createHTMLDocument();
      $element.body.innerHTML = HTMLString;
      return $element.body.children[0];
  }

  setAttributes($element, attributes){
    for(const attr in attributes)
      $element.setAttribute(attr, attributes[attr]);
  }
}

export default Template;