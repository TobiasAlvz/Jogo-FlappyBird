function newElement(tagName, className) {
  const element = document.createElement(tagName);
  element.className = className;
  return element;
}

function Obstacle(reverse = false) {
  this.element = newElement("div", "obstacle");

  const border = newElement("div", "border");
  const body = newElement("div", "body");

  this.element.appendChild(reverse ? body : border);
  this.element.appendChild(reverse ? border : body);

  this.setHeight = (height) => (body.style.height = `${height}px`);
}

class PairOfObstacles {
  constructor(height, opening, x) {
    this.element = newElement("div", "pair-of-obstacles");

    this.upper = new Obstacle(true);
    this.lower = new Obstacle(false);

    this.element.appendChild(this.upper.element);
    this.element.appendChild(this.lower.element);

    this.randomize = () => {
      const upperHeight = Math.random() * (height - opening);
      const lowerHeight = height - opening - upperHeight;

      this.upper.setHeight(upperHeight);
      this.lower.setHeight(lowerHeight);
    };

    this.getX = () => parseInt(this.element.style.left.split("px")[0]);

    this.setX = (x) => (this.element.style.left = `${x}px`);

    this.getWidth = () => this.element.clientWidth;

    this.randomize();
    this.setX(x);
  }
}

function ObstacleController(height, width, opening, spacing, notifyScore) {
  this.obstacles = [
    new PairOfObstacles(height, opening, width),
    new PairOfObstacles(height, opening, width + spacing),
    new PairOfObstacles(height, opening, width + spacing * 2),
    new PairOfObstacles(height, opening, width + spacing * 3),
  ];

  const displacement = 3;

  this.animate = () => {
    this.obstacles.forEach((obstacle) => {
      obstacle.setX(obstacle.getX() - displacement);

      if (obstacle.getX() < -obstacle.getWidth()) {
        obstacle.setX(obstacle.getX() + spacing * this.obstacles.length);
        obstacle.randomize();
      }

      const middle = width / 2;
      const crossedMiddle =
        obstacle.getX() + displacement >= middle && obstacle.getX() <= middle;

      if (crossedMiddle) notifyScore();
    });
  };
}

function Bird(height) {
  let flying = false;

  this.element = newElement("img", "bird");
  this.element.src = "imagens/passaro.png";

  this.getX = () => parseInt(this.element.style.bottom.split("px")[0]);
  this.setY = (y) => (this.element.style.bottom = `${y}px`);

  window.onkeydown = (e) => (flying = true);
  window.onkeyup = (e) => (flying = false);

  this.animate = () => {
    const newY = this.getX() + (flying ? 8 : -5);
    const maxHeight = height - this.element.clientHeight;

    if (newY <= 0) {
      this.setY(0);
    } else if (newY >= maxHeight) {
      this.setY(maxHeight);
    } else {
      this.setY(newY);
    }
  };

  this.setY(height / 2);
}

const obstacleController = new ObstacleController(700, 1200, 200, 400);
const flappyBird = new Bird(700);
const gameArea = document.querySelector("[tp-flappy]");
gameArea.appendChild(flappyBird.element);
obstacleController.obstacles.forEach((obstacle) =>
  gameArea.appendChild(obstacle.element)
);

setInterval(() => {
  obstacleController.animate();
  flappyBird.animate();
}, 20);
