let timer = document.getElementById("timer");
let scoresDiv = document.getElementById("scores-div");
let buttonsDiv = document.getElementById("buttons");
let viewScoresBtn = document.getElementById("view-scores");
let homeMsg = document.getElementById("home-message")
let startBtn = document.getElementById("start-button");
startBtn.addEventListener("click", setTime);

var questionDiv = document.getElementById("question-div");
let results = document.getElementById("results");
var choices = document.getElementById("choices");

let secondsLeft = 76;

let emptyArray = [];

let storedArray = JSON.parse(window.localStorage.getItem("highScores"));

var questionCount = 0;

let score = 0

var myQuestions = [
	{
	  title: "Commonly used data types DO Not include which of the following?",
	  multiChoice: ["strings", "booleans", "alerts", "numbers"],
	  answer: "alerts"
	},
  
	{
	  title: "The condition in an if / else statement is enclosed with which of the following?",
	  multiChoice: ["quotes", "curly brackets", "parenthesis", "square brackets"],
	  answer: "parenthesis"
	},
  
	{
	  title: "Properties in a JavaScript object can be called which of the following?",
	  multiChoice: ["dot walking", "key-value pairs", "nested properties", "undefined"],
	  answer: "key-value pairs"
	},
  
	{
	  title: "Which array method inserts an element at the end of the array?",
	  multiChoice: [".pop()", ".push()", ".length", ".join()"],
	  answer: ".push()"
	}
  ];

//Timer starts when the user clicks startButton (see above).
function setTime() {
  displayQuestions();
  let timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "";
    timer.textContent = "Time: " + secondsLeft;
    if (secondsLeft <= 0 || questionCount === myQuestions.length) {
      clearInterval(timerInterval);
      captureUserScore();
    } 
  }, 1000);
}


   function displayQuestions() {
	removeEls(startBtn, homeMsg);
  
	if (questionCount < myQuestions.length) {
	  questionDiv.innerHTML = myQuestions[questionCount].title;
	  choices.textContent = "";
  
	  for (let i = 0; i < myQuestions[questionCount].multiChoice.length; i++) {
		let answerBtn = document.createElement("button");
		answerBtn.innerText = myQuestions[questionCount].multiChoice[i];
		answerBtn.setAttribute("data-id", i);
		answerBtn.addEventListener("click", function (event) {
		  event.stopPropagation();
  
		  if (answerBtn.innerText === myQuestions[questionCount].answer) {
			score += secondsLeft;
		  } else {
			score -= 10;
			secondsLeft = secondsLeft - 15;
		  }
		  
		  questionDiv.innerHTML = "";
  
		  if (questionCount === myQuestions.length) {
			return;
		  } else {
			questionCount++;
			displayQuestions();
		  }
		});
		choices.append(answerBtn);
	  }
	}
  }

  function captureUserScore() {
	timer.remove();
	choices.textContent = "";
  
	let initialsInput = document.createElement("input");
	let postScoreBtn = document.createElement("input");
  
	results.innerHTML = `You scored ${score} points! Enter initials: `;
	initialsInput.setAttribute("type", "text");
	postScoreBtn.setAttribute("type", "button");
	postScoreBtn.setAttribute("value", "Post My Score!");
	postScoreBtn.addEventListener("click", function (event) {
	  event.preventDefault();
	  let scoresArray = defineScoresArray(storedArray, emptyArray);
  
	  let initials = initialsInput.value;
	  let userAndScore = {
		initials: initials,
		score: score,
	  };
  
	  scoresArray.push(userAndScore);
	  saveScores(scoresArray);
	  displayAllScores();
	  clearScoresBtn();
	  goBackBtn();
	  viewScoresBtn.remove();
	});
	results.append(initialsInput);
	results.append(postScoreBtn);
  }
  
  const saveScores = (array) => {
	window.localStorage.setItem("highScores", JSON.stringify(array));
  }
  
  const defineScoresArray = (arr1, arr2) => {
	if(arr1 !== null) {
	  return arr1
	} else {
	  return arr2
	}
  }
  
  const removeEls = (...els) => {
	for (let el of els) el.remove();
  }
  
  function displayAllScores() {
	removeEls(timer, startBtn, results);
	let scoresArray = defineScoresArray(storedArray, emptyArray);
  
	scoresArray.forEach(obj => {
	  let initials = obj.initials;
	  let storedScore = obj.score;
	  let resultsP = document.createElement("p");
	  resultsP.innerText = `${initials}: ${storedScore}`;
	  scoresDiv.append(resultsP);
	});
  }
  
  function viewScores() {
	viewScoresBtn.addEventListener("click", function(event) {
	  event.preventDefault();
	  removeEls(timer, startBtn);
	  displayAllScores();
	  removeEls(viewScoresBtn, homeMsg);
	  clearScoresBtn();
	  goBackBtn();
	});
  }
  
  function clearScoresBtn() {    
	let clearBtn = document.createElement("input");
	clearBtn.setAttribute("type", "button");
	clearBtn.setAttribute("value", "Clear Scores");
	clearBtn.addEventListener("click", function(event){
	  event.preventDefault();
	  removeEls(scoresDiv);
	  window.localStorage.removeItem("highScores");
	})
	scoresDiv.append(clearBtn)
  }
  
  function goBackBtn() {
	let backBtn = document.createElement("input");
	backBtn.setAttribute("type", "button");
	backBtn.setAttribute("value", "Go Back");
	backBtn.addEventListener("click", function(event){
	  event.preventDefault();
	  window.location.reload();
	})
	buttonsDiv.append(backBtn)
  }
  
  
  viewScores();
