'use strict'
var BOARD_SIZE = 9

var gBoard = [];
var gNextNum
var gStartTime
var gGameInterval;


function onInit() {
    gameSetup()
}

function gameSetup() {
    //model
    gNextNum = 1
    gStartTime = 0
    gBoard = createBoard()
    //dom
    renderBoard(gBoard)

}

function createBoard() {
    var nums = []
    for (var i = 0; i < BOARD_SIZE; i++) {
        nums.push(i + 1)
    }
    for (var i = 0; i < BOARD_SIZE; i++) {
        var numIdx = getRandomInt(0, nums.length - 1)
        var rdmNum = +nums.splice(numIdx, 1)[0]
        gBoard[i] = rdmNum
    }
    return gBoard
}

function renderBoard(board) {

    var strHTML = ''
    var i = 0
    while (i < board.length) {
        var currNum = board[i]
        if (isNewBoardRow(i)) strHTML += `<tr>\n`
        strHTML += `<td onclick="onCellClicked(${currNum},this)">${currNum}</td>`
        i++
        if (isNewBoardRow(i)) strHTML += `</tr>\n`
    }

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function isNewBoardRow(rowIdx) {
    return (!(rowIdx % Math.sqrt(BOARD_SIZE)))
}

function onCellClicked(clickedNum, elTd) {
    if (!gGameInterval && +clickedNum === 1) { //the timer has not started yet and player clicked on 1
        startTimer()
    }

    if (+clickedNum === gNextNum) { //selected the correct cell
        elTd.classList.add('clicked')
        if (gNextNum === BOARD_SIZE) {
            endGame()
        } else {
            gNextNum++
        }
    }
}

function startTimer() {
    gStartTime = Date.now()
    gGameInterval = setInterval(updateTimer, 100)
}

function updateTimer() {
    var timeDiff = Date.now() - gStartTime
    var timeSecs = (timeDiff / 1000).toFixed(3)
    var elSpan = document.querySelector('.timer span')
    elSpan.innerText = timeSecs
}

function endGame() {
    clearInterval(gGameInterval)
    gGameInterval = null

    var elWin = document.querySelector('.winner')
    elWin.hidden = false
}

function onChooseLevel(size) {
    if (!gGameInterval) { //only if the game has not started yet or if a previous game has ended
        gBoard = []
        BOARD_SIZE = size
        var elWin = document.querySelector('.winner')
        elWin.hidden = true
        var elSpan = document.querySelector('.timer span')
        elSpan.innerText = 0
        gameSetup()
    }
}