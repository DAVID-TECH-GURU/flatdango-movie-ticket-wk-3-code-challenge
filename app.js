const filmsUrl = 'http://localhost:3001/films'
const filmUrl = 'http://localhost:3001/films/1'

const posterEl = document.querySelector('#poster')
const titleEl = document.querySelector('#title')
const runtimeEl = document.querySelector('#runtime')
const showtimeEl = document.querySelector('#showtime')
const availableTicketsEl = document.querySelector('#available-tickets')
const buyTicketBtn = document.querySelector('#buy-ticket')
const filmsListEl = document.querySelector('#films')

//To Load the details of the first movie on page load
fetch(filmUrl)
  .then(res => res.json())
  .then(data => {
    posterEl.src = data.poster
    titleEl.innerText = data.title
    runtimeEl.innerText = `Runtime: ${data.runtime} minutes`
    showtimeEl.innerText = `Showtime: ${data.showtime}`
    const availableTickets = data.capacity - data.tickets_sold
    availableTicketsEl.innerText = `Available Tickets: ${availableTickets}`
    if (availableTickets === 0) {
      buyTicketBtn.disabled = true
    }
  })

// To Load the list of all movies on page load
fetch(filmsUrl)
  .then(res => res.json())
  .then(data => {
    data.forEach(film => {
      const li = document.createElement('li')
      li.innerText = film.title
      filmsListEl.appendChild(li)
    })
  })

// To Handle the "Buy Ticket" button click
buyTicketBtn.addEventListener('click', () => {
  const availableTickets = parseInt(availableTicketsEl.innerText.split(' ')[2])
  if (availableTickets > 0) {
    availableTicketsEl.innerText = `Available Tickets: ${availableTickets - 1}`
  }
})

function renderMovies(movies) {
    const movieList = document.querySelector('#films');
    movieList.innerHTML = '';
  
    movies.forEach(movie => {
      const li = document.createElement('li');
      li.classList.add('film', 'item');
      li.id = `movie-${movie.id}`;
      li.textContent = movie.title;
  
      li.addEventListener('click', () => {
        fetch(`/films/${movie.id}`)
          .then(response => response.json())
          .then(movieDetails => {
            renderMovieDetails(movieDetails);
          })
          .catch(error => console.error(error));
      });
  
      movieList.appendChild(li);
    });
  }

  
  function renderMovieDetails(movie) {
    const movieDetails = document.querySelector('#film-details');
    movieDetails.innerHTML = '';
  
    const title = document.createElement('h2');
    title.textContent = movie.title;
  
    const poster = document.createElement('img');
    poster.src = movie.poster;
  
    const runtime = document.createElement('p');
    runtime.textContent = `Runtime: ${movie.runtime} minutes`;
  
    const description = document.createElement('p');
    description.textContent = movie.description;
  
    const showtime = document.createElement('p');
    showtime.textContent = `Showtime: ${movie.showtime}`;
  
    const capacity = document.createElement('p');
    capacity.textContent = `Capacity: ${movie.capacity}`;
  
    const ticketsSold = document.createElement('p');
    ticketsSold.textContent = `Tickets sold: ${movie.tickets_sold}`;
  
    const buyButton = document.createElement('button');
    if (movie.tickets_sold >= movie.capacity) {
      buyButton.textContent = 'Sold Out';
      buyButton.disabled = true;
    } else {
      buyButton.textContent = 'Buy Ticket';
    }
  
    buyButton.addEventListener('click', () => {
      buyTicket(movie.id);
    });
  
    movieDetails.appendChild(title);
    movieDetails.appendChild(poster);
    movieDetails.appendChild(runtime);
    movieDetails.appendChild(description);
    movieDetails.appendChild(showtime);
    movieDetails.appendChild(capacity);
    movieDetails.appendChild(ticketsSold);
    movieDetails.appendChild(buyButton);
  }

  
  const filmItems = document.querySelectorAll('ul#films li.film.item');
  filmItems.forEach((filmItem) => {
    filmItem.addEventListener('click', async (event) => {
      const id = event.target.dataset.id;
      const response = await fetch(`http://localhost:3001/films/${id}`);
      const film = await response.json();
      const movieDetails = document.querySelector('#movie-details');
      movieDetails.innerHTML = `
        <img src="${film.poster}" alt="${film.title} Poster" />
        <div class="details">
          <h2>${film.title}</h2>
          <p>${film.description}</p>
          <div class="info">
            <p>Runtime: ${film.runtime} min</p>
            <p>Showtime: ${film.showtime}</p>
            <p>Tickets Available: ${film.capacity - film.tickets_sold} / ${film.capacity}</p>
            <button class="btn buy-button" data-id="${film.id}">${film.capacity - film.tickets_sold > 0 ? 'Buy Ticket' : 'Sold Out'}</button>
          </div>
        </div>
      `;
    });
  });

  
  async function buyTicket(id) {
    const film = await getFilm(id);
    if (film.tickets_sold < film.capacity) {
      const updatedFilm = {
        ...film,
        tickets_sold: film.tickets_sold + 1,
      };
      await fetch(`http://localhost:3001/films/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tickets_sold: updatedFilm.tickets_sold,
        }),
      });
      displayFilm(updatedFilm);
    }
  }

  
  function displayFilmList(films) {
    const filmList = document.querySelector('#films');
    filmList.innerHTML = '';
    films.forEach(film => {
      const filmItem = document.createElement('li');
      filmItem.classList.add('film');
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', async () => {
        await fetch(`http://localhost:3001/films/${film.id}`, {
          method: 'DELETE',
        });
        filmItem.remove();
      });
      const availableTickets = film.capacity - film.tickets_sold;
      const soldOut = availableTickets === 0 ? 'sold-out' : '';
      filmItem.innerHTML = `
        <div class="film-info">
          <h2 class="film-title">${film.title}</h2>
          <p class="film-runtime">${film.runtime} min</p>
          <p class="film-showtime">${film.showtime}</p>
          <p class="film-description">${film.description}</p>
          <p class="film-tickets ${soldOut}">${availableTickets} tickets left</p>
        </div>
      `;
      filmItem.appendChild(deleteButton);
      filmList.appendChild(filmItem);
    });
  }

  
