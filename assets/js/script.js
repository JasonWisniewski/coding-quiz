// global variables 
var startQuizButton = document.getElementById("start-quiz");
var answerButtons = document.querySelector(".answer-div");
var beginingMessage = document.getElementById("begining-message");
var questionTitle = document.querySelector(".question-title");
var highScoreDiv= document.getElementById("high-score-div");
var highScoresList = document.getElementById('high-scores-list');
var yourScoreDisplay = document.getElementById('your-score');
var initialsInput = document.querySelector(".input-initials"); //inpKey
var submitInitialsButton = document.getElementById("submit-initials-btn");
var questionAnswer = document.getElementById("question-answer-correct");
var currentIndex = 0;
var timerEl = document.getElementById('countdown');
var timeLeft = 30;
var playerScore = 0;
// array of qeustions to pull from in below functions
var questionArray= [
  {
    question: "True or false? new Date() is the same as moment().",
    choices: ["True","False"],
    answer: "False"
  },
  {
    question: "Which Moment.js method would help us get how many days away a date is?",
    choices: [".isAfter()",".auditTask()","Math.abs(moment).isBefore()",".diff()"],
    answer: ".diff()"
  },
  {
    question: "Which of the following events is NOT an event on the sortable widget?",
    choices: ["activate","hover","out","update"],
    answer: "hover"
  },
  {
    question: "Which of the following is NOT an advantage of Moment.js?",
    choices: ["Parsing dates is easier","Setting timers is easier","Manipulating dates is easier.","Formatting dates is easier."],
    answer: "Setting timers is easier"
  }
]
// start quiz function
var startQuiz = function (){

  // get hide origonal message when start clicked
  beginingMessage.className = "hidden" //.setAttribute("class", "hidden") also works

  // count down timer for quiz, when start clicked timer starts
  var timerCountdown = setInterval(function(){ 
    timerEl.textContent = timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timerCountdown);
      endGame ();
      // if you get an answer wrong take 5 seconds off
      // end of game, load score into local storage and display high scores
    };
  },1000)

  // hide start quiz button by changing class to hidden in css
  startQuizButton.className = "hidden";

  // call next question function to recieve next question
  setNextQuestion()
};

var setNextQuestion = function() {
  var currentQuestion = questionArray[currentIndex];
  questionTitle.textContent = currentQuestion.question;

  for(var i = 0; i< currentQuestion.choices.length; i++) {
    // using a new div to show questions since origional has been hidden
    var element = currentQuestion.choices[i];

    var choiceButton = document.createElement("button");
    choiceButton.textContent = element;
    answerButtons.appendChild(choiceButton);
    choiceButton.addEventListener('click',evaluateChoice);
  };
};

var evaluateChoice = function (){
  // check array for if player ansewr is correct
  if(this.textContent === questionArray[currentIndex].answer) {
    // add 10 to player score and disaply correct answer
    playerScore = playerScore + 10;
    questionAnswer.textContent="Correct"
      setTimeout(function(){
      questionAnswer.textContent= "";
    },1500);
  } else {
    // subtract 10 seconds from countdown timer and disaply wrong for 1.5secs
    timeLeft = timeLeft - 10;
    questionAnswer.textContent = "Wrong";
    setTimeout(function(){
      questionAnswer.textContent= "";
    },1500);
  }
  // add one to index and push back into for loop above
  currentIndex += 1;

  answerButtons.innerHTML= "";

  if(currentIndex === questionArray.length){
    endGame();
  } else {setNextQuestion();
  };
}

var endGame = function (){
  // hides quesition buttons and quesitons when game is over
  answerButtons.className = "hidden";
  questionTitle.className = "hidden";
  timerEl.className = "hidden";
  clearInterval(startQuiz);

  // clalulate player final score based off player score and timeleft
  finalScore = playerScore;

  // if timer has run out do not show twice
  if (timeLeft = 0) 
    {
  };

  // show highscores message when game is over
  highScoreDiv.className = "show";

  // dispaly your score
  yourScoreDisplay.innerHTML = "Your final score is " + finalScore + " !";

  //console.log('final score',finalScore);
  
  submitInitialsButton.onclick = function () {
    
    // creating highscores variable that gets high scores from local storage if it doesn't return anything empty array
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // creating a score object for player to store initials and score
    score = {
      score: finalScore,
      name: initialsInput.value
    };
    
    // push players initlas and score object into high scores array in local storage
    highScores.push(score);

    // ordering high scores form highest to lowest by going through high scores
    highScores.sort( function(a,b) {
      return b.score - a.score;
    });

    //  cut off high scores at top 8
    highScores.splice(8);

    // saving highscores in local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));    
    console.log('high scores', highScores);
    // displaying high scores on page, converting from local storage to html
    highScoresList.innerHTML = highScores
      .map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`; 
      })
    .join("");
  };
};
startQuizButton.onclick = startQuiz;



