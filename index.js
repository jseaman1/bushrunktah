let bush;
let bg;
let hotdog;
let minecraft;
let links;

function setup() {
  createCanvas(700, 520);
}

function preload() {
  bush = loadImage('https://i.imgur.com/1xIkHQC.png');
  bg = loadImage('https://i.imgur.com/FRh6zJe.jpg');
  hotdog = loadImage('https://i.imgur.com/seUuPu2.png');
  minecraft = loadImage('https://i.imgur.com/eIxKuW7.png');
  links = loadImage('https://i.imgur.com/dJ4sxWW.png');
}
let player = { x: 0, y: 0, speed: 0.08, radius: 25, color: 'rgba(200, 0, 0, 0.6)' };
let enemies = [
  {
    x: 400,
    y: 400,
    speed: 0.004,
    radius: 25,
    color: 'rgba(0, 90, 90, 0.6)',
    img: hotdog
  },
  {
    x: 200,
    y: 700,
    speed: 0.01,
    radius: 25,
    color: 'rgba(90, 0, 90, 0.6)',
    img: hotdog
  },
  {
    x: 200,
    y: 700,
    speed: 0.02,
    radius: 25,
    color: 'rgba(90, 90, 0, 0.6)',
    img: hotdog
  }
];

function drawCharater(character, target, img) {
  character.x += (target.x - character.x) * character.speed;
  character.y += (target.y - character.y) * character.speed;
  fill(character.color);
  noStroke();

  image(img, character.x, character.y);
  //ellipse(character.x, character.y, character.radius*2);
}

function adjustEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    for (let j = i + 1; j < enemies.length; j++) {
      collision(enemies[i], enemies[j]);
    }
  }
}



function collision(c1, c2) {
  let [dx, dy] = [c2.x - c1.x, c2.y - c1.y];
  const distance = Math.hypot(dx, dy);
  let overlap = c1.radius + c2.radius - distance;
  if (overlap > 0) {
    dx /= distance;
    dy /= distance;
    c1.x -= dx * overlap / 2;
    c1.y -= dy * overlap / 2;
    c2.x += dx * overlap / 2;
    c2.y += dy * overlap / 2;
  }
}

function draw() {
  background(bg);
  drawCharater(player, { x: mouseX, y: mouseY }, bush);
  drawCharater(enemies[0], player, minecraft);
  drawCharater(enemies[1], player, links);
  drawCharater(enemies[2], player, hotdog);
  adjustEnemies();
}
