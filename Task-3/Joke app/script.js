const setupEl = document.getElementById("setup");
const punchlineEl = document.getElementById("punchline");
const getJokeBtn = document.getElementById("getJokeBtn");
const showPunchlineBtn = document.getElementById("showPunchlineBtn");

async function fetchJoke() {
  try {
    setupEl.textContent = "Loading joke... 😂";
    punchlineEl.classList.add("hidden");
    punchlineEl.textContent = "";

    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await response.json();

    setupEl.textContent = data.setup;
    punchlineEl.textContent = data.punchline;

    showPunchlineBtn.style.display = "inline-block";
  } catch (error) {
    setupEl.textContent = "Failed to fetch joke. Try again!";
    punchlineEl.classList.add("hidden");
    showPunchlineBtn.style.display = "none";
  }
}

function showPunchline() {
  punchlineEl.classList.remove("hidden");
  showPunchlineBtn.style.display = "none";
}

// Event listeners
getJokeBtn.addEventListener("click", fetchJoke);
showPunchlineBtn.addEventListener("click", showPunchline);
