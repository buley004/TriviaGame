// track right and wrong answers
var right = 0;
var wrong = 0;
var noAns = 0;
var qnum = 0;

//store index of correct answer
var anum;
var rightAnswer;

var correct;


//set timer and delay
var maxTime = 15;
var timeLeft = maxTime;
var timer;
var delay = 3500;

//question bank
var questions = [
    { q: 'Who sang the 2000 hit song "Who Let the Dogs Out?"', as: ['Lou Bega', 'Island Boyz', 'Baha Men', 'Lil Bow Wow'], a: 'Baha Men', p: 'assets/images/bahamen.gif' },
    { q: 'Which jazz musician recorded the 1973 album "Land of Make Believe"?', as: ['Miles Davis', 'Chuck Mangione', 'Herbie Hancock', 'Jaco Pastorius'], a: 'Chuck Mangione', p: 'assets/images/chuck.gif' },
    { q: 'Who is the youngest person to ever win a Grammy Award?', as: ['Leah Peasall', 'LeAnn Rimes', 'Shirley Temple', 'Janet Jackson'], a: 'Leah Peasall', p: 'assets/images/pea.jpg' },
    { q: 'Which country music superstar sings the lyric: "Red solo cup, I\'ll fill you up, let\'s have a party"?', as: ['Jason Aldean', 'Toby Keith', 'Brad Paisley', 'Travis Tritt'], a: 'Toby Keith', p: 'assets/images/toby.gif' },
    { q: 'Who of the following was never a member of The Beatles?', as: ['Stuart Sutcliffe', 'Pete Best', 'Chas Newby', 'Mark Burroughs'], a: 'Mark Burroughs', p: 'assets/images/beatles.gif' },
    { q: 'Which French composer wrote the movement "Clair De Lune"?', as: ['Claude Debussy', 'Maurice Ravel', 'Georges Bizet', 'Jaques Offenbach'], a: 'Claude Debussy', p: 'assets/images/debussy.jpg' },
    { q: 'Who rocked down to Electric Avenue in 1982?', as: ['Eddy Grant', 'Billy Ocean', 'Jimmy Cliff', 'Peter Tosh'], a: 'Eddy Grant', p: 'assets/images/eddy.jpg'},
    { q: 'Which band features one set of twins and another pair of brothers?', as: ['The National', 'Radiohead', 'Kings of Leon', 'The Kinks'], a: 'The National', p: 'assets/images/nats.gif'},
    { q: 'Which song was Elvis Presley\'s first billboard #1 single?', as: ['I Forgot to Remember to Forget', 'Heartbreak Hotel', 'Don\'t Be Cruel', 'Hound Dog'], a: 'I Forgot to Remember to Forget', p: 'assets/images/elvis.gif'},
    { q: 'Who is not a member of the Oakland rap crew Hieroglyphics?', as: ['Del Tha Funky Homosapien', 'Domino', 'Pep Love', 'Eligh'], a: 'Eligh', p: 'assets/images/hiero.jpg'},
    { q: 'Which musician was born Marvin Lee Aday?', as: ['Meat Loaf', 'Alice Cooper', 'Sting', 'Slash'], a: 'Meat Loaf', p: 'assets/images/meat.gif'},
    { q: 'The poet Murray Head once said, "One Night in _________', as: ['Bangkok', 'Paris', 'London', 'Berlin'], a: 'Bangkok', p: 'assets/images/murray.jpg'},
    { q: 'Which of the following is not a Frank Zappa album?', as: ['Thing-Fish', 'Barn Door Open', 'Lumpy Gravy', 'Hot Rats'], a: 'Barn Door Open', p: 'assets/images/frank.gif'},
    { q: 'Which Australian band relased the 2012 album \'Beards, Wives, Denim\'?', as: ['Pond', 'Tame Impala', 'King Gizzard & The Lizard Wizard', 'The Murlocs'], a: 'Pond', p: 'assets/images/pond.gif'},
    { q: 'Which of the following songs was not produced by Kanye West?', as: ['Strawberry Bounce', 'Magic Man', 'Clockin Lotsa Dollarz', 'Devil in a New Dress'], a: 'Devil in a New Dress', p: 'assets/images/kanye.gif'}
];

function reset() {
    //empty all page divs
    $('#question').empty();
    $('#answers').empty();
    $('#result').empty();
    $('#answer').empty();
    $('#correct-img').attr('src', '');
};

/*
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
    timer = setInterval(function () {
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

    //shuffle answer options
    shuffleArray(questions[qnum].as);

    //load answer options
    for (let i = 0; i < questions[qnum].as.length; i++) {
        var opt = $('<div>');
        opt.attr('data-num', i);
        opt.attr('class', 'option');
        opt.text(questions[qnum].as[i]);

        //add css to options on hover state
        opt.hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });

        $('#answers').append(opt);
    }

    //set answer
    for (let i = 0; i < questions[qnum].as.length; i++) {
        if (questions[qnum].as[i] == questions[qnum].a) {
            rightAnswer = questions[qnum].as[i];
        }
    }
};

function loadResult() {

    //clear question
    $('#question').empty();
    $('#answers').empty();
    
    //display answer image
    $('#correct-img').attr('src', questions[qnum].p);

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

    if (qnum < questions.length) {
        setTimeout(loadQuestion, delay);
    }
    //load reset screen if all questions answered
    else {
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
$(document).on('click', '.option', function () {
    //stop timer
    clearInterval(timer);

    //record choice
    var chosen = $(event.target).text();

    //check if correct
    if (chosen == rightAnswer) {
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
$('#restart').on('click', function () {
    $(this).empty();
    restart();
    shuffleArray(questions);
    loadQuestion();
});