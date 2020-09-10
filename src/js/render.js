class Render {

  constructor(template, events) {
    this.template = template;
    this.events = events;
    this.$userContainer = document.querySelector('.playlistFriends');
  }

  renderMovieList(movieList, $container, category, isCrime){
    if($container.children[0])
      $container.children[0].remove();
    movieList.forEach(movie => {
      let HTMLString;
      if(isCrime)
        HTMLString = this.template.movieListTemplate(movie, category);
      else
        HTMLString = this.template.movieItemTemplate(movie, category);
      const $movieElement = this.template.createElement(HTMLString);
      if ($movieElement.querySelector('img')){
        const $movieImage = $movieElement.querySelector('img');
        $movieImage.addEventListener('load', event => event.srcElement.classList.add('fadeIn'));
      }
      this.events.addEventClick($movieElement);
      $container.append($movieElement);
    });
  }

  renderUser(i, results){
    const HTMLString = this.template.userItemTemplate (i, results[0]);
    const $userElement = this.template.createElement(HTMLString);
    this.$userContainer.append($userElement);
  }
}

export default Render;