class Modal {

  constructor($sideBar, $overlay) {
    this.$modal = document.getElementById('modal');
    this.$modalTitle = this.$modal.querySelector('h1');
    this.$modalDesc = this.$modal.querySelector('p');
    this.$modalImage = this.$modal.querySelector('img');
    this.$sideBar = $sideBar;
    this.$overlay = $overlay;
    this.movieList = {}
  }

  // Funciones relacionadas con la muestra del Modal una vez se oprime click  ------------------------------------------
  showModal($movieSelected){
    const id = parseInt($movieSelected.dataset.indexNumber, 10);
    const category = $movieSelected.dataset.category;
    const movieSelected = this.findMovie(id, category);
    this.$modalTitle.innerHTML = movieSelected.title;
    (movieSelected.summary.length > 400)
    ? this.$modalDesc.textContent = movieSelected.summary.substring(0, 400)
    : this.$modalDesc.textContent = movieSelected.summary;
    this.$modalImage.src = movieSelected.medium_cover_image;
    this.$overlay.classList.add('active');
    this.$modal.style.animation = 'modalIn .8s forwards';
  }

  hideModal(){
    if(!(this.$sideBar.classList.contains('active')))
      this.$overlay.classList.remove('active');
    this.$modal.style.animation = 'modalOut .8s forwards';
  }

  // Funciones relacionadas con la búsqueda de un elemento en una lista  ------------------------------------------
  findByID = (movieList, id) => movieList.find(movie => movie.id === id);

  findMovie(id, category) {
    switch(category){
      case 'action':
        return this.findByID(this.movieList.actionList, id);
      case 'horror':
        return this.findByID(this.movieList.terrorList, id);
      case 'animation':
        return this.findByID(this.movieList.animationList, id);
      case 'crime':
        return this.findByID(this.movieList.crimeList, id);
      default:
        return undefined;
    }
  }
}

export default Modal;