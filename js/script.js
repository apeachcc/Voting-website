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
  }
  
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
  }
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
$(document).ready(function () {
    // Initiate gifLoop for set interval
    var refresh;
    // Duration count in seconds
    const duration = 1000 * 10;
    // Giphy API defaults
    const giphy = {
        baseURL: "https://api.giphy.com/v1/gifs/",
        apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
        tag: "fail",
        type: "random",
        rating: "pg-13"
    };
    // Target gif-wrap container
    const $gif_wrap = $("#gif-wrap");
    // Giphy API URL
    let giphyURL = encodeURI(
        giphy.baseURL +
        giphy.type +
        "?api_key=" +
        giphy.apiKey +
        "&tag=" +
        giphy.tag +
        "&rating=" +
        giphy.rating
    );

    // Call Giphy API and render data
    var newGif = () => $.getJSON(giphyURL, json => renderGif(json.data));

    // Display Gif in gif wrap container
    var renderGif = _giphy => {
        console.log(_giphy);
        // Set gif as bg image
        $gif_wrap.css({
            "background-image": 'url("' + _giphy.image_original_url + '")'
        });

        // Start duration countdown
        // refreshRate();
    };

    // Call for new gif after duration
    // var refreshRate = () => {
    //  // Reset set intervals
    //  clearInterval(refresh);
    //  refresh = setInterval(function() {
    //      // Call Giphy API for new gif
    //      newGif();
    //  }, duration);
    // };

    // Call Giphy API for new gif
    newGif();


    const newGifButton = $('#new-gif');

    newGifButton.click(newGif)
});
