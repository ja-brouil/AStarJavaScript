/**
 * Represents a tile on the canvas
 */

class Tile {
    constructor(x, y){
        // Location
        this.x = x;
        this.y = y;
        this.adjTiles = [];

        // Current Color for the tile
        this.color = "#81F781";

        // Parent Tile
        this.parentTile = undefined;
        
        // Tile Status
        this.passable = true;

        // Heuristics
        this.hCost = 0;
        this.gCost = 0;
        this.closed = false;
    }

    getFCost(){
        return this.hCost + this.gCost;
    }
}
export default Tile;