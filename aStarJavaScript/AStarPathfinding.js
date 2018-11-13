import PriorityQueue from './priorityQueue.js';

/**
 * Finds the shortest path between two distances
 */
class AStarPathFinding {
    constructor(board){
        this.board = board;
        this.openList = new PriorityQueue();
        this.closedList = [];
        this.lenghtOfTile = board.lenghtOfTile;
        this.path = [];
    }

    /**
     * Creates pathfinding queue to the destination
     * @param {Tile} destinationTile 
     */
    createPath(startingTile, destinationTile){
        // Reset costs
        this.resetHeuristics();

        this.closedList = [];
        this.openList.items = [];
        this.path = [];

        // Add initial cell
        this.openList.enqueue(startingTile, startingTile.getFCost());

        // Process all tiles
        while(!this.openList.isEmpty()){
            let currentTile = this.openList.dequeue().item;
            currentTile.closed = true;

            // Destination found
            if (currentTile === destinationTile){
                this.backtracePath(startingTile, destinationTile);
                break;
            }

            // Get Neighbors
            for (let i = 0; i < currentTile.adjTiles.length; i++){
                let adjTile = currentTile.adjTiles[i];
                
                // Skip impassable tiles
                if (!adjTile.passable || adjTile.closed){
                    continue;
                }

                // Calculate heuristics
                let newMovementCostToNeighbor = currentTile.gCost + 1;
                if (newMovementCostToNeighbor < adjTile.gCost || !this.openList.has(adjTile)){
                    adjTile.gCost = newMovementCostToNeighbor;
                    adjTile.hCost = this.calculateManhattanDistance(currentTile, destinationTile);
                    adjTile.parentTile = currentTile;

                    // Add to Open List
                    if (!this.openList.has(adjTile)) {
                        this.openList.enqueue(adjTile, adjTile.getFCost());
                    }
                }
            }
        }

        if (this.path.length == 0) {
            document.getElementById("nopath").innerText = "NO VALID PATH";
        } else {
            document.getElementById("nopath").innerHTML = "Found path";
        }
    }

    /**
     * Backtrace steps until we have found the destination tile
     */
    backtracePath(startTile, destinationTile){
        this.path = [];
        let currentTile = destinationTile;

        while (currentTile !== startTile){
            currentTile.color = "blue";
            this.path.push(currentTile);
            currentTile = currentTile.parentTile;
        }
    }

    /**
     * Resets the movement costs
     */
    resetHeuristics(){
        for (let i = 0; i < this.board.allTiles.lenght; i++){
            for (let j = 0; j < this.board.allTiles[i].lenght; j++){
                this.board.allTiles[i][j].hCost = 0;
                this.board.allTiles[i][j].hCost.gCost = 0;
                this.board.allTiles[i][j].parentTile = undefined;
                this.board.allTiles[i][j].closed = false;
            }
        }
    }


    calculateManhattanDistance(currentTile, destinationTile){
        return Math.abs(currentTile.x - destinationTile.x) + Math.abs(currentTile.y - destinationTile.y);
    }
}

export default AStarPathFinding;