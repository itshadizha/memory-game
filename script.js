 const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


//  Эта функция отвечает за поворот карты и проверяет совпадают ли они
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  console.log(this);

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}


// Эта функция сравнивает данные (dataset) двух карт, чтобы определить, являются ли они одинаковыми
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

// Если карты совпали, эта функция удаляет возможность клика по ним
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

// Если карты не совпали, эта функция поворачивает их обратно после задержки
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

// Эта функция сбрасывает переменные и разблокирует доску после завершения хода
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Эта функция перемешивает порядок карт, изменяя их CSS свойство order, чтобы они распределились случайным образом
(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
