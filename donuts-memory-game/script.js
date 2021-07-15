const cardsArray = [
    {
        name: 'donut-neon-sign',
        img: 'img/alex-holyoake-unsplash.jpg',
    },
    {
        name: 'donut-w-hearts',
        img: 'img/anastasiia-ostapovych-unsplash.jpg',
    },
    {
        name: 'donut-w-cherries',
        img: 'img/anita-austvika-unsplash.jpg',
    },
    {
        name: 'blue-donut',
        img: 'img/sharon-mccutcheon-unsplash.jpg',
    },
    {
        name: 'plastic-waste',
        img: 'img/brian-yurasits-unsplash.jpg',
    },
    {
        name: 'donut-w-almonds',
        img: 'img/eiliv-sonas-aceron-unsplash.jpg',
    },
    {
        name: 'donut-w-flowers',
        img: 'img/kadarius-seegars-unsplash.jpg',
    },
    {
        name: 'donut-w-chocolate',
        img: 'img/lu-amaral-unsplash.jpg',
    },
    {
        name: 'inflatable-donut',
        img: 'img/rhema-kallianpur-unsplash.jpg',
    },
    {
        name: 'donut-w-bite-mark',
        img: 'img/nathan-dumlao-unsplash.jpg',
    },
    {
        name: 'donut-w-poppy-seeds',
        img: 'img/stanislav-kondratiev-unsplash.jpg',
    },
    {
        name: 'pile-of-donuts',
        img: 'img/tijana-drndarski-unsplash.jpg',
    },
];

const gameGrid = cardsArray
    .concat(cardsArray)
    .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;
let guessCount = 0;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach( item => {
    const { name, img } = item;

    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});

const match = () => {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });
};

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
};

const panel = document.createElement('section');
panel.setAttribute('class', 'game-over');

const gameOver = () => {
    const matched = document.querySelectorAll('.match');
    if (matched.length === 24) {
        console.log('GAME OVER');
        replacedNode = grid.parentNode.replaceChild(panel, grid);
        panel.innerHTML = `
            <span class="close-btn" onClick="window.location.reload();">&times;</span>
            <h2>GAME OVER</h2>
            <span class="emoji">🍩</span>
            <p>Congratulation !</p>
            <p>It took you only ${guessCount} tries.</p>
            <span class="emoji">&#128079;</span>
            <button class="btn" type="button" name="button" onClick="window.location.reload();">Play Again</button>
        `;

    }
};

grid.addEventListener('click', event => {

    const clicked = event.target;

    if (
        clicked.nodeName === 'SECTION' ||
        clicked === previousTarget ||
        clicked.parentNode.classList.contains('selected') ||
        clicked.parentNode.classList.contains('match')
    ) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            console.log(firstGuess);
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            console.log(secondGuess);
            clicked.parentNode.classList.add('selected');
        }

        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                match();
                setTimeout(gameOver, delay);
            }
            setTimeout(resetGuesses, delay);
            guessCount++;
            console.log(guessCount);
        }
        previousTarget = clicked;
    }

});
