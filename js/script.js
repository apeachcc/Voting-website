// Retrieve the vote counts from local storage
let voteCounts = {};
if (localStorage.getItem('voteCounts')) {
  voteCounts = JSON.parse(localStorage.getItem('voteCounts'));
} else {
  voteCounts = {
    Harry: 0,
    Benny: 0,
    Hugo: 0
  };
}

// Update the vote count paragraph for each candidate
document.querySelectorAll('.candidate').forEach((element) => {
  const candidateName = element.querySelector('h2').textContent.trim();
  const voteCountElement = element.querySelector('span');
  voteCountElement.textContent = voteCounts[candidateName];
});

// // Function to handle voting for a candidate
// function vote(candidateName) {
//   // Update the vote count for the selected candidate
//   if (voteCounts.hasOwnProperty(candidateName)) {
//     voteCounts[candidateName]++;
    
//     // Save the updated vote counts to local storage
//     localStorage.setItem('voteCounts', JSON.stringify(voteCounts));
    
//     // Update the vote count paragraph for the selected candidate
//     const candidateElement = document.querySelector(`h2:contains(${candidateName})`).parentElement;
//     const voteCountElement = candidateElement.querySelector('span');
//     voteCountElement.textContent = voteCounts[candidateName];

//     // Display a helper text to indicate that the user has successfully voted
//     const helperText = document.querySelector('#helper-text');
//     helperText.textContent = `Thank you for voting for ${candidateName}!`;

 

//   } else {
//     console.error(`Option '${candidateName}' not found.`);
//   }

  
// }




// Function to handle voting for a candidate
function vote(candidateName) {
  // Update the vote count for the selected candidate
  if (voteCounts.hasOwnProperty(candidateName)) {
    voteCounts[candidateName]++;
    
    // Save the updated vote counts to local storage
    localStorage.setItem('voteCounts', JSON.stringify(voteCounts));
    
    // Update the vote count paragraph for the selected candidate
    document.querySelectorAll('.candidate').forEach((element) => {
      const nameElement = element.querySelector('h2');
      if (nameElement.textContent.trim() === candidateName) {
        const voteCountElement = element.querySelector('span');
        voteCountElement.textContent = voteCounts[candidateName];
      }
    });
    
    // Show the "voted" helper text
    const voteButton = document.querySelector(`[data-candidate="${candidateName}"]`);
    voteButton.insertAdjacentHTML('afterend', '<p class="voted-text">You voted for this mascot!</p>');
    
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
  for (let candidateName in voteCounts) {
    if (voteCounts[candidateName] > highestVoteCount) {
      winner = candidateName;
      highestVoteCount = voteCounts[candidateName];
    }
  }
  
  // Display the result page
  document.querySelector('#result-page').classList.remove('hidden');
  document.querySelector('#vote-page').classList.add('hidden');
  document.querySelector('#winner').textContent = `The winner is ${winner} with ${highestVoteCount} votes!`;
  
//   // Update the vote count table on the result page
//   const table = document.querySelector('#vote-count-table');

//   for (const candidateName in voteCounts) {
//     const row = table.insertRow();
//     const nameCell = row.insertCell(0);
//     const countCell = row.insertCell(1);
//     nameCell.textContent = candidateName;
//     countCell.textContent = voteCounts[candidateName];
//   }
// }

// Update the vote count table on the result page
const table = document.querySelector('#vote-count-table tbody');

// Clear any existing rows in the table body
table.innerHTML = '';

// Populate the table with the updated vote counts
for (const candidateName in voteCounts) {
  if (voteCounts[candidateName] !== '') {
    const row = table.insertRow();
    const nameCell = row.insertCell(0);
    const countCell = row.insertCell(1);
    nameCell.textContent = candidateName;
    countCell.textContent = voteCounts[candidateName];
  }
}
}




// Event listener for the vote buttons
document.querySelectorAll('.vote-button').forEach((element) => {
  element.addEventListener('click', () => {
    let candidateName = element.getAttribute('data-candidate');
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
  const keyword = 'NBA mascot';
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${api_key}&tag=${keyword}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const gifUrl = data.data.images.original.url;
      const gifImg = document.getElementById('gif');
      gifImg.setAttribute('src', gifUrl);
    })
    .catch(error => console.error(error));
}

//NBA stat API
const apiKey2 = 'c6e235eed226481c84a5151618898a4d';
const endpointUrl = 'https://api.sportsdata.io/v3/nba/scores/json/TeamSeasonStats/2023';
const requestUrl = `${endpointUrl}?key=${apiKey2}`;

fetch(requestUrl)
  .then(response => response.json())
  .then(data => {
    // Handle the data here
    //console.log(data);
    // Create a new table element
    const table = document.createElement('table');
    table.className = 'team-season-stats';
    
    // Create a new row element for the headers
    const headerRow = document.createElement('tr');
    // Add the header cells to the row
    const headers = ['Team', 'Games', 'Points', 'Field Goal %', 'Three Pointers %', 'Free Throws %', 'Rebounds', 'Assists', 'Steals', 'Turnovers', 'Personal Fouls'];
    headers.forEach(header => {
      const headerCell = document.createElement('th');
      headerCell.textContent = header;
      headerRow.appendChild(headerCell);
    });
    // Add the header row to the table
    table.appendChild(headerRow);
    // Add a new row for each team's stats
    data.forEach(team => {
      const row = document.createElement('tr');
      // Add a new cell for each stat
      const stats = [team.Name, team.Games, team.Points, team.FieldGoalsPercentage, team.ThreePointersPercentage, team.FreeThrowsPercentage, team.Rebounds, team.Assists, team.Steals, team.Turnovers, team.PersonalFouls];
      stats.forEach(stat => {
        const cell = document.createElement('td');
        cell.textContent = stat;
        row.appendChild(cell);
      });
      // Add the row to the table
      table.appendChild(row);
    });
    // Get the element where you want to display the table
    const container = document.getElementById('stats-container');
    // Add the table to the container element
    container.appendChild(table);
  })
  .catch(error => {
    // Handle any errors here
    console.error(error);
  });