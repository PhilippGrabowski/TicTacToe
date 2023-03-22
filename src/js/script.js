let fields = [];
let currentShape = 'cross';
let gameOver = false;
let round = 0;

function fillShape(id) {
    if (!fields[id] && !gameOver) {
        changeShape()
        fields[id] = currentShape;
        turn();
        checkForWin();
    }
}

function switchPlayer(player1, player2) {
    document.getElementById(player2).classList.add('active');
    document.getElementById(player1).classList.remove('active');
}

function removeActivePlayer() {
    document.getElementById('player-2').classList.remove('active');
    document.getElementById('player-1').classList.remove('active');
}

function changeShape() {
    if (currentShape == 'cross') {
        currentShape = 'circle';
        switchPlayer('player-1', 'player-2')
    } else {
        currentShape = 'cross';
        switchPlayer('player-2', 'player-1')
    }
}

function turn() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById('circle-' + i).classList.remove('d-none');
        }
        if (fields[i] == 'cross') {
            document.getElementById('cross-' + i).classList.remove('d-none');
        }
    }
    round++;
}

function checkForWin() {
    let winner;
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        showWiningLine(0, 1, 2);
    }
    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        showWiningLine(3, 4, 5);
    }
    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        showWiningLine(6, 7, 8);
    }
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        showWiningLine(0, 3, 6);
    }
    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        showWiningLine(1, 4, 7);
    }
    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        showWiningLine(2, 5, 8);
    }
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        showWiningLine(0, 4, 8);
    }
    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        showWiningLine(2, 4, 6);
    }

    if (winner) {
        gameOver = true;
        removeActivePlayer();
        setTimeout(function () {
            showWinner(winner);
        }, 3000)
    }

    if (!winner && round == 9) {
        gameOver = true;
        removeActivePlayer();
        setTimeout(function () {
            showDraw();
        }, 3000)
    }
}

function showWiningLine(field1, field2, field3) {
    addGoldBgColor(field1, field2, field3);
    removeHoverEffect();
    pulsingShape(field1);
    pulsingShape(field2);
    pulsingShape(field3);
}

function addGoldBgColor(field1, field2, field3) {
    document.getElementById(`field-${field1}`).classList.add('win');
    document.getElementById(`field-${field2}`).classList.add('win');
    document.getElementById(`field-${field3}`).classList.add('win');
}

function removeGoldBgColor() {
    let fields = document.querySelectorAll('td');
    fields.forEach(field => {
        field.classList.remove('win');
    })
}

function addHoverEffect() {
    let tds = document.querySelectorAll('td');
    tds.forEach(td => {
        td.classList.add('bg');
    })
}

function removeHoverEffect() {
    let tds = document.querySelectorAll('td');
    tds.forEach(td => {
        td.classList.remove('bg');
    })
}

function pulsingShape(field) {
    let shapes = document.querySelectorAll(`#field-${field} i`);
    shapes.forEach(shape => {
        shape.classList.add('puls');
    })
}

function removepulsingShape() {
    let shapes = document.querySelectorAll('i');
    shapes.forEach(shape => {
        shape.classList.remove('puls');
        shape.classList.add('d-none');
    })
}

function showWinner(winner) {
    if (winner == 'circle') {
        document.querySelector('.winner').innerHTML = 'Player 1 Win';
    } else {
        document.querySelector('.winner').innerHTML = 'Player 2 Win';
    }
    changeElements('.players', '.result');
}

function showDraw() {
    changeElements('.players', '.result');
    changeElements('.winner', '.draw');
}

function restart() {
    fields = [];
    currentShape = 'cross';
    gameOver = false;
    round = 0;
    showPlayers();
    emptyFields();
}

function emptyFields() {
    addHoverEffect();
    removeGoldBgColor();
    removepulsingShape();
}

function showPlayers() {
    changeElements('.result', '.players');
    if (document.querySelector('.draw').classList.contains('d-none') == false) {
        changeElements('.draw', '.winner');
    }
    document.getElementById('player-1').classList.add('active');
}

function changeElements(element1, element2) {
    document.querySelector(element1).classList.add('d-none');
    document.querySelector(element2).classList.remove('d-none');
}