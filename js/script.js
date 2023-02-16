// Retrieve the vote counts from local storage
let voteCounts = {};
if (localStorage.getItem('voteCounts')) {
  voteCounts = JSON.parse(localStorage.getItem('voteCounts'));
} else {
  voteCounts = {
    A: 0,
    B: 0,
    C: 0
  };
}

// Update the vote count paragraph for each candidate
document.querySelectorAll('.candidate').forEach((element) => {
  const candidateName = element.querySelector('h2').textContent.trim();
  const voteCountElement = element.querySelector('span');
  voteCountElement.textContent = voteCounts[candidateName];
});

// Function to handle voting for a candidate
function vote(candidateName) {
  // Update the vote count for the selected candidate
  if (voteCounts.hasOwnProperty(candidateName)) {
    voteCounts[candidateName]++;
    
    // Save the updated vote counts to local storage
    localStorage.setItem('voteCounts', JSON.stringify(voteCounts));
    
    // Update the vote count paragraph for the selected candidate
    const candidateElement = document.querySelector(`h2:contains(${candidateName})`).parentElement;
    const voteCountElement = candidateElement.querySelector('span');
    voteCountElement.textContent = voteCounts[candidateName];
  } else {
    console.error(`Option '${candidateName}' not found.`);
  }
}

// Function to display the result page
function showResult() {
  // Retrieve the vote counts from local storage
  const voteCounts = JSON.parse(localStorage.getItem('voteCounts'));
  
  // Find the candidate with the highest vote count
  let winner = null;
  let highestVoteCount = 0;
  for (const candidateName in voteCounts) {
    if (voteCounts[candidateName] > highestVoteCount) {
      winner = candidateName;
      highestVoteCount = voteCounts[candidateName];
    }
  }hk
  
  // Display the result page
  document.querySelector('#result-page').classList.remove('hidden');
  document.querySelector('#vote-page').classList.add('hidden');
  document.querySelector('#winner').textContent = `The winner is ${winner} with ${highestVoteCount} votes!`;
  
  // Update the vote count table on the result page
  const table = document.querySelector('#vote-count-table');
  for (const candidateName in voteCounts) {
    const row = table.insertRow();
    const nameCell = row.insertCell(0);
    const countCell = row.insertCell(1);
    nameCell.textContent = candidateName;
    countCell.textContent = voteCounts[candidateName];
  };
}

// Event listener for the vote buttons
document.querySelectorAll('.vote-button').forEach((element) => {
  element.addEventListener('click', () => {
    const candidateName = element.getAttribute('data-candidate');
    vote(candidateName);
  });
});

// Event listener for the show result button
document.querySelector('#show-result-button').addEventListener('click', () => {
  showResult();
});


//giphy API
function getRandomGif() {
  const api_key = 'dRZRgj3GmmezHm6nMTVC1ZaAgMCmOS8A';
  const keyword = 'breakfast';
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${api_key}&tag=${keyword}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const gifUrl = data.data.images.original.url;
      const gifImg = document.getElementById('gif');
      gifImg.setAttribute('src', gifUrl);
    })
    .catch(error => console.error(error));
};

//tomatoes api

// const API_KEY_TOMATOES = '4q6a8bc7qpjaza8c97bksvun';
// const searchResults = document.getElementById('search-movie-results');
// const searchBreakfastButton = document.getElementById('search-breakfast');


// searchBreakfastButton.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const searchQuery = document.getElementById('search-query').value;
//   const url = `https://cors-anywhere.herokuapp.com/https://www.rottentomatoes.com/api/private/v1.0/search?q=${encodeURIComponent(searchQuery)}&type=movie&limit=10&apikey=${API_KEY_TOMATOES}`;
//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       let html = '<ul>';

//       for (let result of data.movies) {
//         html += `<li>${result.name} (${result.year}) - ${result.meterScore}%</li>`;
//       }

//       html += '</ul>';
//       searchResults.innerHTML = html;
//     })
//     .catch(error => console.error(error));
// });
