const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// const ticketPrice = +movieSelect.value; // + put the plus sign to change to number
let ticketPrice = parseInt(movieSelect.value); // The above is the same as parseInt()

// Save selected movie index and price

let setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};

// Get data from local storage and populate the IU
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length !== 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
};
populateUI();

// Update total and count
let updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copy selected seats into an array
  // Map over the array
  //Return a new array of indexes
  // use spread operator
  const seatsIndex = [...selectedSeats].map(seat => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

// add event listerner
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }

  // event listerner Movie select
  movieSelect.addEventListener('change', e => {
    // console.log(e.target.selectedIndex, e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);

    ticketPrice = +e.target.value;
    updateSelectedCount();
  });
});

// Initial count and total set
updateSelectedCount();
