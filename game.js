const question = document.getElementById('question'),
choices = Array.from(document.getElementsByClassName('choice-text')),
scoreText = document.getElementById('score'),
questionCounterText = document.getElementById('questionCounter'),
progressBarFull = document.getElementById('progressBarFull'),
loader = document.getElementById('loader'),
game = document.getElementById('game');

let currentQuestion = {},
AcceptingAnswers = false,
score = 0,
questionCounter = 0,
avaiilableQuestions = [],
questions = [{
    question: 'Inside wich HTML element do we put Javascript?',
    choice1: '<script>',
    choice2: '<javascript>',
    choice3: '<js>',
    choice4: '<scripting>',
    answer: 1
},
{
    question: 'Choose the correct syntax for referring to external javascript file called "app.js"?',
    choice1: '<script name="app.js">',
    choice2: '<script href="app.js">',
    choice3: '<script src="app.js">',
    choice4: '<script file="app.js">',
    answer: 3
},
{
    question: 'How do you write "Hello World!" in an alert box?',
    choice1: 'prompt("Hello World!")',
    choice2: 'alert("Hello World!")',
    choice3: 'msBox("Hello World!")',
    choice4: 'showmsg("Hello World!")',
    answer: 2
},
{
    question: 'How to define a "myfunc" function in javascript?',
    choice1: 'func myfunc()',
    choice2: 'define myfunc()',
    choice3: 'function myfunc()',
    choice4: '$myfunc',
    answer: 3
},
{
    question: 'Difference between "Java" and "javascript"?',
    choice1: 'They are both same languages.',
    choice2: 'Completly different languages',
    choice3: 'java is not a language',
    choice4: 'javascript is not a language',
    answer: 2
}
];

// constants
const CORRECT_BONUS = 10,
MAX_QUESTIONS = questions.length;

startGame = () => {
    questionCounter = 0;
    score = 0;
    avaiilableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (avaiilableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    // Update the progress bar
    progressBarFull.style.width = (questionCounter / MAX_QUESTIONS) * 100 + '%';
    const questionIndex = Math.floor(Math.random() * avaiilableQuestions.length);
    currentQuestion = avaiilableQuestions[questionIndex]
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    avaiilableQuestions.splice(questionIndex, 1)
    AcceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!AcceptingAnswers) return;
        AcceptingAnswers = false
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number']
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        selectedChoice.parentElement.classList.add(classToApply);
        selectedChoice.style.color = 'white'
        
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS)
        }

        setTimeout(() => {
        selectedChoice.style.color = '#333'
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
        }, 1000);
    })
})

incrementScore = yourNum => {
    score += yourNum
    scoreText.innerText = score
}

window.onload = () => {
    setTimeout(() => {
    game.classList.remove('hidden')
    loader.classList.add('hidden')
    }, 1000)
    setTimeout(startGame, 1500)
}