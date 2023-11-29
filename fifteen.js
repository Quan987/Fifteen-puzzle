/* 
	Extra Features: 
	1. End-of-game notifications 
	2. Game time with some music file 
	3. Multiple Backgrounds 
	4. Puzzle Size

*/
var bgMusic;
document.addEventListener("DOMContentLoaded", function () {
  var tiles;
  var started = 0;
  timerInterval = setInterval(timeFunction, 1000);
  // Function to set background image for tiles
  function setBackgroundImage(imageUrl) {
    for (let i = 0; i < tiles.length - 1; i++) {
      tiles[i].style.backgroundImage = "url(" + imageUrl + ")";
      tiles[i].style.backgroundSize =
        100 * gridSize + "px " + 100 * gridSize + "px";
    }
  }
  function shuffleTiles() {
    tiles = document.getElementsByClassName("tile");
    for (let i = tiles.length - 1; i > 0; i--) {
      let firstTile = tiles[i];
      var j = Math.floor(Math.random() * (i + 1));
      let secondTile = tiles[j];
      var temp = firstTile.style.left;
      firstTile.style.left = secondTile.style.left;
      secondTile.style.left = temp;

      firstContent = firstTile.innerHTML;
      secondContent = secondTile.innerHTML;
      tempContent = firstContent;
      firstContent = secondContent;
      secondContent = tempContent;

      tempXY = firstTile.getAttribute("row");
      firstTile.setAttribute("row", secondTile.getAttribute("row"));
      secondTile.setAttribute("row", tempXY);

      tempXY = firstTile.getAttribute("column");
      firstTile.setAttribute("column", secondTile.getAttribute("column"));
      secondTile.setAttribute("column", tempXY);

      temp = firstTile.style.top;
      firstTile.style.top = secondTile.style.top;
      secondTile.style.top = temp;
    }
  }

  var puzzleContainer = document.getElementById("puzzle-container");
  var sizeSelection = document.getElementById("gridSizeSelect");
  var imageSelect = document.getElementById("imageSelect");
  var gridSize = 3;
  function setupTile(gridSize) {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 1; j <= gridSize; j++) {
        textC = i * gridSize + j;
        if (textC == gridSize * gridSize) {
          let emptyTile = document.createElement("div");
          emptyTile.className = "tile empty";
          //Setting attributes so we can check its location later
          emptyTile.setAttribute("row", i + 1);
          emptyTile.setAttribute("column", j);
          //This is to set the global variable so that we know where the empty tile is at all time
          puzzleContainer.appendChild(emptyTile);
        } else {
          let tile = document.createElement("div");
          tile.className = "tile";
          //Setting attributes so we can check its location later
          tile.setAttribute("row", i + 1);
          tile.setAttribute("column", j);
          tile.innerHTML = textC;
          puzzleContainer.appendChild(tile);
          //The below is for checking if a tile is movable to apply visual effect
          //and allowing a tile to actually be moved.
          tile.addEventListener("mouseenter", moveCheck);
          tile.addEventListener("mouseleave", removeHover);
          tile.addEventListener("click", moveTile);
        }
      }
    }
  }
  setupTile(gridSize);
  tiles = puzzleContainer.getElementsByTagName("div");
  imageUrl = "./img/image1.jpg";
  // Call the function to set the background image
  setBackgroundImage(imageUrl);

  document
    .getElementById("imageSelect")
    .addEventListener("change", function () {
      imageUrl = this.value;
      reloadBoard();
    });

  puzzleContainer.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
  puzzleContainer.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;

  initializeGame(tiles);
  function initializeGame(tiles) {
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].style.left = (i % gridSize) * 100 + "px";
      tiles[i].style.top = parseInt(i / gridSize) * 100 + "px";
      tiles[i].style.backgroundPosition =
        "-" + tiles[i].style.left + " " + "-" + tiles[i].style.top;
    }
  }
  document
    .getElementById("gridSizeSelect")
    .addEventListener("change", function () {
      gridSize = this.value;
      reloadBoard();
    });
  function reloadBoard() {
    let parent = document.getElementById("puzzle-container");
    parent.innerHTML = "";
    setupTile(gridSize);
    initializeGame(tiles);
    setBackgroundImage(imageUrl);
    parent.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
    parent.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;
    count = 0;
    timer = 0;
    countMove.textContent = count;
    timerLabel.innerHTML = timer + " s";
    started = 0;
    stopBgMusic();
  }
  document.getElementById("shuffle").onclick = function () {
    shuffleTiles();
    // Disable select grid
    // Disable select Puzzle size
    // Disable shuffle
    document.getElementById("shuffle").disabled = true;
    imageSelect.disabled = true;
    sizeSelection.disabled = true;
  };

  //Checking and moving tiles stuff
  function moveCheck() {
    let emptyTiles = document.getElementsByClassName("empty");
    let emptyTile = emptyTiles[0];
    let columnDiff =
      this.getAttribute("column") - emptyTile.getAttribute("column");
    let rowDiff = this.getAttribute("row") - emptyTile.getAttribute("row");
    //Check if tile is in same column and is adjacent to the empty tile above or below
    if (columnDiff == 0 && (rowDiff == -1 || rowDiff == 1)) {
      this.classList.add("moveablepiece");
    }
    //Check if tile is in same row and is adjacent to the empty tile to the left or to the right
    else if (rowDiff == 0 && (columnDiff == -1 || columnDiff == 1)) {
      this.classList.add("moveablepiece");
    }
  }
  function removeHover() {
    this.classList.remove("moveablepiece");
  }
  function moveTile() {
    let emptyTiles = document.getElementsByClassName("empty");
    let emptyTile = emptyTiles[0];
    thisTile = document.getElementsByClassName("moveablepiece")[0];
    if (thisTile.classList.contains("moveablepiece")) {
      let solvedVar = 1;
      //Swapping background position
      let tempStyle = thisTile.style.left;
      thisTile.style.left = emptyTile.style.left;
      emptyTile.style.left = tempStyle;
      tempStyle = thisTile.style.top;
      thisTile.style.top = emptyTile.style.top;
      emptyTile.style.top = tempStyle;
      //Update the inner text of each tile
      let thisText = thisTile.innerHTML;
      let emptyText = emptyTile.innerHTML;
      let tempText = thisText;
      thisText = emptyText;
      emptyText = tempText;
      //Swapping their row and column values
      let tempPos = thisTile.getAttribute("column");
      thisTile.setAttribute("column", emptyTile.getAttribute("column"));
      emptyTile.setAttribute("column", tempPos);
      tempPos = thisTile.getAttribute("row");
      thisTile.setAttribute("row", emptyTile.getAttribute("row"));
      emptyTile.setAttribute("row", tempPos);
      //Checking every tiles in the document to see if it is the same as the initialized order
      //If it is not then the puzzle isn't solved, else it is.
      var tilesStuff = Array.from(
        document.querySelectorAll(".tile:not(.empty)")
      );
      for (let i = 0; i < tilesStuff.length; i++) {
        let height = Number(tilesStuff[i].getAttribute("row"));
        let width = Number(tilesStuff[i].getAttribute("column"));
        //Same formula as how the tile.innerHTML was initialized, so if it is in the right order
        //then it should matches the initialized innerHTML, if it is not then the puzzle isn't solved.
        if (
          Number(tilesStuff[i].innerHTML) !=
          (height - 1) * gridSize + width
        ) {
          solvedVar = 0;
        }
      }
      if (solvedVar == 1) {
        notifyWin();
        moveCount();
        started = 0;
        return clearInterval(timerInterval);
      }
    }
    // Couting score
    moveCount();
  }
  // Button to reset game
  const btnReset = document.getElementById("btn-reset");
  btnReset.addEventListener("click", function () {
    //  window.location.reload();
    document.getElementById("shuffle").disabled = false;
    imageSelect.disabled = false;
    sizeSelection.disabled = false;
    if (count > highscore) {
      highscore = count;
      highmove.textContent = highscore;
    }
    document.querySelectorAll(".tile").forEach((tile) => {
      tile.style.animation = ``;
    });
    document.getElementById("game-container").style.animation = ``;
    reloadBoard();
  });
  let count = 0;
  const countMove = document.getElementById("count-move");
  function moveCount() {
    count += 1;
    countMove.textContent = count;
    if (count == 1) {
      started = 1;
      startMusic();
    }
  }
  var timerLabel = document.getElementById("timer");
  var timer = 0;
  function timeFunction() {
    if (started == 1) {
      timer++;
      timerLabel.innerHTML = timer + " s";
    }
  }
  var highscore = 0;
  const highmove = document.getElementById("high-move");
  const btnpopup = document.querySelector(".pop-up__btnBegin");
  const popup = document.querySelector(".pop-up");
  btnpopup.addEventListener("click", function () {
    popup.classList.add("hidden");
  });
});

