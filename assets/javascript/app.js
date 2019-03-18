// track right and wrong answers
var right = 0;
var wrong = 0;
var noAns = 0;
var qnum = 0;

//store index of correct answer
var anum;
var rightAnswer;

var correct;

var maxTime = 10;
var timeLeft = maxTime;
var timer;
var delay = 2000;

//question bank
var questions = [
    { q: 'what is the question', as: ['this?', 'trivia', 'question', 'other'], a: 0 },
    { q: 'where are we', as: ['here', 'nowhere', 'gone', 'nope'], a: 1 }
];

function reset() {
    //empty all page divs
    $('#question').empty();
    $('#answers').empty();
    $('#result').empty();
    $('#answer').empty();
    $('#correct-img').empty();
};

function loadTimer() {
    //initialize timer to max time
    timeLeft = maxTime;
    $('#timer').text("You have " + timeLeft + " seconds remaining");
    
    //begin countdown
    timeLeft--;
    timer = setInterval(function() {
        $('#timer').text("You have " + timeLeft + " seconds remaining");
        //end timer at 0 
        if (timeLeft == 0) {
            loadResult();
            clearInterval(timer);
            noAns++;
        }
        timeLeft--;
    }, 1000)
}

function loadQuestion() {
    //empty fields
    reset();

    //set timer
    loadTimer();

    //load question
    $('#question').text(questions[qnum].q);

    //load answer options
    for (let i = 0; i < questions[qnum].as.length; i++) {
        var opt = $('<div>');
        opt.attr('data-num', i);
        opt.attr('class', 'option');
        opt.text(questions[qnum].as[i]);
        $('#answers').append(opt);
    }

    //set answer
    anum = questions[qnum].a;
    rightAnswer = questions[qnum].as[anum];
};

function loadResult() {

    //clear question
    $('#question').empty();
    $('#answers').empty();

    //check if answer is correct
    if (correct) {
        $('#result').text('Correct!');
    }
    //display message if time ran out
    else if (timeLeft == 0) {
        $('#result').text("Time's up!");
        $('#answer').text('The correct answer is ' + rightAnswer);
    }
    //display message if wrong answer is chosen
    else {
        $('#result').text('Nope!');
        $('#answer').text('The correct answer is ' + rightAnswer);
    }

    //move on to next question and load after delay
    qnum++;
    
    if (qnum < questions.length ) {
        setTimeout(loadQuestion, delay);
    }
    else {
        //load reset screen
        console.log("all done");

        setTimeout(endGame, delay);
    }
};

function endGame() {
    reset();
    
    //display stats
    $('#question').text("All done, here are your stats:");
    $('#stats').html("Wins: " + right + "<br>" + "Losses: " + wrong + "<br>" + "Unanswered: " + noAns); 

    //prompt restart
    $('#restart').text("Play again?");
};

function restart() {
    //reset all stats and counters
    right = 0;
    wrong = 0;
    noAns = 0;
    qnum = 0;
    reset();
    $('#stats').empty();
}


//initialize game on start button click
$('#start').on('click', function () {
    //hide start button
    $(this).hide();

    //start the game
    loadQuestion();
});

//check answer on click
$('#answers').on('click', function () {

    //stop timer
    clearInterval(timer);
    
    //record choice
    var chosen = $(event.target).attr('data-num');

    //check if correct
    if (chosen == anum) {
        correct = true;
        right++;
    }
    else {
        correct = false;
        wrong++;
    }

    //show result
    loadResult();
});

//restart game
$('#restart').on('click', function() {
    $(this).empty();
    restart();
    loadQuestion();

});