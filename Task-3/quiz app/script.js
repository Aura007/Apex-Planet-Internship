const quizData = [
  { question: "1. What is the capital of France?", options: ["Paris", "Rome", "Berlin", "Madrid"], answer: "Paris" },
  { question: "2. Who invented the light bulb?", options: ["Edison", "Tesla", "Newton", "Einstein"], answer: "Edison" },
  { question: "3. Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
  { question: "4. What is the national currency of Japan?", options: ["Yen", "Won", "Dollar", "Rupee"], answer: "Yen" },
  { question: "5. Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Milton", "Wordsworth", "Keats"], answer: "Shakespeare" },
  { question: "6. Which is the largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific" },
  { question: "7. What is the chemical symbol for Gold?", options: ["Au", "Ag", "Pb", "Pt"], answer: "Au" },
  { question: "8. In which year did World War II end?", options: ["1945", "1939", "1918", "1960"], answer: "1945" },
  { question: "9. Who is known as the father of computers?", options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"], answer: "Charles Babbage" },
  { question: "10. Which is the smallest prime number?", options: ["1", "2", "3", "5"], answer: "2" }
];

let currentQ = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restartBtn");
const scoreDisplay = document.getElementById("score-display");
const progressBar = document.getElementById("progress-bar");

function loadQuestion() {
  questionEl.textContent = quizData[currentQ].question;
  optionsEl.innerHTML = "";
  quizData[currentQ].options.forEach(opt => {
    const button = document.createElement("button");
    button.textContent = opt;
    button.onclick = () => selectAnswer(button, opt);
    optionsEl.appendChild(button);
  });

  updateProgress();
  updateScore();
}

function selectAnswer(button, selected) {
  const correctAnswer = quizData[currentQ].answer;

  Array.from(optionsEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
    if (btn.textContent === selected && selected !== correctAnswer) {
      btn.classList.add("wrong");
    }
  });

  if (selected === correctAnswer) {
    score++;
  }
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQ++;
  if (currentQ < quizData.length) {
    loadQuestion();
    nextBtn.style.display = "none";
  } else {
    quizEnd();
  }
});

function quizEnd() {
  document.getElementById("quiz").style.display = "none";
  resultEl.textContent = `🎉 You scored ${score} out of ${quizData.length}`;
  restartBtn.style.display = "inline-block";
}

restartBtn.addEventListener("click", () => {
  currentQ = 0;
  score = 0;
  document.getElementById("quiz").style.display = "block";
  resultEl.textContent = "";
  restartBtn.style.display = "none";
  loadQuestion();
  nextBtn.style.display = "none";
});

function updateProgress() {
  const progress = ((currentQ) / quizData.length) * 100;
  progressBar.style.width = progress + "%";
}

function updateScore() {
  scoreDisplay.textContent = `Current Score: ${score}`;
}

// Start quiz
loadQuestion();
