// Various Listeners
class Input {
    constructor(pathfinder, board){
        this.pathfinder = pathfinder;
        this.board = board;
    }

    

    // Start
    startPathFind(event, startingX, startingY, endingX, endingY){
        event.preventDefault();
        this.pathfinder.createPath(board.getTile(parseInt(startingX), parseInt(startingY), parseInt(endingX), parseInt(endingY)));
    }
}

export default Input;