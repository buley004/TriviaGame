# triviagame

This is a fun music trivia game!  After clicking start, the user is show a series of music-related trivia question in a random order.  Each question has four answer options, which are also displayed in a random order.  The user has a set amount of time to answer each question, which is stored in the `maxTime` variable.  

If the user does not answer before time runs out, a time's up message is displayed.  If the user does respond, a message tells them if they were correct or wrong.  After every question, a picture or gif of the correct answer is displayed, and the next question is automatically shown.  The delay between questions is stored in the `delay` variable.

After all questions have been answered, the user's results are shown: number of right answers, number of wrong answers, and number of unanswered questions.  The user has the option to restart the game with the questions being shown in a new random order.