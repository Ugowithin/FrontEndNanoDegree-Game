// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png'; 

    //setting the initial location
    this.x = x;
    this.y = y;
    this.height = 55;
    this.width = 75;
    this.velocity = (Math.random()*350) + 120;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.velocity*dt;
    if ( this.x > 505 || this.x < 0) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png'; 
    this.x = 200;
    this.y = 400;
}

Player.prototype.update = function(dt) {
    if (this.y <= 0) {
        this.win();
    };
    ifCollision();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//moves the player using arrow key inputs
Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if (this.x > 0){
                this.x -=101;
            }
            else {
                console.log('out of bounds!');
            }
            break;
        case 'right':
            if (this.x < 400){
                this.x +=101;
            }
            else {
                console.log('out of bounds!');
            }
            break;
        case 'up':
            this.y -=83;
            break;
        case 'down':
            if (this.y < 400){
                this.y +=83; 
            }
            else {
                console.log('out of bounds!')
            }
            break;
    }
};

Player.prototype.lose = function() {
    this.x = 200;
    this.y = 400;
    console.log('You died.');
}

Player.prototype.win = function() {
    this.x = 200;
    this.y = 400;
    console.log('You win!');
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

var allEnemies = [];

var enemy1 = new Enemy(-100,55);
var enemy2 = new Enemy(-100,140);
var enemy3 = new Enemy(-100,225);

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//ifCollision sets the criteria for a collision
var ifCollision = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x < allEnemies[i].x + 90 && 
            player.x + 75 > allEnemies[i].x && 
            player.y < allEnemies[i].y + 70 && 
            70 + player.y > allEnemies[i].y) { 
            player.lose();
        };
    };
};
