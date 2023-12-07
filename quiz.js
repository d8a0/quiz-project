const question = document.querySelector('#question');
const choice = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the capital of Equador?',
        choiceOne: 'Nuuk',
        choiceTwo: 'Quito',
        choiceThree: 'Suva',
        choiceFour: 'San Salvador',
        answer: 'Quito'
    },
    {
        question: 'what is ...',
        choiceOne: 'x',
        choiceTwo: 'x',
        choiceThree: 'x',
        choiceFour: 'x',
        answer: ''
    },
    {
        question: 'what is ...',
        choiceOne: 'x',
        choiceTwo: 'x',
        choiceThree: 'x',
        choiceFour: 'x',
        answer: ''
    },
    {
        question: 'what is ...',
        choiceOne: 'x',
        choiceTwo: 'x',
        choiceThree: 'x',
        choiceFour: 'x',
        answer: ''
    },
    {
        question: 'what is ...',
        choiceOne: 'x',
        choiceTwo: 'x',
        choiceThree: 'x',
        choiceFour: 'x',
        answer: ''
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItems('mostRecentScore', score);
        return window.location.assign('/end.html');
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choice.forEach(choice => {
        const number = choice.innerText['number']
        choice.innerText = currentQuestion['word' + number]
    })
    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choice.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selected.innerText['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()

