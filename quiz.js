document.getElementById("quizQuestions").hidden = true;
document.getElementById("endPage").hidden = true;
document.getElementById("showHighScores").hidden = true;

const question = document.querySelector('#question');
const choice = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let highScoresList = [{ score: 0, name: "" }, { score: 0, name: "" }, { score: 0, name: "" }, { score: 0, name: "" }]

let questions = [
    {
        question: 'What is the capital of Equador?',
        choice1: 'Nuuk',
        choice2: 'Quito',
        choice3: 'Suva',
        choice4: 'San Salvador',
        answer: 2
    },
    {
        question: 'What is the capital of Argentina?',
        choice1: 'Tbilisi',
        choice2: 'Buenos Aires',
        choice3: 'Port-of-Spain',
        choice4: 'Vientiane',
        answer: 2
    },
    {
        question: 'What is the capital of Venezuela?',
        choice1: 'Praia',
        choice2: 'Apia',
        choice3: 'San Juan',
        choice4: 'Caracas',
        answer: 4
    },
    {
        question: 'What is the capital of Uruguay?',
        choice1: 'Montevideo',
        choice2: 'Brades',
        choice3: 'Managua',
        choice4: 'Philipsburg',
        answer: 1
    },
    {
        question: 'What is the capital of Colombia?',
        choice1: 'San Juan',
        choice2: 'Yaren',
        choice3: 'Bogota',
        choice4: 'Belmopan',
        answer: 3
    },
    {
        question: 'What is the capital of Guyana?',
        choice1: 'Maseru',
        choice2: 'Georgetown',
        choice3: 'Port Louis',
        choice4: 'Victoria',
        answer: 2
    },
    {
        question: 'What is the capital of Brazil?',
        choice1: 'Brasília',
        choice2: 'Rio de Janeiro',
        choice3: 'Cockburn Town',
        choice4: 'Manama',
        answer: 1
    },
    {
        question: 'What is the capital of Bolivia?',
        choice1: 'Basseterre',
        choice2: 'Manila',
        choice3: 'Castries',
        choice4: 'Sucre',
        answer: 4
    },
    {
        question: 'What is the capital of Suriname?',
        choice1: 'Sanaa',
        choice2: 'Porto-Novo',
        choice3: 'Paramaribo',
        choice4: 'Libreville',
        answer: 3
    },
    {
        question: 'What is the capital of Chile?',
        choice1: 'Kampala',
        choice2: 'Santiago',
        choice3: 'San Salvador',
        choice4: 'Ulaanbaatar',
        answer: 2
    },
    {
        question: 'What is the capital of Peru?',
        choice1: 'Colombo',
        choice2: 'Tegucigalpa',
        choice3: 'Dili',
        choice4: 'Lima',
        answer: 4
    },
    {
        question: 'What is the capital of French Guyana?',
        choice1: 'Avarua',
        choice2: 'Charlotte Amalie',
        choice3: 'Brades',
        choice4: 'Cayenne',
        answer: 4
    },
    {
        question: 'What is the capital of Paraguay?',
        choice1: 'Asunción',
        choice2: 'Papeete',
        choice3: 'Tarawa',
        choice4: 'Monrovia',
        answer: 1
    },
    {
        question: 'What is the capital of the Falkland Islands?',
        choice1: 'Honiara',
        choice2: 'Port Louis',
        choice3: 'Stanley',
        choice4: 'Alofi',
        answer: 3
    },
    {
        question: 'What is the capital of South Georgia and the South Sandwich Islands?',
        choice1: 'Flying Fish Cove',
        choice2: 'King Edward Point',
        choice3: "Saint John's",
        choice4: 'Adamstown',
        answer: 2
    }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 15;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return endQuiz()
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choice.forEach((choice, index) => {
        const number = choice.dataset['number'];
        choice.textContent = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choice.forEach(choice => {
    choice.addEventListener('click', e => {
        console.log(e.target)
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        console.log(typeof selectedAnswer)

        let classToApply = Number(selectedAnswer) === currentQuestion.answer ? 'correct' : 'incorrect';

        console.log(classToApply);

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        // selectedChoice.parentElement.classList.add(classToApply);
        selectedChoice.style.background = classToApply === 'correct' ? 'linear-gradient(32deg, #86efac, #86efac)' : 'linear-gradient(32deg, #d97706, #d97706)';

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            selectedChoice.style.background = '';
            getNewQuestion();
        }, 200);
    });
});

incrementScore = num => {
    console.log(num);
    score += num;
    scoreText.innerText = score;
    console.log(num);
};

function quizStart() {
    document.getElementById("quizQuestions").hidden = false;
    document.getElementById("homePage").hidden = true;
    document.getElementById("endPage").hidden = true;
    document.getElementById("showHighScores").hidden = true;
}

function showHighScores() {
    document.getElementById("quizQuestions").hidden = true;
    document.getElementById("homePage").hidden = true;
    document.getElementById("endPage").hidden = true;
    document.getElementById("showHighScores").hidden = false;
}

function endQuiz() {
    document.getElementById("quizQuestions").hidden = true;
    document.getElementById("homePage").hidden = true;
    document.getElementById("endPage").hidden = false;
    document.getElementById("showHighScores").hidden = true;
}

function showHomePage() {
    document.getElementById("quizQuestions").hidden = true;
    document.getElementById("homePage").hidden = false;
    document.getElementById("endPage").hidden = true;
    document.getElementById("showHighScores").hidden = true;
}

function setHighScoreList() {
    let scores = [];
    for (i in highScoresList) {
        x = highScoresList[i].score;
        scores.push(x)
    }
    scores = scores.sort()
    first = (scores[0])
    second = (scores[1])
    third = (scores[2])
    fourth = (scores[3])
    console.log(first + " first")
    console.log(scores + " score list ")

    document.getElementById("scoreOne").innerText = first
    document.getElementById("scoreTwo").innerText = second
    document.getElementById("scoreThree").innerText = third
    document.getElementById("scoreFour").innerText = fourth
}

function saveScore(num, user) {
    num = document.getElementById(num).innerText
    user = document.getElementById(user).innerText
    let obj = { score: num, name: user }
    highScoresList = highScoresList.push(obj);
    console.log(highScoresList)
    setHighScoreList()
}

setHighScoreList()
startGame();

