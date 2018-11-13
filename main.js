import Board from './board.js';
import Pathfinding from './AStarPathfinding.js';
import InputHandling from './input.js';

// Canvas Settings
const canvas = document.getElementById("drawingArea");
const graphics = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

// Horrible clicking check but it will do for now
let clickTimes = 0;
let startingTile = {
    x: 0,
    y: 0
}
let endingTile = {
    x: 0,
    y: 0
}

// Board
const tileMap = new Board(graphics);
tileMap.render();

// A* Algorithm
let pathfinder = new Pathfinding(tileMap);

// Listeners
const inputHandling = new InputHandling(pathfinder, tileMap, canvas);

// Mouse
const getMousePos = (canvas, event) => {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

canvas.addEventListener('click', (event) => {
    var mousePos = getMousePos(canvas, event);
    
    if (clickTimes === 0){
        pathfinder.path = [];
        startingTile.x = Math.floor(mousePos.x / 10);
        startingTile.y = Math.floor(mousePos.y / 10);
        if (startingTile.x < 0 || startingTile.x > 500 || startingTile.y < 0 || startingTile.y > 500) {
            startingTile.x = 0;
            startingTile.y = 0;
        }
        tileMap.getTile(startingTile.x, startingTile.y).passable = true;
        tileMap.getTile(startingTile.x, startingTile.y).color = "yellow";
        tileMap.render();
        clickTimes = 1;
        document.getElementById("status").innerText = "Click to set End point";
    } else if (clickTimes === 1){
        endingTile.x = Math.floor(mousePos.x / 10);
        endingTile.y = Math.floor(mousePos.y / 10);

        if (endingTile.x < 0 || endingTile.x > 500 || endingTile.y < 0 || endingTile.y > 500) {
            endingTile.x = 1;
            endingTile.y = 1;
        }
        tileMap.getTile(endingTile.x, endingTile.y).passable = true;
        document.getElementById("nopath").innerHTML = "Finding path";
        pathfinder.createPath(tileMap.getTile(startingTile.x, startingTile.y), tileMap.getTile(endingTile.x, endingTile.y));
        tileMap.getTile(endingTile.x, endingTile.y).color = "red";
        tileMap.render();
        document.getElementById("status").innerText = "Click Reset to start new path or new map";
        clickTimes = 2;
    }
    
});

const newMapButton = document.getElementById('newMap');
newMapButton.addEventListener('click', (event) => {
    location.reload(true);
});

const resetTile = () => {
    startingTile.x = 0;
    startingTile.y = 0;
    endingTile.x = 0;
    endingTile.y = 0;
}

const reset = document.getElementById("reset");
reset.addEventListener('click', (event) => {
    event.preventDefault();
    pathfinder = new Pathfinding(tileMap);
    document.getElementById("status").innerText = "Click to set Start Point";
    document.getElementById("nopath").innerText = "";
    tileMap.resetTiles();
    resetTile();
    graphics.clearRect(0, 0, canvas.height, canvas.height);
    tileMap.render();
    clickTimes = 0;
});