class Character {
  constructor(x, y, color, radius, speed) {
    Object.assign(this, { x, y, color, radius, speed });
  }
  draw(picture) {
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2);
    image(picture, this.x - 15, this.y - 15, 30, 30);
  }
  move(target) {
    this.x += (target.x - this.x) * this.speed;
    this.y += (target.y - this.y) * this.speed;
  }
}

const player = new Character(30, 30, "rgba(255, 255, 255, 0.3)", 20, 0.05);
const enemies = [
  new Character(350, 400, "rgba(255, 255, 255, 0.3)", 20, 0.01),
  new Character(175, 400, "rgba(255, 255, 255, 0.3)", 20, 0.02),
  new Character(525, 400, "rgba(255, 255, 255, 0.3)", 20, 0.003)
];
let scarecrow;
let scarecrowImg;
let bush;
let bg;
let hotdog;
let health = 40;
let canvasWidth = 800;
let canvasHeight = 620;

let counter = 0;

const timer = document.querySelector("#timer");
const healthMeter = document.querySelector("#health");
const timeInterval = setInterval(timeIt, 1000);
const healthInterval = setInterval(updateHealth, 50);
const enemyInterval = setInterval(newEnemy, 10000);

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
}

function preload() {
  bush = loadImage("https://i.imgur.com/1xIkHQC.png");
  bg = loadImage("https://i.imgur.com/FRh6zJe.jpg");
  hotdog = loadImage("https://i.imgur.com/seUuPu2.png");
  scarecrowImg = loadImage("https://i.imgur.com/Jwjgg6y.png");
}

function draw() {
  background(bg);
  if (health === 0) {
    end();
  }
  player.draw(bush);
  player.move({ x: mouseX, y: mouseY });
  enemies.forEach(enemy => enemy.draw(hotdog));
  enemies.forEach(enemy => enemy.move(scarecrow || player));
  if (scarecrow) {
    scarecrow.draw(scarecrowImg);
    scarecrow.ttl--;
    if (scarecrow.ttl < 0) {
      scarecrow = undefined;
    }
  }
  adjust();
}

function timeIt() {
  counter++;
  timer.textContent = `Timer: ${convertSeconds(counter)}`;
}

function updateHealth() {
  healthMeter.textContent = "Health: " + health;
}

function convertSeconds(s) {
  let min = Math.floor(s / 60);
  let sec = s % 60;
  return `${nf(min, 2)}:${nf(sec, 2)}`;
}

function adjust() {
  const characters = [player, ...enemies];
  for (let i = 0; i < characters.length; i++) {
    for (let j = i + 1; j < characters.length; j++) {
      if (characters[i] === player || characters[j] === player) {
        pushOffPlayer(characters[i], characters[j]);
      } else {
        pushOffEnemy(characters[i], characters[j]);
      }
    }
  }
}

function pushOffEnemy(c1, c2) {
  let [dx, dy] = [c2.x - c1.x, c2.y - c1.y];
  const distance = Math.hypot(dx, dy);
  let overlap = c1.radius + c2.radius - distance;
  if (overlap > 0) {
    const adjustX = overlap / 2 * (dx / distance);
    const adjustY = overlap / 2 * (dy / distance);
    c1.x -= adjustX;
    c1.y -= adjustY;
    c2.x += adjustX;
    c2.y += adjustY;
  }
}

function newEnemy() {
  let multiplyer = 1.3;
  enemies.push(
    new Character(
      20,
      400,
      "rgba(255, 255, 255, 0.3)",
      20 * multiplyer,
      0.02 * multiplyer
    )
  );
  multiplyer = multiplyer + .2;
}

function pushOffPlayer(c1, c2) {
  let [dx, dy] = [c2.x - c1.x, c2.y - c1.y];
  const distance = Math.hypot(dx, dy);
  let overlap = c1.radius + c2.radius - distance;
  if (overlap > 0) {
    health--;
    const adjustX = overlap / 2 * (dx / distance);
    const adjustY = overlap / 2 * (dy / distance);
    c1.x -= adjustX;
    c1.y -= adjustY;
    c2.x += adjustX;
    c2.y += adjustY;
  }
}

function mouseClicked() {
  if (!scarecrow) {
    scarecrow = new Character(
      player.x,
      player.y,
      "rgba(255, 255, 255, 0.3)",
      30,
      0
    );
    scarecrow.ttl = frameRate() * 5;
  }
}

function end() {
  clearInterval(timeInterval);
  clearInterval(healthInterval);
  clearInterval(enemyInterval);
  clearInterval()
  healthMeter.textContent = "Health: 0";
  let wordSpacing = 30;
  fill("rgba(155, 155, 155, 0.7)");
  rect(0, 0, width, height);
  fill("rgba(0, 0 ,0, 0.9)");
  ellipse(canvasWidth / 2, canvasHeight / 2 + wordSpacing, 300);
  rect();
  fill("red");
  textSize(32);
  textFont("Text Me One");
  textAlign(CENTER);
  text("GAME OVER", canvasWidth / 2, canvasHeight / 2);
  textSize(20);
  text(
    "K'tah has claimed another victim",
    canvasWidth / 2,
    canvasHeight / 2 + wordSpacing
  );
  textSize(16);
  text(
    `you lasted ${counter} seconds`,
    canvasWidth / 2,
    canvasHeight / 2 + wordSpacing * 2
  );

  exit();
}


