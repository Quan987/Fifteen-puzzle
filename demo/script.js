"use strict";

function createGrid(arr) {
  for (let i = 0; i < arr.length; i++) {
    container.innerHTML += '<div class="panels"></div>';
  }
  return document.querySelectorAll(".panels");
}

/* 
  For each tile, increment left by 100 starting from 0
    1) When left reach 400 increment the top by 100, reset left to 0 
  For each tile background, decrement X position by 100
    1) When x reach -400 decrement y axis by 100, reset x to 0
  Add className with number for them  */

function setUpBoard(tiles) {
  let left = 0;
  let top = 0;
  let bgX = 0;
  let bgY = 0;
  let i = 0;
  tiles.forEach((tile) => {
    tile.classList.add(`tile${i}`);
    tile.style.left = `${left}px`;
    tile.style.top = `${top}px`;
    tile.style.backgroundPositionX = `${bgX}px`;
    tile.style.backgroundPositionY = `${bgY}px`;
    i += 1;
    left += 100;
    bgX -= 100;
    if (left === 400 && bgX === -400) {
      left = 0;
      top += 100;
      bgX = 0;
      bgY -= 100;
    }
  });
}

const container = document.getElementById("container");
const tileArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const tiles = createGrid(tileArr);
setUpBoard(tiles);
