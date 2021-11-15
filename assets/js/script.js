// global variables 
var startQuizButton = document.getElementById("start-quiz");
// grabbing the timer text of html
var question = document.getElementById("questions")
var question1 = "question1"
var timerEl = document.getElementById('countdown');
var questionContainer =document.getElementById('question-container');
var timeLeft = 60;

function startQuiz(){
  console.log("click")

  // count down timer for quiz, when start clicked timer starts
  var timerCountdown = setInterval(function(){ 
    timerEl.textContent = timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timerCountdown);
      // if you get an answer wrong take 5 seconds off
      // end of game, load score into local storage and display high scores
    };
  },1000)

  // creating answer buttons when start quiz is clicked.
  var answerButton1 = document.createElement("button");
  answerButton1.className = "button";
  questionContainer.appendChild(answerButton1);
  answerButton1.textContent = "answer 1";

  var answerButton2 = document.createElement("button");
  answerButton2.className = "button";
  questionContainer.appendChild(answerButton2);
  answerButton2.textContent = "answer 2";

  var answerButton3 = document.createElement("button");
  answerButton3.className = "button";
  questionContainer.appendChild(answerButton3);
  answerButton3.textContent = "answer 3";

  var answerButton4 = document.createElement("button");
  answerButton4.className = "button";
  questionContainer.appendChild(answerButton4);
  answerButton4.textContent = "answer 4";

  // hide start quiz button by changing class to hidden in css
  startQuizButton.className = "hidden";

  // cycle through questions
  question.append(question1);
  


  // need to create buttons when start clicked


};
// call the function above to complete function when clicked
startQuizButton.onclick = startQuiz;

// go through taskinator to get new elements to come up
// use arrays to cycle through arrays, arrays can be objects with questions and possible choices.

// after click start need to add extra buttons

// start button starts a timer

