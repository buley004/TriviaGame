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
    { q: 'Who sang the 2000 hit song "Who Let the Dogs Out?"', as: ['Lou Bega', 'Island Boyz', 'Baha Men', 'Lil Bow Wow'], a: 2 },
    { q: 'Which jazz musician recorded the 1973 album "Land of Make Believe"?', as: ['Miles Davis', 'Chuck Mangione', 'Herbie Hancock', 'Jaco Pastorius'], a: 1 },
    { q: 'Who is the youngest person to ever win a Grammy Award?', as: ['Leah Peasall', 'LeAnn Rimes', 'Lorde', 'Janet Jackson'], a: 0},
    { q: 'Which country music superstar sings the lyric: "red solo cup, Ill fill you up, lets have a party"?', as: ['Jason Aldean', 'Toby Keith', 'Brad Paisley', 'Travis Tritt'], a: 1},
    { q: 'Who of the following was never a member of The Beatles?', as: ['Stuart Sutcliffe', 'Pete Best', 'Chas Newby', 'Mark Burroughs'], a: 3},
    { q: 'Which French composer wrote the movement "Clair De Lune"?', as: ['Claude Debussy', 'Maurice Ravel', 'Georges Bizet', 'Jaques Offenbach'], a: 0}
];

function reset() {
    //empty all page divs
    $('#question').empty();
    $('#answers').empty();
    $('#result').empty();
    $('#answer').empty();
    $('#correct-img').empty();
};

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function loadTimer() {
    //initialize timer to max time
    timeLeft = maxTime;
    $('#timer').text("You have " + timeLeft + " seconds remaining");
    
    //begin countdown
    timer = setInterval(function() {
        timeLeft--;
        $('#timer').text("You have " + timeLeft + " seconds remaining");
        //end timer at 0 
        if (timeLeft == 0) {
            loadResult();
            clearInterval(timer);
            noAns++;
        }
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
        
        //add css to options on hover state
        opt.hover(function(){
            $(this).addClass('hover');
        }, function(){
            $(this).removeClass('hover');
        });
        
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

    //display message if time ran out
    if (timeLeft == 0) {
        $('#result').text("Time's up!");
        $('#answer').text('The correct answer is ' + rightAnswer);
    }
    //check if answer is correct
    else if (correct) {
        $('#result').text('Correct!');
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

    //shuffle questions
    shuffleArray(questions);

    //start the game
    loadQuestion();
});

//check answer on click
$('#answers').on('click', function () {

    //stop timer
    clearInterval(timer);
    
    //record choice
    var chosen = $(event.target).attr('data-num');
    console.log(event.target);
    console.log($(event.target).text());

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
    shuffleArray(questions);
    loadQuestion();
});