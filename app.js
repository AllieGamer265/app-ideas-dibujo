const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const resultText = document.getElementById('result-text');

let userChoices = {};

const questions = [
    {
        id: 'mood',
        question: '¿Qué tipo de ambiente te gustaría dibujar?',
        options: ['Misterioso y oscuro', 'Alegre y vibrante', 'Tranquilo y sereno', 'Mágico y etéreo']
    },
    {
        id: 'color',
        question: 'Elige una paleta de colores:',
        options: ['Tonos fríos (azules, violetas)', 'Tonos cálidos (rojos, naranjas)', 'Tonos tierra (verdes, marrones)', 'Colores pastel']
    },
    {
        id: 'element',
        question: '¿Qué elemento principal quieres en tu dibujo?',
        options: ['Un personaje', 'Un paisaje', 'Un animal', 'Un objeto fantástico']
    }
];

const ideas = {
    'Misterioso y oscuro': {
        'Tonos fríos (azules, violetas)': {
            'Un personaje': 'Un hechicero antiguo en una biblioteca iluminada por la luna.',
            'Un paisaje': 'Un bosque neblinoso a medianoche con extrañas luces flotando.',
            'Un animal': 'Un cuervo con ojos brillantes posado sobre una lápida.',
            'Un objeto fantástico': 'Un reloj de arena antiguo cuyo interior es una galaxia.'
        },
        'Tonos cálidos (rojos, naranjas)': {
            'Un personaje': 'Un herrero forjando una espada en las profundidades de un volcán.',
            'Un paisaje': 'La silueta de una ciudad en ruinas contra un cielo rojo apocalíptico.',
            'Un animal': 'Un fénix resurgiendo de sus cenizas en una cueva oscura.',
            'Un objeto fantástico': 'Una lámpara de aceite que proyecta sombras danzantes que cuentan una historia.'
        },
        // Add more combinations...
    },
    'Alegre y vibrante': {
        'Tonos cálidos (rojos, naranjas)': {
            'Un personaje': 'Un músico callejero tocando con pasión en un festival de verano.',
            'Un paisaje': 'Un mercado de flores exóticas en una ciudad costera al atardecer.',
            'Un animal': 'Un zorro juguetón saltando entre campos de amapolas.',
            'Un objeto fantástico': 'Una cometa con forma de dragón volando sobre un campo de girasoles.'
        },
        'Colores pastel': {
            'Un personaje': 'Una niña en un vestido de verano persiguiendo mariposas en un prado.',
            'Un paisaje': 'Una tienda de dulces con frascos de todos los colores y formas.',
            'Un animal': 'Un unicornio bebiendo de un arroyo de aguas cristalinas.',
            'Un objeto fantástico': 'Un carrusel mágico con animales que parecen de cristal.'
        },
        // Add more combinations...
    },
     // Add more moods...
};

let currentQuestionIndex = 0;

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    userChoices = {};
    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.innerText = question.question;
    optionsContainer.innerHTML = '';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(question.id, option));
        optionsContainer.appendChild(button);
    });
}

function selectOption(questionId, option) {
    userChoices[questionId] = option;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    const mood = userChoices['mood'];
    const color = userChoices['color'];
    const element = userChoices['element'];

    let idea = 'No pudimos generar una idea con esas opciones. ¡Intenta otra combinación!';
    
    if (ideas[mood] && ideas[mood][color] && ideas[mood][color][element]) {
        idea = ideas[mood][color][element];
    } else {
        // Fallback to a more generic idea if the specific combination doesn't exist
        const moodIdeas = ideas[mood];
        if (moodIdeas) {
            const randomColor = Object.keys(moodIdeas)[0];
            const randomElement = Object.keys(moodIdeas[randomColor])[0];
            idea = moodIdeas[randomColor][randomElement] + ' (¡Una idea adaptada para ti!)';
        }
    }

    resultText.innerText = idea;
}

function restartQuiz() {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}
