"use strict";
// 27 boolean variables contained in each letter[]
// each of these denotes if a particular letter comes next in a word.
// letter[0] = true => Present path will form a valid word.
// letter[1 to 26] = true => Implies word can be formed with corresponding letter.
// Check in next[1 to 26] to see possible word options
// next[0] is always = {}; -> Slight waste of memory space
module.exports = function() {
	return {
		letter : [
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
		],
		next : [
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{}
		]
	};
};