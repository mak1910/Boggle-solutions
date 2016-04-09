"use strict";
module.exports = function() {

	console.log("");
	// Synchronus Input
	var readlineSync = require('readline-sync');

	// Initialise dictionary data structure
	var factory = require('./lib/dictionaryfactory');
	var dictionary = factory();

	// Array of dictionary words
	console.time("Fetched array in ");
	var words = require("an-array-of-english-words");
	console.timeEnd("Fetched array in ");
	console.log("This array contains "+words.length+" words.")

	// Array Size
	console.log("");
	var sizeof = require('object-sizeof');
	var choice = readlineSync.question('Want to know size of Array? (y/n) : ');
	if( choice == 'y' ) {
		console.log( "Size of array containing all words : " + (sizeof(words)/1000000) + " Mb." );
	}

	console.log("");
	console.log( "Adding words to desired data structure.. ");
	var count = 0; // No. of words succesfully entered into dictionary

	// Recursive function that will Put Word into Tree
	// Checkout lib/dictionaryfactory.js for further explanation
	function putIntoTree ( str, obj ) {
		if( str.length == "" ) {
			obj.letter[0] = true;
			count++;
		} else {
			var pos = str.charCodeAt(0) - 96; // Hash using ASCII code
			obj.letter[pos] = true; // Make letter true
			if( Object.keys(obj.next[pos]).length == 0 ) {
				// So that older object is not written over
				obj.next[pos] = factory();
			}
			putIntoTree( str.substring(1,str.length), obj.next[pos] ); // Recursive Call -> add next character
		}
	}

	console.time("Added words to data structure in ");
	// Send in each word 
	var longest = 0;
	for( var i=0; i<words.length; i++ ) {
		putIntoTree( words[i], dictionary );
		if( longest<words[i].length ) 
			longest=words[i].length;
	}
	console.timeEnd("Added words to data structure in ");
	console.log("Longest Word : "+longest);
	
	// Print Statistics
	console.log( count+" words succesfully entered." );
	console.log("");

	choice = readlineSync.question('Want to know size of Dictionary (this may take a while)? (y/n) : ');
	if( choice == 'y' ) {
		console.log("Size of array containing all words : "+(sizeof(dictionary)/1000000)+" Mb.");
		console.log("");
	}

	return ( dictionary );

};