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
    question: "question 1",
    choices: ["correct","wrong","wrong","wrong"],
    answer: "correct"
  },
  {
    question: "question 2",
    choices: ["correct","wrong","wrong","wrong"],
    answer: "correct"
  },
  {
    question: "question 3",
    choices: ["correct","wrong","wrong","wrong"],
    answer: "correct"
  },
  {
    question: "question 4",
    choices: ["correct","wrong","wrong","wrong"],
    answer: "correct"
  }
]

var timerEl = document.getElementById('countdown');
var timeLeft = 6;
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
    playerScore= playerScore + 10;
  } else {
    // subtract 5 seconds from countdown timer
    timeLeft = timeLeft - 5;
  }
  currentIndex += 1;

  answerButtons.innerHTML= "";

  if(currentIndex === questionArray.length){
    endGame();
  } else {setNextQuestion();
  };

}

var endGame = function (){
  answerButtons.className = "hidden";
  questionTitle.className = "hidden";
  timeLeft = 0;

  highScoreDiv.className = "show";

  localStorage.setItem('initials', ([{'SP':30},{'JW': 40}]));
  localStorage.getItem('initials')

  console.log('endgame fxn', endGame);
// JSON.stringify <--- setting
// JSON.parse <--- getting

}


// run when user gets wrong answer, need to call in if statment in above fxn
var deductTime= function(currentTime) {
  currentTime - 5
};

var highScore = function() {
  //  localStorage.setItem("high scores", JSON.stringify(tasks));
};
// call the function above to complete function when clicked
startQuizButton.onclick = startQuiz;

// go through taskinator to get new elements to come up
// use arrays to cycle through arrays, arrays can be objects with questions and possible choices.

// after click start need to add extra buttons

// start button starts a timer

