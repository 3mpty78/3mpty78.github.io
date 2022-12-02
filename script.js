const canvas = document.getElementById("canvas");
const score = document.getElementById("score");
const endScreen = document.getElementById("endScreen");

gameOverNb = 20;
loopPlay = false;

// Starting the game

function start() {
  count = 0;
  getFaster = 4500;
  canvas.innerHTML = "";
  score.innerHTML = count;

  // Make sure to not play loop several times

  loopPlay ? "" : game();
  loopPlay = true;

  function game() {
    let randomTime = Math.round(Math.random() * getFaster);
    getFaster > 900 ? (getFaster = getFaster * 0.9) : "";

    setTimeout(() => {
      if (count === 50) {
        youWin();
      } else if (canvas.childElementCount < gameOverNb) {
        displayRandom();
        game();
      } else {
        gameOver();
      }
    }, randomTime);
  }

  const gameOver = () => {
    endScreen.innerHTML = `<div class="gameOver">T'as perdus t'es trop naze ! <br/><span>score : ${count} </span></div>`;
    endScreen.style.visibility = "visible";
    endScreen.style.opacity = "1";
    loopPlay = false;
  };
  const youWin = () => {
    endScreen.innerHTML = `<div class="youWin">Bravo ! T'es pas si nul que ça en fait !</div>`;
    endScreen.style.visibility = "visible";
    endScreen.style.opacity = "1";
    loopPlay = false;
  };
}

// Display random ennemies from array

function displayRandom() {
  let imageArray = [
    {
      src: "./assets/planet1.png",
      width: "40",
      height: "40",
    },
    {
      src: "./assets/planet2.png",
      width: "40",
      height: "40",
    },
    {
      src: "./assets/planet3.png",
      width: "40",
      height: "40",
    },
    {
      src: "./assets/planet4.png",
      width: "40",
      height: "40",
    },
    {
      src: "./assets/planet5.png",
      width: "40",
      height: "40",
    },
    {
      src: "./assets/planet6.png",
      width: "40",
      height: "40",
    },
    {
      src: "./assets/planet7.png",
      width: "40",
      height: "40",
    },
    {
      src: "./assets/planet8.png",
      width: "40",
      height: "40",
    },
    {
      src: "./assets/planet9.png",
      width: "40",
      height: "40",
    },
  ];

  let arrayLength = imageArray.length;
  let newArray = [];

  for (let i = 0; i < arrayLength; i++) {
    newArray[i] = new Image();
    newArray[i].src = imageArray[i].src;
    newArray[i].width = imageArray[i].width;
    newArray[i].height = imageArray[i].height;
  }

  function getRandomNb(min, max) {
    imgNo = Math.floor(Math.random() * (max - min + 1)) + min;
    return newArray[imgNo];
  }

  let newImage = getRandomNb(0, newArray.length - 1);

  newImage.classList.add("ennemy");
  newImage.style.top = Math.random() * 400 + "px";
  newImage.style.left = Math.random() * 800 + "px";

  let x, y;
  x = y = Math.random() * 90 + 35;
  newImage.style.setProperty("--x", `${x}px`);
  newImage.style.setProperty("--y", `${y}px`);

  let plusMinus = Math.random() < 0.5 ? -1 : 1;
  let trX = Math.random() * 800 * plusMinus;
  let trY = Math.random() * 400 * plusMinus;
  newImage.style.setProperty("--trX", `${trX}%`);
  newImage.style.setProperty("--trY", `${trY}%`);

  canvas.appendChild(newImage);
}

// Remove on click

document.addEventListener("click", (e) => {
  let targetElement = e.target;

  if (targetElement.classList.contains("ennemy")) {
    targetElement.remove();
    count++;
    score.innerHTML = count;
  }
});

document.addEventListener("click", (e) => {
  if (e.target == endScreen) {
    start();
    endScreen.style.visibility = "hidden";
    endScreen.style.opacity = "0";
  }
});
