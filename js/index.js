const array = [
  // Top wall
  Array(25).fill("block"),
  // Outer wall with an entrance and two emptys
  [
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
  ],
  // Inner walls and paths
  [
    "block",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "block",
    "block",
    "block",
    "block",
    "block",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "block",
  ],
  [
    "block",
    "empty",
    "block",
    "block",
    "block",
    "empty",
    "block",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "block",
    "block",
    "block",
    "empty",
    "empty",
    "empty",
    "block",
  ],
  [
    "block",
    "empty",
    "block",
    "empty",
    "block",
    "empty",
    "block",
    "empty",
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
    "empty",
    "empty",
    "empty",
    "block",
    "empty",
    "block",
    "empty",
    "block",
  ],
  [
    "block",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "block",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "block",
    "empty",
    "block",
    "empty",
    "block",
    "empty",
    "block",
  ],
  [
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "block",
    "empty",
    "block",
    "empty",
    "block",
  ],
  [
    "block",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "block",
    "block",
  ],
  [
    "block",
    "empty",
    "block",
    "block",
    "block",
    "block",
    "block",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "block",
    "block",
    "block",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "block",
  ],
  [
    "block",
    "empty",
    "block",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "block",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "block",
  ],
  [
    "block",
    "empty",
    "block",
    "empty",
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
    "block",
    "empty",
    "block",
    "block",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "block",
  ],
  // Bottom wall
  Array(25).fill("block"),
];

const PLAYER_START_X = 8;
const PLAYER_START_Y = 8;

const MONSTER_1_START_X = 12;
const MONSTER_1_START_Y = 5;

const MONSTER_2_START_X = 12;
const MONSTER_2_START_Y = 8;

const TREASURE_1_START_X = 10;
const TREASURE_1_START_Y = 5;

const TREASURE_2_START_X = 15;
const TREASURE_2_START_Y = 8;

class Game {
  constructor(array) {
    this.initialArray = array;
    this.initializeGame();
  }

  isWin() {
    return this.treasures.length === 0;
  }

  initializeGame() {
    this.grid = JSON.parse(JSON.stringify(this.initialArray)); // Deep clone the array
    this.player = new Player(PLAYER_START_X, PLAYER_START_Y);
    this.monsters = [
      new Monster(MONSTER_1_START_X, MONSTER_1_START_Y),
      new Monster(MONSTER_2_START_X, MONSTER_2_START_Y),
    ];
    this.treasures = [
      new Treasure(TREASURE_1_START_X, TREASURE_1_START_Y),
      new Treasure(TREASURE_2_START_X, TREASURE_2_START_Y),
    ];
    // ... add initialization for treasures, monsters, etc.
  }

  movePlayer(dx, dy) {
    if (this.gameOver || this.isWin()) return; // Ignore movement if the game is over or won

    this.player.move(dx, dy, this.grid);
    this.checkCollision();
  }

  moveMonsters() {
    if (this.gameOver || this.isWin()) return; // Ignore movement if the game is over or won

    this.monsters.forEach((monster) => monster.randomMove(this.grid));
    this.checkCollision();
  }
  checkCollision() {
    this.monsters.forEach((monster) => {
      if (monster.x === this.player.x && monster.y === this.player.y) {
        alert("Game Over!");
        this.gameOver = true;
      }
    });

    this.treasures.forEach((treasure, index) => {
      if (treasure.x === this.player.x && treasure.y === this.player.y) {
        this.player.score += 1;
        this.treasures.splice(index, 1); // Remove the treasure from the game
      }
    });
  }

  restart() {
    this.gameOver = false;
    this.initializeGame();
  }

  render() {
    const gridElement = document.getElementById("grid");
    gridElement.innerHTML = ""; // Clear the existing grid
    console.log(this.grid);

    this.grid.forEach((row, y) => {
      const rowElement = document.createElement("div");
      rowElement.className = "row";
      row.forEach((cell, x) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell"); // Add the "cell" class to all cells
        cellElement.classList.add(cell); // Add the type of cell as a class

        if (this.player.x === x && this.player.y === y) {
          cellElement.classList.add("player");
        }

        this.monsters.forEach((monster) => {
          if (monster.x === x && monster.y === y) {
            cellElement.classList.add("monster");
          }
        });

        this.treasures.forEach((treasure) => {
          if (treasure.x === x && treasure.y === y) {
            cellElement.classList.add("treasure");
          }
        });

        rowElement.appendChild(cellElement);
      });

      gridElement.appendChild(rowElement);
    });

    // Update the score
    document.getElementById("score").innerText = this.player.score;
    // show game over message
    if (this.gameOver) {
      document.getElementById("game-over").classList.remove("hidden");
    } else {
      document.getElementById("game-over").classList.add("hidden");
    }
    // show win message
    if (this.isWin()) {
      document.getElementById("win-screen").classList.remove("hidden");
    } else {
      document.getElementById("win-screen").classList.add("hidden");
    }
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
  }

  move(dx, dy, grid) {
    let newX = this.x + dx;
    let newY = this.y + dy;
    if (grid[newY] && grid[newY][newX] !== "block") {
      this.x = newX;
      this.y = newY;
    }
  }
}

class Monster {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  randomMove(grid) {
    let directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    let [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
    let newX = this.x + dx;
    let newY = this.y + dy;
    if (grid[newY] && grid[newY][newX] !== "block") {
      this.x = newX;
      this.y = newY;
    }
  }
}

class Treasure {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const game = new Game(array);

game.render();

document.getElementById("top").addEventListener("click", () => {
  game.movePlayer(0, -1);
  game.moveMonsters();
  game.render();
});

document.getElementById("bottom").addEventListener("click", () => {
  game.movePlayer(0, 1);
  game.moveMonsters();
  game.render();
});

document.getElementById("left").addEventListener("click", () => {
  game.movePlayer(-1, 0);
  game.moveMonsters();
  game.render();
});

document.getElementById("right").addEventListener("click", () => {
  game.movePlayer(1, 0);
  game.moveMonsters();
  game.render();
});

document.getElementById("restart").addEventListener("click", () => {
  game.restart();
  game.render();
});

// listen for keypress events
document.addEventListener("keydown", (event) => {
  const key = event.key;
  let dx = 0;
  let dy = 0;
  if (key === "ArrowUp") {
    dy = -1;
  } else if (key === "ArrowDown") {
    dy = 1;
  } else if (key === "ArrowLeft") {
    dx = -1;
  } else if (key === "ArrowRight") {
    dx = 1;
  } else if (key === "r") {
    game.restart();
  } else {
    return; // do nothing
  }
  game.movePlayer(dx, dy);
  game.moveMonsters();
  game.render();
});
