const addMovieModal = document.getElementById("add-modal") // This method tends to have a slightly better performance
// const addMoviemodal = document.querySelector("#add-modal")
// const addmovieModal = document.body.children[1]
const startAddMovieButton = document.querySelector('header button')
// const startAddmovieButton = document.querySelector('header').lastElementChild
// const backdropElement = document.getElementById('backdrop')
const backdropElement = document.body.firstElementChild
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive')
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling
const userInputElements = addMovieModal.querySelectorAll('input')
const entryTextSectionElement = document.getElementById('entry-text')
const deleteMovieModal = document.getElementById('delete-modal')

const movies = []

const updateUI = ()=>{
  if (movies.length === 0){
    entryTextSectionElement.style.display = 'block'
  } else {
    entryTextSectionElement.style.display = 'none'
  }
}

const deleteMovieHandler = (movieId)=>{
  let movieIndex = 0;
  for (const movie of movies){ //to find the index of the movie we want to remove
    if (movie.id === movieId){
      break
    }
    movieIndex++
  }
  movies.splice(movieIndex, 1)
  const listRoot = document.getElementById('movie-list')
  listRoot.children[movieIndex].remove()
  closeMovieDeletionModal()
  updateUI()
}

const closeMovieModal = ()=>{
  addMovieModal.classList.remove('visible')
}

const closeMovieDeletionModal = () =>{
  toggleBackdrop()
  deleteMovieModal.classList.remove('visible')
}

const startDeleteMovieHandler = (movieId)=>{
  deleteMovieModal.classList.add('visible')
  toggleBackdrop()
  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive')
  let confirmDeletionButton = deleteMovieModal.querySelector('.brn--danger')
  //removes a possible existing event listener before adding a new one
  cancelDeletionButton.removeEventListener('click',closeMovieDeletionModal)
  //This method will not work for the confirm button because the bind creates a unique function
  cancelDeletionButton.addEventListener('click', closeMovieDeletionModal)
  //If we get rid of the DOM element (confirm button), it will get rid of any previous event listeners because these specific ones are only tied to the DOM element
  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true))
  //Tie the new DOM element to the confirmDeleteButton variable
  confirmDeletionButton.deleteMovieModal.querySelector('.btn--danger')
  confirmDeletionButton.addEventListener('click',deleteMovieHandler.bind(null,movieId))
}

const renderNewMovieElement = (id,title, imageUrl, rating)=>{
  const newMovieElement = document.createElement('li')
  newMovieElement.className = 'movie-element'
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `
  newMovieElement.addEventListener('click',startDeleteMovieHandler.bind(null,id))
  const listRoot = document.getElementById('movie-list')
  listRoot.append(newMovieElement)
}

const showMovieModal = () => {
  addMovieModal.classList.add('visible')
  toggleBackdrop()
}

const backdropElementClickHandler = ()=>{
  closeMovieModal()
  closeMovieDeletionModal()
  clearMovieInput()
}

const toggleBackdrop = () =>{
  backdropElement.classList.toggle('visible')
}

const cancelAddMovieHandler = ()=>{
  closeMovieModal()
  clearMovieInput()
  toggleBackdrop()
}

const clearMovieInput = () =>{
  for (const usrInput of userInputElements){
    usrInput.value = ''
  }
}

const addMovieHandler = ()=>{
  const titleValue = userInputElements[0].value
  const imageUrlValue = userInputElements[1].value
  const ratingValue = userInputElements[2].value

  if (titleValue.trim() === '' || 
  imageUrlValue.trim()==='' || 
  ratingValue.trim() === '' || 
  +ratingValue < 1 ||
  +ratingValue > 5) { //removes white space at beginning and end of value, the + parse int
    alert('Please enter valid values (rating between 1 and 5).')
    return
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  }
  
  movies.push(newMovie)
  console.log(movies)
  closeMovieModal()
  toggleBackdrop()
  clearMovieInput()
  renderNewMovieElement(newMovie.id,newMovie.title, newMovie.image, newMovie.rating)
  updateUI()
}

startAddMovieButton.addEventListener('click',showMovieModal)
backdropElement.addEventListener('click',backdropElementClickHandler)
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler)
confirmAddMovieButton.addEventListener('click',addMovieHandler)