// global variables 
var startQuizButton = document.getElementById("start-quiz");
var answerButtons = document.querySelector(".answer-div");
var beginingMessage = document.getElementById("begining-message");
var questionElement = document.getElementById("questions");
var questionTitle = document.querySelector(".question-title");
var highScoreDiv= document.getElementById("high-score-div");
var highScoreTitle = document.querySelector(".high-score-title");

// grabbing the timer text of html

var currentIndex = 0;

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
    choices: ["Parsing dates is easier","Setting timers is easier","Manipulating dates (adding or subtracting days) is easier.","Formatting dates is easier."],
    answer: "Setting timers is easier"
  }
]

var timerEl = document.getElementById('countdown');
var timeLeft = 60;
var playerScore = 0;


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
  console.log('current question', currentQuestion);
  questionTitle.textContent = currentQuestion.question;
  console.log('question title',currentQuestion.question);

  for(var i = 0; i< currentQuestion.choices.length; i++) {
    // using a new div to show questions since origional has been hidden
    var element = currentQuestion.choices[i];
    console.log('element',element);

    var choiceButton = document.createElement("button");
    choiceButton.textContent = element;
    answerButtons.appendChild(choiceButton);
    choiceButton.addEventListener('click',elvaluateChoice);

    // we need to connect answer buttons with questionArray[0].ansewrs
    console.log('answerbuttons',answerButtons);
  };
};

var elvaluateChoice = function (){
  console.log(this);

  if(this.textContent === questionArray[currentIndex].answer) {
    questionTitle.textContent = "you got that right, way to go buddy!"
    playerScore = playerScore + 10;
  } else {
    // subtract 10 seconds from countdown timer
    timeLeft = timeLeft - 10;
  }
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

  // clalulate player final score based off player score and timeleft
  finalScore = playerScore;
  // if timer has not run out reduce to zero
  timeLeft = 0;

  console.log('final score',finalScore);

  playerInitials = window.prompt('please enter your initials');
  console.log('initilas', playerInitials);
  // show highscores message when game is over
  highScoreDiv.className = "show";

  // creating highscores variable that gets high scores from local storage
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  console.log('highscores',highScores);

  // creating a score object for player to store initials and score
  score = {
    score: finalScore,
    name: playerInitials
  };
  
  // push players initlas and score object into high scores
  highScores.push(score);
  console.log('high scores array', highScores);

  // ordering high scores form highest to lowest
  highScores.sort( function(a,b) {
    return b.finalscore - a.finalScore;
  });

  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));

  // submitInitialsButton.onclick = "heyyyy";
  // console.log('submit initials submit clickec', submitInitialsButton);
};

// submitInitialsButton.onclick = console.log('submit initials submit clickec', submitInitialsButton);

var submitInitialsButton = document.querySelector(".submit-initials-button")


startQuizButton.onclick = startQuiz;



