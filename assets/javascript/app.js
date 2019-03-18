// track right and wrong answers
var right = 0;
var wrong = 0;
var qnum = 0;

//store index of correct answer
var anum;
var rightAnswer;

var correct;

var maxTime = 10;
var timeLeft = maxTime;
var timer;
var delay;

//question bank
var questions = [
    { q: 'what is the question', as: ['this?', 'trivia', 'question', 'other'], a: 0 },
    { q: 'where are we', as: ['here', 'nowhere', 'gone', 'nope'], a: 1 }
];

function reset() {
    $('#question').empty();
    $('#answers').empty();
    $('#result').empty();
    $('#answer').empty();
    $('#correct-img').empty();
};

function loadTimer() {
    timeLeft = maxTime;
    $('#timer').text("You have " + timeLeft + " seconds remaining");
    timeLeft--;
    timer = setInterval(function() {
        $('#timer').text("You have " + timeLeft + " seconds remaining");
        if (timeLeft == 0) {
            loadResult();
            clearInterval(timer);
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

    //clear 
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

    //move on to next question and load in 5 seconds
    qnum++;
    setTimeout(loadQuestion, 5000);
};


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

    //display correct if choice is right
    if (chosen == anum) {
        correct = true;
    }
    else {
        correct = false;
    }

    loadResult();
});