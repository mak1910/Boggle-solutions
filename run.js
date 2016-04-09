"use strict";

// Dependencies
var sizeof = require('object-sizeof'); // Usage sizeof('variable-name');
var readlineSync = require('readline-sync'); // Synchronus Input
// Custom functions
var custom = require('./custom/custom');
var boggle = custom();

// Load Dictionary
// Please note, to increase application speed, dictionary can easily be loaded from a static file.
// This is a development stage application and hence that feature has not been added.
console.log("Building dictionary...");
var getdictionary = require('./dictionary/getdictionary');
var dictionary = getdictionary();

// Important Variables
var n = 0;
var board = []; 	// DDA to store numerical values corresponding to alphabets
var position = []; 	// DDA to store path being taken
var alphabets = []; // DDA to store albhabetical representation of board[][]
var results = [];
var count = 0;

function initialise() { 
console.log("");
	n = readlineSync.question('Enter n to determine size of board (n*n)? : ');
	// Initialising above variables
	for( var i=0; i<n; i++ ) {
		board[i] = [];
		position[i] = [];
		alphabets[i] = [];
		for( var j=0; j<n; j++ ) {
			board[i][j] = Math.round(Math.random()*25);
			position[i][j] = 0;
			alphabets[i][j] = String.fromCharCode( board[i][j]+97 );
		}
	}
	for( var i=0; i<28; i++ ) {
		results[i] = [];
	}
	count = 0;

	console.log("");
	console.log("Random board has been generated: ");
	for( var i=0; i<n; i++ )
	console.log(alphabets[i]);
	main();
};

function main() {
	// Initial Position -> These for loops cycle through all possible initial positions
	console.time("Computed all possible words in ");
	for( var i=0; i<n; i++ ) {
		for( var j=0; j<n; j++ ) {
			position[i][j] = 1;
			var str = "";
			recursive( position, str, dictionary );
			position[i][j] = 0;
		}
	}
	console.timeEnd("Computed all possible words in ");
	console.log(count+" possible word combinations exist.");

};

function recursive( position, str, dictionary ) {

	// Getting Present Position
	var presentPos = boggle.getPresentPos( position );
	
	// Getting present String
	str = str+String.fromCharCode(board[presentPos.x][presentPos.y]+97);

	// Possible options for next turn. Array of objects having properties x and y.
	var playable = boggle.getPlayableOptions( position, presentPos.x, presentPos.y );

	// Get list of moves worth considering i.e. may lead to a word.
	var moves = boggle.getMoves( playable, board, dictionary.next[board[presentPos.x][presentPos.y]+1]);
		
	if( moves[0] ) {
		// Found a Word ! :-D
		results[str.length-1].push(str);
		count++;
	} 

	// Make a move!
	for( var i=1; i<moves.length; i++ ) {
		position[moves[i].x][moves[i].y] = presentPos.value+1;
		recursive( position, str, dictionary.next[board[presentPos.x][presentPos.y]+1] );
		position[moves[i].x][moves[i].y] = 0;
	}	
};

function average() {
	var avg = [];
	var sum = 0;
	n = readlineSync.question('Enter n to determine size of board (n*n)? : ');
	for( var i=0; i<1000; i++ ) {
		avg[i] = initialiseavg(n);
		sum = sum+avg[i];
		console.log(avg[i]);
	}
	console.log("Average execution time for "+n+" loops = "+(sum/1000));
}

var condition = true;

while(true) {
	if(condition) {
		initialise();
		condition = false;
	}
	console.log("Enter 'again' to run test again with a different n.");
	console.log("Enter a number between 1 to 28 to print all possible word combinations of that length.");
	console.log("Enter 0 to print all numbers.");
	console.log("Enter 'quit' to exit.")
	var choice = readlineSync.question('? : ');
	if( choice == 'again' ) {
		initialise();
	}
	if( choice == 0 ) {
		for( var j=0; j<28; j++ ) {
			for( var i=0; i<results[j].length; i++ ) {
				console.log(results[j][i]);
			}
		}
	}
	if((choice>=1)&&(choice<=28)) {
		for( var i=0; i<results[choice-1].length; i++ ) {
			console.log(results[choice-1][i]);
		}
	}
	if( choice == 'quit' ) {
		break;
	}
}

