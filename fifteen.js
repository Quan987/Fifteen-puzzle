/* 
	Extra Features: 
	1. End-of-game notifications 
	2. Game time with some music file 
	3. Multiple Backgrounds 
	4. 

*/

document.addEventListener('DOMContentLoaded', function () {
    var puzzleContainer = document.getElementById('puzzle-container');
	 
    var gridSize = 4;
	
	// Call the function to initialize the puzzle tiles
    initializePuzzle(gridSize);
	
	document.getElementById('shuffle').addEventListener('click', function(){
		shuffleTiles(); 
	}); 
	
	function shuffleTiles() {
        var tiles = Array.from(document.querySelectorAll('.tile:not(.empty)'));
        for (let i = tiles.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [tiles[i].textContent, tiles[j].textContent] = [tiles[j].textContent, tiles[i].textContent];
        }
    }

    // Function to initialize the puzzle tiles
    function initializePuzzle(gridSize) {
		
		
        puzzleContainer.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
        puzzleContainer.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;

        for (let i = 1; i <= gridSize * gridSize - 1; i++) {
            var tile = document.createElement('div');
            tile.className = 'tile';
            tile.textContent = i;
            puzzleContainer.appendChild(tile);
        }

        // Add the empty tile
        var emptyTile = document.createElement('div');
		emptyTile.className = 'tile empty';
        puzzleContainer.appendChild(emptyTile);
    }

});

function beginWinAnimation() {
    counter = 0; 
    document.querySelectorAll(".tile").forEach(tile => {
        tile.setAttribute("style", `animation: win-tile 4s forwards; animation-delay: ${counter*55}ms`)
        counter++
    })
    document.getElementById("game-container").setAttribute("style", `animation: win-grid 2s infinite; animation-delay: ${counter*300}ms;`)
}

function notifyWin() {
    // play animation
    beginWinAnimation()
    // TODO: notify user somehow
    // play music or sound effect
}

function setBg(resource) {
    document.body.setAttribute("style", `background-image: url(${resource});`)
}