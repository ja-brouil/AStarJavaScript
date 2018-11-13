import Tile from './tile.js';

/**
 * Represents the board state
 */

 class Board {
    constructor(graphics){
        this.allTiles = [];
        this.maxWidth = 500;
        this.maxHeight = 500;
        this.lenghtOfTile = 10;
        this.graphics = graphics;

        this.createInitialTiles();
        this.randomizeUnpassableTiles();
    }

    /**
     * Returns the tile at coordinate x and y
     * @param {int} x 
     * @param {int} y 
     */
    getTile(x,y){
        return this.allTiles[x][y];
    }

    createInitialTiles(){
        let tileRow = [];
        for (let i = 0; i < (this.maxWidth / this.lenghtOfTile); i++) {
            for (let j = 0; j < (this.maxHeight / this.lenghtOfTile); j++){
                tileRow.push(new Tile(i * this.lenghtOfTile, j * this.lenghtOfTile));
            }
            this.allTiles.push(tileRow);
            tileRow = [];
        }

        this.findAdjTiles();
    }

    findAdjTiles(){
        let adjTiles = [];
        for (let i = 0; i < this.allTiles.length; i++){
            for (let j = 0; j < this.allTiles[i].length; j++){
                if (i + 1 < this.allTiles.length){
                    adjTiles.push(this.allTiles[i + 1][j]);
                }

                if (i - 1 >= 0){
                     adjTiles.push(this.allTiles[i - 1][j]);
                }
                
                if (j - 1 >= 0){
                    adjTiles.push(this.allTiles[i][j - 1]);
                }
            
                if (j + 1 < this.allTiles[i].length){
                    adjTiles.push(this.allTiles[i][j + 1]);
                }

                this.allTiles[i][j].adjTiles = adjTiles;
                adjTiles = [];
            }
        }
    }

    // Randomize unpassable tiles
    randomizeUnpassableTiles(){
        for (let i = 0; i < this.allTiles.length; i++){
            for (let j = 0; j < this.allTiles[i].length; j++){
                let unpassable = Math.floor(Math.random() * 5);
                if (unpassable == 1){
                    this.allTiles[i][j].passable = false;
                    this.allTiles[i][j].color = "#000000";
                }
            }
        }
    }

    // New Map
    generateNewMap(){
        for (let i = 0; i < this.allTiles.length; i++) {
            for (let j = 0; j < this.allTiles[i].length; j++) {
                this.allTiles[i][j].passable = true;
                this.allTiles[i][j].color = "#81F781";
            }
        }
        this.randomizeUnpassableTiles();
    }

    // Reset Tiles
    resetTiles(){
        this.graphics.clearRect(0, 0, this.maxWidth, this.maxHeight);
        for (let i = 0; i < this.allTiles.length; i++) {
            for (let j = 0; j < this.allTiles[i].length; j++) {
                if (this.allTiles[i][j].passable){
                    this.allTiles[i][j].color = "#81F781";
                }
            }
        }
    }


    /**
     * Render the canvas out
     */
    render(){
        // All Tiles
        this.graphics.clearRect(0, 0, this.maxWidth, this.maxHeight);
        for (let i = 0; i < this.allTiles.length; i++){
            let tileRow = this.allTiles[i];
            for (let j = 0; j < tileRow.length; j++){
                this.graphics.beginPath();
                this.graphics.rect(tileRow[j].x + 1, tileRow[j].y + 1, this.lenghtOfTile - 1, this.lenghtOfTile - 1);
                this.graphics.fillStyle = tileRow[j].color;
                this.graphics.fill();
            }
        }
    }
 }

 export default Board;