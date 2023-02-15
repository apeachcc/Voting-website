// Retrieve the current vote counts from local storage, or initialize them if they don't exist
let candidates = JSON.parse(localStorage.getItem("candidates")) || {"A": 0, "B": 0, "C": 0};

// Function to handle the user's vote
function vote(candidate) {
  if (candidates.hasOwnProperty(candidate)) {
    candidates[candidate] += 1;
    console.log(`You voted for ${candidate}.`);
    localStorage.setItem("candidates", JSON.stringify(candidates));
  } else {
    console.log(`Sorry, ${candidate} is not a valid candidate.`);
  }
}

// Call the vote function with the user's choice
vote("A");  // Example vote for candidate A