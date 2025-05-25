const cards = Array.from(document.querySelectorAll(".card"));
const scoreX = document.querySelector(
  ".score__item:nth-child(1) .score__value"
);
const scoreO = document.querySelector(
  ".score__item:nth-child(3) .score__value"
);
const scoreDraw = document.querySelector(
  ".score__item:nth-child(2) .score__value"
);
const ribbon = document.querySelector(".ribbon");
const newGameBtn = document.querySelector(".new__game-btn");
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let player = "x";
let gameOver = false;

cards.forEach((card) => {
  card.onclick = function () {
    if (card.innerHTML || gameOver) {
      return;
    }
    card.innerHTML = player;
    card.classList.add(player);
    if (checkWin()) {
      gameOver = true;
      handleWin();
      return;
    }
    if (cards.every((card) => card.innerHTML)) {
      gameOver = true;
      handleDraw();
      return;
    }
    if (player === "x") {
      player = "o";
    } else {
      player = "x";
    }
  };
});

function checkWin() {
  for (let arr of winCombinations) {
    const id1 = arr[0];
    const id2 = arr[1];
    const id3 = arr[2];
    if (
      cards[id1].innerHTML === cards[id2].innerHTML &&
      cards[id3].innerHTML === cards[id1].innerHTML &&
      cards[id1].innerHTML
    ) {
      cards[id1].classList.add("win");
      cards[id2].classList.add("win");
      cards[id3].classList.add("win");
      return true;
    }
  }
  return false;
}

function handleWin() {
  ribbon.classList.remove("hidden");
  newGameBtn.classList.remove("hidden");
  ribbon.innerHTML = `Game Over. Player ${player} wins!`;
  if (player === "x") {
    scoreX.innerHTML = Number(scoreX.innerHTML) + 1;
  } else {
    scoreO.innerHTML = Number(scoreO.innerHTML) + 1;
  }
}

function resetGame() {
  player = "x";
  gameOver = false;
  ribbon.classList.add("hidden");
  newGameBtn.classList.add("hidden");
  cards.forEach((card) => {
    card.innerHTML = null;
    card.classList.remove("x", "o", "win");
  });
}

newGameBtn.onclick = resetGame;

function handleDraw() {
  ribbon.classList.remove("hidden");
  newGameBtn.classList.remove("hidden");
  ribbon.innerHTML = `Game Over. Draw!`;
  scoreDraw.innerHTML = Number(scoreDraw.innerHTML) + 1;
}