function beginWinAnimation() {
  counter = 0;
  document.querySelectorAll(".tile").forEach((tile) => {
    // tile.setAttribute("style", `animation: win-tile 4s forwards; animation-delay: ${counter*55}ms`)
    tile.style.animation = `win-tile 4s forwards`;
    tile.style.animationDelay = `${counter * 55}ms`;
    counter++;
  });
  // document.getElementById("game-container").setAttribute("style", `animation: win-grid 2s infinite; animation-delay: ${counter*300}ms;`)
  document.getElementById(
    "game-container"
  ).style.animation = `win-grid 2s infinite`;
  document.getElementById("game-container").style.animationDelay = `${
    counter * 300
  }ms`;
}

function notifyWin() {
  stopBgMusic();
  // play animation
  beginWinAnimation();
  // play music or sound effect
  new Audio("./snd/win.mp3").play();
  // TODO: notify user somehow
  document.getElementById("title").innerText = "You win!";
}

function startMusic() {
  // fair use
  let m = [
    "https://dl.vgmdownloads.com/soundtracks/pokemon-brilliant-diamond-shining-pearl-gamerip/bvixrzrtea/1-37%20Floaroma%20Town%20%28Day%29.mp3",
    "https://dl.vgmdownloads.com/soundtracks/pokemon-omega-ruby-and-alpha-sapphire-super-music-complete-nintendo-3ds/qrwfcfrcyz/1-12%20Oldale%20Town.mp3",
    "https://dl.vgmdownloads.com/soundtracks/pikmin-3/sihmnspkdg/42.%20Garden%20of%20Hope%20%28Noon%29.mp3",
    "./snd/1.mp3",
    "./snd/2.mp3",
  ];
  bgMusic = new Audio(m[Math.floor(Math.random() * 5)]);
  bgMusic.loop = true;
  bgMusic.play();
}

function stopBgMusic() {
  bgMusic.pause();
}
