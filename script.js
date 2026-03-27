const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Home Tool Markup Language",
      "Hyperlink Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "Python", "C++"],
    correct: 1
  },
  {
    question: "Which language is used to make websites interactive?",
    options: ["Java", "JavaScript", "C", "SQL"],
    correct: 1
  },
  {
    question: "Which tag is used to insert an image in HTML?",
    options: ["<img>", "<image>", "<pic>", "<src>"],
    correct: 0
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font-style", "text-color", "color", "background"],
    correct: 2
  }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question");
const optionsBox = document.getElementById("options-box");
const scoreText = document.getElementById("score-text");

let currentQuestion = 0;
let score = 0;

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  startScreen.classList.add("hide");
  quizScreen.classList.remove("hide");
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  optionsBox.innerHTML = "";
  nextBtn.style.display = "none";

  const quiz = quizData[currentQuestion];
  questionNumber.innerText = `Question ${currentQuestion + 1} of ${quizData.length}`;
  questionText.innerText = quiz.question;

  quiz.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectAnswer(index, button));
    optionsBox.appendChild(button);
  });
}

function selectAnswer(selectedIndex, selectedButton) {
  const correctIndex = quizData[currentQuestion].correct;
  const allButtons = document.querySelectorAll(".option-btn");

  allButtons.forEach((btn, index) => {
    btn.disabled = true;

    if (index === correctIndex) {
      btn.classList.add("correct");
    }

    if (index === selectedIndex && selectedIndex !== correctIndex) {
      btn.classList.add("wrong");
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
  }

  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add("hide");
  resultScreen.classList.remove("hide");
  scoreText.innerText = `Your score: ${score}/${quizData.length}`;
}

function restartQuiz() {
  resultScreen.classList.add("hide");
  startScreen.classList.remove("hide");
}