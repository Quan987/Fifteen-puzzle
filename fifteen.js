/* 
	Extra Features: 
	1. End-of-game notifications 
	2. Game time with some music file 
	3. Multiple Backgrounds 
	4. 

*/



document.addEventListener('DOMContentLoaded', function () {
	
	var tiles;
	// Function to set background image for tiles
	function setBackgroundImage(imageUrl) {
		for (var i = 0; i < tiles.length-1; i++) {
			tiles[i].style.backgroundImage = 'url(' + imageUrl + ')';
			tiles[i].style.backgroundSize = (100 * gridSize) + 'px ' + (100 * gridSize) + 'px';
		}
	}
	function shuffleTiles() {
	
	
		for (var i = tiles.length-1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = tiles[i].style.left;
			tiles[i].style.left = tiles[j].style.left;
			tiles[j].style.left = temp;

			temp = tiles[i].style.top;
			tiles[i].style.top = tiles[j].style.top;
			tiles[j].style.top = temp;
		}
	}
	
	
    var puzzleContainer = document.getElementById('puzzle-container');
	
	gridSize = 4; // Set your desired grid size
	
	for (var i = 1; i <= gridSize * gridSize; i++) {
		for(var j = 1; i <= gridSize * gridSize - 1; i++){
			var tile = document.createElement('div'); 
			tile.innerHTML = i; 
			tile.className = 'tile'; 
			puzzleContainer.append(tile); 
		}
		if(i === gridSize * gridSize) {
			 var emptyTile = document.createElement('div');
			 emptyTile.className = 'tile empty';
			 emptyTile.style.backgroundColor = '#808080'; 
			 puzzleContainer.appendChild(emptyTile);
		}
		
	}
	
		
    tiles = puzzleContainer.getElementsByTagName('div');

    // Call the function to set the background image
    setBackgroundImage('https://codd.cs.gsu.edu/~ntrigoso1/Project3/images/image1.jpg');
	
	document.getElementById('imageSelect').addEventListener('change', function () {
		
       imageUrl = this.value;
       
       setBackgroundImage(imageUrl);
    });
	
	puzzleContainer.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
    puzzleContainer.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;
	
	initializeGame(tiles); 
	function initializeGame(tiles) 
	{
		

		for (var i = 0; i < tiles.length; i++) {
			tiles[i].className = 'tile'; 
			
			tiles[i].style.left = (i % gridSize * 100) + 'px';
			tiles[i].style.top = (parseInt(i / gridSize) * 100) + 'px';
			tiles[i].style.backgroundPosition = '-' + tiles[i].style.left + ' ' + '-' + tiles[i].style.top;

		}
		
	}
    
    document.getElementById('shuffle').onclick = function () {
		
		shuffleTiles();  
		
    };
});