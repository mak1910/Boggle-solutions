module.exports = function() { 
	return {
		getPresentPos: function( arr ) { 
			var len = arr.length;
			var pos = {
				x : 0,
				y : 0,
				value : 0
			};
			for( var i=0; i<len; i++ ) {
				for( var j=0; j<len; j++ ) {
					if( pos.value<arr[i][j] ) {
						pos.x = i;
						pos.y = j;
						pos.value = arr[i][j];
					}
				}
			}

			return pos;
		},
		getPlayableOptions: function( arr, x, y ) {
			var len = arr.length;
			var pos = [];
			var count = 0;
			if(this.checkRange(--x, y, len )) {
				if( arr[x][y] == 0 ) {
					pos[count] = {
						x: x,
						y: y
					};
					count++;
				}
			}
			if(this.checkRange(++y, x, len )) {
				if( arr[x][y] == 0 ) {
					pos[count] = {
						x: x,
						y: y
					};
					count++;
				}
			}
			if(this.checkRange(++x, y, len )) {
				if( arr[x][y] == 0 ) {
					pos[count] = {
						x: x,
						y: y
					};
					count++;
				}
			}
			if(this.checkRange(++x, y, len )) {
				if( arr[x][y] == 0 ) {
					pos[count] = {
						x: x,
						y: y
					};
					count++;
				}
			}
			if(this.checkRange(--y, x, len )) {
				if( arr[x][y] == 0 ) {
					pos[count] = {
						x: x,
						y: y
					};
					count++;
				}
			}
			if(this.checkRange(--y, x, len )) {
				if( arr[x][y] == 0 ) {
					pos[count] = {
						x: x,
						y: y
					};
					count++;
				}
			}
			if(this.checkRange(--x, y, len )) {
				if( arr[x][y] == 0 ) {
					pos[count] = {
						x: x,
						y: y
					};
					count++;
				}
			}
			if(this.checkRange(--x, y, len )) {
				if( arr[x][y] == 0 ) {
					pos[count] = {
						x: x,
						y: y
					};
					count++;
				}
			}

			return pos;
		},
		checkRange: function( x, y, len ) {
			if( x<0||y<0 )
				return false;
			if( len<=x||len<=y )
				return false;
			return true;
		},
		getMoves: function( playable, board, check ) {
			var play = [ false ];
			var len = playable.length;
			var count = 1;
			if( check.letter[0] ) {
				// Word Complete -> Do Something
				play[0] = true;
			}
			for( var i=0; i<len; i++ ) {
				if( check.letter[board[playable[i].x][playable[i].y]+1] ) {
					// This Move is feasible
					play[count] = playable[i];
					count++;
				}
			}
			return play;
		}
	}
};