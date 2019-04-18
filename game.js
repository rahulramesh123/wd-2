var player;
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var spaceBarPressed = false;
var playerDirection = "down";
var playerArrows;
var arrowSpeed = 10;

function setPlayerDirection(dir) {
  //For displaying the walk animation to the correct direction
  //to ensure the player does not have both "left" and "right" applied at the same time
  player.classList.remove("up");
  player.classList.remove("left");
  player.classList.remove("right");
  player.classList.remove("down");

  player.classList.add(dir);
  playerDirection = dir;
}

// this function is for displaying the walk animation with their respective coordinates//
function keyUp(event) {
  switch (event.keyCode) {
    case 32:
      spaceBarPressed = false;
      break;
    case 37:
      leftPressed = false;
      break;
    case 38:
      upPressed = false;
      break;
    case 39:
      rightPressed = false;
      break;
    case 40:
      downPressed = false;
      break;
  }
}
// The function move is used to apply setting for the arrow keys to move the person to its respective direction//

function move() {
  var left = player.offsetLeft;
  var top = player.offsetTop;

  if (downPressed) {
    setPlayerDirection("down");
    top = top + 1;
  }

  if (upPressed) {
    setPlayerDirection("up");
    top = top - 1;
  }

  if (leftPressed) {
    setPlayerDirection("left");
    left = left - 1;
  }

  if (rightPressed) {
    setPlayerDirection("right");
    left = left + 1;
  }

  //to get the elements at the coordinates from where the player will move //
  //the corners of the players is checked to avoid collision on all four sides//
  var playerTopLeft = document.elementFromPoint(left, top);
  var playerTopRight = document.elementFromPoint(left + 32, top);
  var playerBottomLeft = document.elementFromPoint(left, top + 48);
  var playerBottomRight = document.elementFromPoint(left + 32, top + 48);

  //The class "blocking" is used such that the player doesnt move when it collides with a obstacle //
  //The player can only be moved to "top" and "left" position when its stopped by an obstacle//
  if (
    !playerTopLeft.classList.contains("blocking") &&
    !playerTopRight.classList.contains("blocking") &&
    !playerBottomLeft.classList.contains("blocking") &&
    !playerBottomRight.classList.contains("blocking")
  ) {
    player.style.left = left + "px";
    player.style.top = top + "px";
  }
// the "spaceBarPressed" class is added so that when the spacebar is clicked it fires an arrow //
  if (spaceBarPressed) {
    spaceBarPressed = false;
    player.classList.add("fire");
    var arrow = createArrow(playerDirection, left, top);
    playerArrows.appendChild(arrow);
  }
  //This part shows whether the player moves when they are pressed with their respective keys//
  else if (leftPressed || rightPressed || upPressed || downPressed) {
    player.classList.add("walk");
    player.classList.remove("stand");
  } 
  //Otherwise, when no keys are pressed the player is made to stand still//
  else {
    player.classList.add("stand");
    player.classList.remove("walk");
    player.classList.remove("fire");
  }

  moveArrows();
}
// this "moveArrow" class is used to generate an arrow with its respective length and width//
function moveArrows() {
  var arrows = playerArrows.childNodes;
  for (var i = 0; i < arrows.length; i++) {
    moveArrow(arrows[i]);
  }
}

function moveArrow(arrow) {
  var left = arrow.offsetLeft;
  var top = arrow.offsetTop;

  if (arrow.classList.contains("down")) {
    top = top + arrowSpeed;
  } else if (arrow.classList.contains("up")) {
    top = top - arrowSpeed;
  } else if (arrow.classList.contains("left")) {
    left = left - arrowSpeed;
  } else if (arrow.classList.contains("right")) {
    left = left + arrowSpeed;
  }

  //TO get the element at the coordinatesfrom where the play will move on//
  //THe arrow must be checked at all four sides whether there is no collision//
  var arrowTopLeft = document.elementFromPoint(left, top);
  var arrowTopRight = document.elementFromPoint(left + 40, top);
  var arrowBottomLeft = document.elementFromPoint(left, top + 10);
  var arrowBottomRight = document.elementFromPoint(left + 32, top + 10);

if (arrowTopLeft && arrowTopLeft.classList.contains("enemy")) {// kill the enemies
    hitEnemy(arrow, arrowTopLeft);
    return;
  } else if (arrowTopRight && arrowTopRight.classList.contains("enemy")) {
    hitEnemy(arrow, arrowTopRight);
    return;
  } else if (arrowBottomLeft && arrowBottomLeft.classList.contains("enemy")) {
    hitEnemy(arrow, arrowBottomLeft);
    return;
  } else if (arrowBottomRight && arrowBottomRight.classList.contains("enemy")) {
    hitEnemy(arrow, arrowBottomRight);
    return;
  }
  //to make the arrow go out of the map when there is no collision with objects//
  if (
    !arrowTopLeft ||
    !arrowTopRight ||
    !arrowBottomLeft ||
    !arrowBottomRight
  ) {
    playerArrows.removeChild(arrow);
    return;
  }

  

  //If the arrow is blocked by any obstacles it get stuck and stop there without any movement//
  // The arrow can only be moved to the 'left' and 'top' coordinates when it collides with an obstacle//
  if (//**
    !arrowTopLeft.classList.contains("blocking") &&
    !arrowTopRight.classList.contains("blocking") &&
    !arrowBottomLeft.classList.contains("blocking") &&
    !arrowBottomRight.classList.contains("blocking")
  ) {
    arrow.style.left = left + "px";
    arrow.style.top = top + "px";
  }
}

function hitEnemy(arrow, enemy) {
  playerArrows.removeChild(arrow);
  enemy.classList.add("dead");
  setTimeout(removeEnemy, 3000, enemy);
}
//this function is to remove the enemy when it is hit by the arrow//
function removeEnemy(enemy) {
  if (enemy && document.body.contains(enemy)) {
    document.body.removeChild(enemy);
    onAllEnemiesHit();
  }
}
// pops up a message "You win" when the player shoots down all the enemy//
function onAllEnemiesHit() {
  var enemies = document.querySelectorAll('.enemy');
  if(enemies.length === 0) {
    alert('You win!');
    playAgain(); 
  }  
}
//pops up a message "play again" if the player wants to play the game again//
function playAgain() {
  if (confirm("Play again?")) {
    window.location.reload();
  }
}



// the arrow  can be fired  to any diretion //
function createArrow(dir, left, top) { //**
  var arrow = document.createElement("div");
  arrow.classList.add("arrow");
  arrow.classList.add(dir);
  switch (dir) {
    case "left":
      left -= 32;
      top += 16;
      break;
    case "right":
      left += 32;
      top += 16;
      break;
    case "up":
      top -= 16;
      break;
    case "down":
      top += 48;
      break;
  }
  arrow.style.left = left + "px";
  arrow.style.top = top + "px";
  return arrow;
}
function keyDown(event) {//**
  switch (event.keyCode) {
    case 32:
      spaceBarPressed = true;
      break;
    case 37:
      leftPressed = true;
      break;
    case 38:
      upPressed = true;
      break;
    case 39:
      rightPressed = true;
      break;
    case 40:
      downPressed = true;
      break;
  }
}


function gameStart() {
  player = document.getElementById("player");
  playerArrows = document.createElement('div');
  document.body.appendChild(playerArrows);
  setInterval(move, 10);
  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);
}

document.addEventListener("DOMContentLoaded", gameStart);
