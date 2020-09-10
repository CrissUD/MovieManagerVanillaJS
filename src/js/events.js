class Events {

  constructor(template, modal, $sideBar, $overlay, MOVIE_URL) {
    this.template = template;
    this.modal = modal;

    this.$sideBar = $sideBar;
    this.$overlay = $overlay;
    this.$hideModal = document.getElementById('hide-modal');
    this.$closeMenu = document.getElementById('close-menu');
    this.$burgerButton = document.querySelector('.burger-button');
    this.$closeButton = document.querySelector('.close-button');
    this.$modalUser = document.getElementById('modalUser');
    this.$hideModalUser = document.getElementById('modalUser-btn-close');
    this.$userButton = document.getElementById('user-button');
    this.$home = document.getElementById('home');
    this.$form = document.getElementById('form');
    this.$featuringContainer = document.getElementById('featuring');
    this.MOVIE_URL = MOVIE_URL;
    this.$hideModal.addEventListener('click', modal.hideModal.bind(modal));
    this.createEventListener();
  }

  addEventClick($movieElement) {
    $movieElement.addEventListener('click', () =>{
      this.modal.showModal($movieElement);
    });
  }

  createEventListener() {
    this.$userButton.addEventListener('click', () =>{
      this.$overlay.classList.add('active');
      this.$modalUser.style.animation = 'modalIn .8s forwards';
    });
  
    this.$hideModalUser.addEventListener('click', () =>{
      this.$overlay.classList.remove('active');
      this.$modalUser.style.animation = 'modalOut .8s forwards';
    });
  
    this.$burgerButton.addEventListener('click', () =>{
      this.$overlay.classList.add('active');
      this.$sideBar.classList.add('active');
      this.$closeMenu.classList.add('active');
    })
  
    this.$closeButton.addEventListener('click', () =>{
      this.$overlay.classList.remove('active');
      this.$sideBar.classList.remove('active');
      this.$closeMenu.classList.remove('active');
    })
  
    this.$form.addEventListener('submit', async event =>{
      event.preventDefault();
      this.$featuringContainer.style.display = "flex";
      this.$featuringContainer.innerHTML = '';
      this.$home.classList.add('search-active');
      const $loader = document.createElement('img');
      this.template.setAttributes($loader, { src: 'src/images/loader.gif', height: 70, width: 70 });
      this.$featuringContainer.append($loader);
  
      const dataForm = new FormData(this.$form);
      try{
        const { data: { movies } } = await this.getData(`${this.MOVIE_URL}limit=1&query_term=${dataForm.get('name')}`);
        console.log(movies[0])
        const HTMLString = this.template.movieSearchTemplate(movies[0]);
        this.$featuringContainer.innerHTML = HTMLString;
        const $closeButton = this.$featuringContainer.querySelector('.movie-close-button');
        $closeButton.addEventListener('click', () => {
        this.$home.classList.remove('search-active')
        this.$featuringContainer.style.display = "none";
      });
      }catch (error){
        console.log(error)
        alert(`La película "${dataForm.get('name')}" no fue encontrada`);
        $loader.remove();
        this.$home.classList.remove('search-active');
      }
    });
  }
}

export default Events;