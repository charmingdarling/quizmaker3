// Local Scope Variables//
let qIndex = 0;
const timerEl = document.querySelector(".timer");
let secondsLeft = 100;
const start = document.querySelector(".startcontainer");
const beginButton = document.querySelector("#beginbutton");
const quiz = document.querySelector(".quizcontainer");
const answerSection = document.querySelector("#answerbank");
const feedback = document.querySelector("#feedback");
const score = document.querySelector(".finalscorecontainer");
const finalScore = document.querySelector("#finalscore");
const initialsInput = document.querySelector(".initials");
const submissionForm = document.querySelector(".enterscore");
const boardList = document.querySelector(".boardlist");
const scoreList = document.querySelector(".scorelist");
const restart = document.querySelector(".restart");
const reset = document.querySelector(".resetscores");
let scoreNumber = 0;
let highScores = JSON.parse(localStorage.getItem("highScore")) || [];

// Load Local Storage //
addEventListener("DOMContentLoaded", () => {
  console.log("Loading DOM");

  //Questions, Answers, Correct Answer//
  const questionBank = [
    {
      question:
        "The ___________ type respresents a logical entity and is inhabited by two values: true and false?",
      answers: ["Boolean", "String", "Number", "Undefined"],
      correct: 0,
    },
    {
      question: "What would you use when recalling an 'id'?",
      answers: [".", "@", "#", "~"],
      correct: 1,
    },
    {
      question:
        "A __________ is a function that's passed into another function, with the expectation that the ________ will be called at the appropriate time.",
      answers: ["hollerback", "primitive", "iteration", "callback"],
      correct: 3,
    },
    {
      question:
        "_____________ ____________ is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events while that task runs.",
      answers: [
        "Synchronous programming",
        "Asynchronous programming",
        "Redundant programming",
        "None of the above",
      ],
      correct: 1,
    },
    {
      question:
        "What is a cross-platform, object-oriented scripting language used to make webpages interactive",
      answers: ["HTML", "JavaScript", "CSS", "The Internet"],
      correct: 1,
    },
  ];

  //Timer Display//
  function timerSet() {
    timerInterval = setInterval(function () {
      setSecondsLeft(secondsLeft - 1);
      if (secondsLeft === 0) {
        console.log("Time is up");
        sendMessage();
        endquiz();
      }
    }, 1000);
  }

  function setSecondsLeft(value) {
    secondsLeft = value;
    timerEl.textContent = secondsLeft + " seconds left.";
  }

  function sendMessage() {
    timerEl.textContent = "Time's up!";
  }

  // Start Section //
  function startQuiz() {
    start.classList.add("hidden");
    quiz.classList.remove("hidden");
    timerSet();

    // qIndex = 0; // restart the q_index to [0]
    // secondsLeft = 100; // Refers to global scope now without the "let"
    showNextQuestion();
  }

  beginButton.addEventListener("click", startQuiz);

  function showNextQuestion() {
    const question = document.querySelector("#question");
    let currentQuestion = questionBank[qIndex];
    question.textContent = currentQuestion.question;
    answerbank.innerHTML = "";

    for (var i = 0; i < currentQuestion.answers.length; i++) {
      const answerButton = document.createElement("button");
      let answer = currentQuestion.answers[i];
      answerButton.setAttribute("class", "data");
      answerButton.setAttribute("data", i);
      // answerButton.textContent = question.answers[i];
      answerButton.textContent = i + 1 + ". " + answer;
      answerSection.appendChild(answerButton);
      answerButton.addEventListener("click", checkAnswers);
    }
  }

  // Compare correct/wrong answers from user
  function checkAnswers(event) {
    let answer = event.target.getAttribute("data");
    const feedback = document.querySelector("#feedback");
    if (parseInt(answer, 10) === questionBank[qIndex].correct) {
      feedback.textContent = "You got it!";
    } else {
      feedback.textContent = "Whoops...";
      setSecondsLeft(secondsLeft - 10);
    }
    qIndex++;
    if (qIndex >= questionBank.length) {
      endquiz();
    } else {
      showNextQuestion();
    }
  }

  // Endquiz //
  const endquiz = function () {
    console.log("Quiz is over");
    quiz.classList.add("hidden");
    score.classList.remove("hidden");
    finalScore.textContent = secondsLeft;
    // scoreNumber = secondsLeft;
    clearInterval(timerInterval); //<It isn't clearing or stopping.
  };

  // Save High Score //
  submissionForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Preventing the form from submitting.
    console.log(secondsLeft); // Showing secondsLeft aka score
    console.log(submissionForm.initials.value); // Showing user's name/initials
    let initials = submissionForm.initials.value; // ? is this correct?
    scoreNumber = secondsLeft;
    highScores.push({ initials, scoreNumber }); //Pushing on scoreNumber to array of highScores = ["initials"]
    localStorage.setItem("highScore", JSON.stringify(highScores)); // ? Does this mean that localStorage will find both initials/scoreNumber to display
    showHighScoreBoard();
  });

  //Score List//
  function showHighScoreBoard() {
    const table = document.querySelector("#table");
    score.classList.add("hidden");
    boardList.classList.remove("hidden");
    const lastScore = document.querySelector(".lastScore");
    lastScore.innerHTML = "";

    highScores.sort((a, b) => b.scoreNumber - a.scoreNumber); // Sorts scores. Understands that the value to right of '-' is less than b, sort() modifies the original (highScores)

    console.log(highScores.length > 9 ? 10 : highScores.length); // Replacement. Logic similar for Line 174 and 167

    let loops = 0;
    if (highScores.length > 9) {
      loops = 10;
    } else {
      loops = highScores.length;
    }

    for (var i = 0; i < loops; i++) {
      console.log(i);

      let tempTR = document.createElement("tr");
      let tempTDscoreNumber = document.createElement("td");
      let tempTDinitials = document.createElement("td");
      tempTDscoreNumber.textContent = highScores[i].scoreNumber;
      tempTDinitials.textContent = highScores[i].initials;
      tempTR.appendChild(tempTDscoreNumber);
      tempTR.appendChild(tempTDinitials);
      table.appendChild(tempTR);
    }
  }

  // Return to Start
  restart.addEventListener("click", returnStart);

  function returnStart() {
    boardList.classList.add("hidden");
    start.classList.remove("hidden");
    reinitialize();
  }

  function reinitialize() {
    setSecondsLeft(100); //? Passing in "100" value
    qIndex = 0;
  }

  reset.addEventListener("click", resetScoreBoard);

  function resetScoreBoard() {
    localStorage.setItem("highScore", JSON.stringify([]));
    highScores = []; // Resetting highScores to an empty value.
  }
});

// Place in new score
// Sort Table
// (Futuristic, if a billion people, you could figure out how to sort faster, how would you do it, efficiently)
// Cut it to the top 10 people
// Figure out the 10th place person, if the new score is better than this person, then insert this person and delete the last dude
