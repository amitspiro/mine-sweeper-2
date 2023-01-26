var gBoard;
var gSize = 4;
var gMine = 2;
var gClicked = { i: null, j: null };
var gNegMines = 0;
var gFirsTime = true;
var gLives = 3;
var gTotalEmpty = 14;
var gFlag = false;


const HEART = `<span class="HEART"></span>`;
const COVER = `<span class="COVER"><img src="img/0.gif"></span>`;
const EMPTY = `<span class="EMPTY"> . </span>`;
const FLAG = `<span class="FLAG">🚩</span>`;
const MINE = '💣'
const HAPPY = "😃";
const SAD = "🤒";
const VERY_SAD = "🤕";
const WIN = "🥳";
const DEAD = "😵";
var gSmileyBtn;
var gGame = {
  isOn: true,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};

function onInit() {
  if (gGame.isOn) {
    gBoard = buildBoard();
    renderBoard(gBoard);
    gSmileyBtn = HAPPY;
    // addMine();
    // addMine();
    mineDevelop();
    changeSmile(HAPPY);
    boardMinesCount(gBoard);
    gGame.isOn = true;
    // updateScore(gMine)
  } else return;
}
function mineDevelop() {
  gBoard[1][1].isMine = true;
  gBoard[2][2].isMine = true;
}
function buildBoard() {
  const board = [];

  for (var i = 0; i < gSize; i++) {
    board.push([]);
    for (var j = 0; j < gSize; j++) {
      board[i][j] = {
        type: COVER,
        minesAroundCount: gNegMines,
        isShown: false,
        isMine: false,
        isMarked: false,
      };
    }
  }
  // board[1][1].type = MINE;
  // board[2][2].type = MINE;
  return board;
}
function getEmptyLocation(board) {
  var emptyLocations = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j].type === COVER) {
        emptyLocations.push({ i, j });
      }
    }
  }
  if (!emptyLocations.length) return null;
  var randIdx = getRandomIntInclusive(0, emptyLocations.length - 1);
  return emptyLocations[randIdx];
}
function addMine() {
  var emptyLocation = getEmptyLocation(gBoard);
  if (!emptyLocation) return;
  // Update Model
  gBoard[emptyLocation.i][emptyLocation.j].isMine = true;
  // Update DOM
  renderBoard(gBoard)
  // renderCell(emptyLocation, MINE);
}
function renderBoard(board) {
  var strHTML = "<table><tbody>";
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j].isMine? MINE : board[i][j].minesAroundCount

      //   var clickCount = board[i][j].minesAroundCount;
      const className = `cell cell-${i}-${j}`;

      strHTML += `<td id="noContextMenu" class="${className}" onclick="onCellClicked(${i}, ${j})"><div class="box">${board[i][j].isShown? cell : COVER}</div></td>`;
    }

    strHTML += "</tr>";
  }
  //   console.log('yadayada',clickCount);
  strHTML += "</tbody></table>";
  const elContainer = document.querySelector(".board-container");
  elContainer.innerHTML = strHTML;
}
function boardMinesCount(board) {
  var mineLocations = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j] === MINE) {
        mineLocations.push({ i, j });
      }
    }
  }
  //   console.log(mineLocations.length);
  document.querySelector("h4 span").innerText = mineLocations.length;
  if (!mineLocations.length) return;
}
function onCellClicked(i, j) {

// if(gBoard[i][j].isMine=== false){
//   expandByOne(i, j)
if (gBoard[i][j].minesAroundCount === 0){
expandByOne(i, j)
}
  
  if (!gGame.isOn) return;
  console.log(gBoard[i][j]);
  if(gBoard[i][j].isMine){
    const elCell = document.querySelector(`.cell-${i}-${j}`);
    elCell.innerText = `${MINE}`
  }
  if (gBoard[i][j].isShown === true || gBoard[i][j].isMarked === true) return;
  if (gFirsTime) {
    startTimer();
    gFirsTime = false;
  }
  if (!gBoard[i][j].isShown) {
    gBoard[i][j].isShown = true;
    gBoard[i][j].type = EMPTY;
    gGame.shownCount++;
    // expandByOne(i, j)
    // expandByOne(i, j)
    if (gBoard[i][j].isMine === true && gLives !== 0) {
      gLives--;
      if (gLives === 2) {
        document.querySelector("h2 span").innerText = "❤❤";
        changeSmile(SAD);
      }
      if (gLives === 1) {
        document.querySelector("h2 span").innerText = "❤";
        changeSmile(VERY_SAD);
      }
      if (gLives === 0) {
        document.querySelector("h2 span").innerText = "0";
        changeSmile(DEAD);
      }
      checkGameOver();
      console.log("ssss");
    }
    gClicked.i = i;
    gClicked.j = j;
    //   handleKey(event)
    // console.log(gNegMines);
    renderBoard(gBoard)
    setMinesNegsCount(gClicked);
    // expandShown(gBoard, gBoard[i][j], i, j)
    // const cell = gBoard[i][j];
    // const elCell = document.querySelector(`.cell-${i}-${j}`);
    // elCell.innerText = gNegMines;

    // console.log("yadada", gBoard[i][j]);
    // expandShown(gBoard, gBoard[i][j], i, j)
    // console.log("elCell", elCell);
    //   elCell.innerText = cell.minesAroundCount;
    // console.log("elCell.innerText", cell.minesAroundCount);
  }
  // console.log(gBoard[i][j]);
}
// expandShown(gBoard, gBoard[i][j], i, j)


