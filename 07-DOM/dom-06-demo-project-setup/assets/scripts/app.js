const addMovieModal = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal'); //Slower than getElementById
// const addMovieModal = document.body.children[1];
// const startAddMovieButton = document.querySelector('header').lastElementChild;
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const closeMovieDeletionModal = () =>{
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
}

const updateUI = ()=>{
  if (movies.length === 0){
    entryTextSection.style.display = 'block';
  }else {
    entryTextSection.style.display = 'none';
  }
}

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
}

const closeMovieModal = ()=>{
  addMovieModal.classList.remove('visible');
}

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
}

const backdropClickHandler = ()=>{
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInput();
}

const cancelAddMovieHandler = ()=>{
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
}

const addMovieHandler = ()=>{
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (titleValue.trim() ==='' || 
  imageUrlValue.trim() ==='' || 
  ratingValue.trim() ==='' ||
  +ratingValue < 1 || //+ or parseInt returns a number
  +ratingValue > 5 ){
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
  renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
}

const clearMovieInput = ()=>{
  // userInputs[0].value = '';
  for (const usrInput of userInputs){
    usrInput.value = '';
  }
}

const startDeleteMovieHandler = (movieId) =>{
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();

  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  //creates a clone node to replace the existing button with this.  Therefore this
  //will replace existing cloneDeletionButton with a new one which can be closed.
  //The existing button was changed with the binding of movieId.
  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
  //Attach the listener to the new blank button
  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);

  cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
  confirmDeletionButton.addEventListener(
    'click', 
    deleteMovieHandler.bind(null, movieId));
}

const renderNewMovieElement = (id, title, imageUrl, rating) =>{
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${imageUrl}" alt = "${title}">
  </div>
  <div class="movie-element__info">
   <h2>${title}</h2>
   <p>${rating}/5 stars</p>
  </div>
  `;
  newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovieElement);
}

const deleteMovieHandler = (movieId) =>{
  let movieIndex = 0;
  for (const movie of movies){
    if (movie.id === movieId){
      break;
    }
    movieIndex ++;
  }
  movies.splice(movieIndex, 1); // Removes the element at that index.  Other items move up.
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  //listRoot.removeChild(listRoot.children[movieIndex]);
  
  //deleteMovie(movieId);
  closeMovieDeletionModal();
  updateUI();
};

startAddMovieButton.addEventListener('click', showMovieModal)
backdrop.addEventListener('click',backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);