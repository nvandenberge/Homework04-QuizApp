const startOverBtn = document.getElementById("startOver");
const clearScoresBtn = document.getElementById("clearScores");
const highscores = document.querySelector(".highscores");

// Button that wipes localStorage and clears data on page
clearScoresBtn.addEventListener("click", function () {
  localStorage.clear();
  highscores.innerHTML = "";
});
// Button that brings user to quiz homepage
startOverBtn.addEventListener("click", function () {
  window.location.assign("index.html");
});

// Function that gets scores from localStorage, sorts by score, and displays in table
function displayHighscores() {
  if (localStorage.getItem("scores") === null) {
    scoresArr = [];
  } else {
    scoresArr = JSON.parse(localStorage.getItem("scores"));
  }
  scoresArr
    .sort((a, b) => b.score - a.score)
    .forEach((scores) => {
      let tableRow = document.createElement("tr");
      let tableRank = document.createElement("td");
      let tableInitials = document.createElement("td");
      let tableScore = document.createElement("td");

      highscores.append(tableRow);
      // Adding a one to index first so top rank does not show as 0
      tableRank.textContent = 1 + scoresArr.indexOf(scores);
      tableInitials.textContent = scores.initials;
      tableScore.textContent = scores.score;
      tableRow.append(tableRank, tableInitials, tableScore);
    });
}

displayHighscores();