// const elCell = document.querySelector(`.cell-${i}-${j}`);
// elCell.innerText =`${EMPTY}`


// function expandShown(board, cell, i, j){
// for (var i=i-1; i<=i+1;i++){
//   if(i<0 || i>=board.length) continue
//  for (var j = j - 1; j <= j + 1; j++) {
//     if (i === i && j === j) continue
//     if (j < 0 || j >= board[i].length) continue
//     if (!cell[i][j].isMine ){
//       cell[i][j].isShown =true
//       cell[i][j].type = EMPTY

//     }
//  }
// }



//   function countNeighbors(rowIdx, colIdx, mat) {
//     var neighborsCount = 0

//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//         if (i < 0 || i >= mat.length) continue

//         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//             if (i === rowIdx && j === colIdx) continue
//             if (j < 0 || j >= mat[i].length) continue
//             if (mat[i][j] === LIFE) neighborsCount++
//         }
//     }
//     return neighborsCount
// }
// }


function expandByOne(rowIdx, colIdx){

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
      if (i < 0 || i >= gBoard.length) continue

      for (var j = colIdx - 1; j <= colIdx + 1; j++) {
          if (i === rowIdx && j === colIdx) continue
          if (j < 0 || j >= gBoard[i].length) continue
          // if (gBoard[i][j].isMine === false) {
          gBoard[i][j].isShown= true
         
          // }
      }
  }
  renderBoard(gBoard)
  // console.log('pre',i, j)
  // console.log('post',i-1, j-1)
//   gBoard[i-1][j-1].type=EMPTY
  // gBoard[i-1][j-1].isShown=true

}
// }
function markFlag(){
  
}

function setMinesNegsCount(gClicked) {
  var negsCount = 0;
  for (var i = gClicked.i - 1; i <= gClicked.i + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;
    for (var j = gClicked.j - 1; j <= gClicked.j + 1; j++) {
      if (j < 0 || j >= gBoard[i].length) continue;
      if (i === gClicked.i && j === gClicked.j) continue;
      var currCell = gBoard[i][j];
      if (currCell === MINE) {
        negsCount++;
      }
    }
  }
  gNegMines = negsCount;
  return negsCount;
}

// function updateScore(diff) {
//     // Model
//     mineLocations.length -= diff
//     // DOM

// }

function changeSmile(mood) {
  var elSmile = document.querySelector(".smileyBtn");
  elSmile.innerText = `${mood}`;
}

function restart() {
  resetTime();
  onInit();
}

function changeLevel(mat, mines) {
  gSize = mat;
  gMine = mines;
  onInit();
  gTotalEmpty = mat ** 2 - mines;
  console.log(gTotalEmpty);
}

// onCellMarked(elCell)

function checkGameOver() {
  if (gLives === 0) {
    gGame.isOn = false;
    gameLost();
  }
}
function resetTime() {
  var elH3 = document.querySelector(".time");
  elH3.innerText = "0.000";
}

function startTimer() {
  gStartTime = Date.now();
  gInterval = setInterval(() => {
    const seconds = (Date.now() - gStartTime) / 1000;
    var elH3 = document.querySelector(".time");
    elH3.innerText = seconds.toFixed(3);
  }, 1);
}

function gameLost() {
  var elresult = document.querySelector(".result");
  elresult.style.display = "block";
  elresult.innerText = "You L🤕st!";
}
function handleKey(event){
switch (event.key) {
    case "rightclick":
console.log('jndisndsijd')  
    break;
}
}

function setFlag() {
  if (gFlag) {
      gFlag = false;
      document.getElementById("flag-button").style.backgroundColor = "lightgray";
  }
  else {
      gFlag = true;
      document.getElementById("flag-button").style.backgroundColor = "darkgray";
  }
}
function clickTile() {
  if (gameOver || this.classList.contains("tile-clicked")) {
      return;
  }

  let tile = this;
  if (flagEnabled) {
      if (tile.innerText == "") {
          tile.innerText = "🚩";
      }
      else if (tile.innerText == "🚩") {
          tile.innerText = "";
      }
      return;
  }
}
// function handleKey(event){
// switch (event.key) {
//     case "ArrowLeft":
//       moveTo(i, j - 1);
//       break;
//     case "ArrowRight":
//       moveTo(i, j + 1);
//       break;
//     case "ArrowUp":
//       moveTo(i - 1, j);
//       break;
//     case "ArrowDown":
//       moveTo(i + 1, j);
//       break;
//   }
// }

// var right =document.getElementById("noContextMenu")
// $('right').mousedown((event) {


// $('#element').mousedown(function(event) {
//     switch (event.which) {
//         case 1:
//             alert('Left Mouse button pressed.');
//             break;
//         case 2:
//             alert('Middle Mouse button pressed.');
//             break;
//         case 3:
//             alert('Right Mouse button pressed.');
//             break;
//         default:
//             alert('You have a strange Mouse!');
//     }
// });
