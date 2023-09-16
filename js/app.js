const canvasDoors = document.querySelector("#canvasDoors");
const canvasLED1_1 = document.querySelector("#canvasLED1-1");
const canvasLED1_2 = document.querySelector("#canvasLED1-2");
const canvasLED2_1 = document.querySelector("#canvasLED2-1");
const canvasLED2_2 = document.querySelector("#canvasLED2-2");

const ctxDoors = canvasDoors.getContext("2d");
const ctxLED1_1 = canvasLED1_1.getContext("2d");
const ctxLED1_2 = canvasLED1_2.getContext("2d");
const ctxLED2_1 = canvasLED2_1.getContext("2d");
const ctxLED2_2 = canvasLED2_2.getContext("2d");

const wrapper = document.querySelector("#wrapper");
const elevatorBtn = document.querySelector("#elevatorBtn");

const DOOR_WIDTH = 150;
let DOOR_HEIGHT = wrapper.clientHeight;

let seletedSection = "section1";
let leftDoorImg;
let rightDoorImg;

let leftDoorX = 0;
let rightDoorX = 151;

//
const board = {
  width: 16,
  height: 32,
};

const axis_x_points = [
  { from: [0, 0], to: [1, 0] },
  { from: [0, 1], to: [1, 1] },
  { from: [0, 2], to: [1, 2] },
];
const axis_y_points = [
  { from: [0, 0], to: [0, 1] }, // left
  { from: [0, 1], to: [0, 2] }, // left
  { from: [1, 0], to: [1, 1] }, // right
  { from: [1, 1], to: [1, 2] }, // right
];

const empty = {
  x: [],
  y: [],
};
const one = {
  x: [],
  y: [2, 3],
};
const two = {
  x: [0, 1, 2],
  y: [1, 2],
};
const three = {
  x: [0, 1, 2],
  y: [2, 3],
};
const alphabetB = {
  x: [1, 2],
  y: [0, 1, 3],
};
const alphabetL = {
  x: [2],
  y: [0, 1],
};

const supported_numbers = [empty, one, two, three, alphabetB, alphabetL];

const utils = {
  is_vertical(points) {
    if (points.from[1] != points.to[1]) return true;
    return false;
  },
  diff(first, second) {
    return first.filter(function (value) {
      return !second.find(function (current_item) {
        return current_item === value;
      });
    });
  },
};

const Numeral_LED_Matrix = function (number, options) {
  this.ctx = options.canvas.getContext("2d");
  this.reset();

  const selected_num = supported_numbers[number];
  this.ctx.save();
  this.ctx.translate(4, 4);

  this.convert_points_to_board_values(selected_num);
  this.ctx.restore();
};

Numeral_LED_Matrix.prototype.reset = function () {
  this.ctx.clearRect(0, 0, 100, 100);
};

Numeral_LED_Matrix.prototype.draw_line = function (points, isOff) {
  let values = this.positioning_values_on_board(points);

  this.ctx.save();
  this.ctx.beginPath();
  this.ctx.lineCap = "round";
  this.ctx.lineWidth = 4;
  this.ctx.strokeStyle = "red";
  if (isOff) this.ctx.globalAlpha = 0.2;
  this.ctx.moveTo(values.from.x, values.from.y);
  this.ctx.lineTo(values.to.x, values.to.y);
  this.ctx.stroke();
  this.ctx.closePath();
  this.ctx.restore();
};

Numeral_LED_Matrix.prototype.convert_points_to_board_values = function (
  points
) {
  var __ = this;
  x_points = axis_x_points.map(function (val, index) {
    return index;
  });
  y_points = axis_y_points.map(function (val, index) {
    return index;
  });

  x_on = points.x;
  x_off = utils.diff(x_points, x_on);

  y_on = points.y;
  y_off = utils.diff(y_points, y_on);

  // draw off lines
  x_off.forEach(function (selected_index) {
    __.draw_line(axis_x_points[selected_index], true);
  });

  y_off.forEach(function (selected_index) {
    __.draw_line(axis_y_points[selected_index], true);
  });

  // draw on lines
  x_on.forEach(function (selected_index) {
    __.draw_line(axis_x_points[selected_index]);
  });

  y_on.forEach(function (selected_index) {
    __.draw_line(axis_y_points[selected_index]);
  });
};

Numeral_LED_Matrix.prototype.positioning_values_on_board = function (points) {
  const base = board.width / 4;

  const from = {};
  const to = {};

  if (utils.is_vertical(points)) {
    // from
    from.x = points.from[0] * board.width;
    from.y = points.from[1] * (board.height / 2) + base;

    // to
    to.x = points.to[0] * board.width;
    to.y = points.to[1] * (board.height / 2) - base;
  } else {
    // from
    from.x = points.from[0] * board.width + base;
    from.y = points.from[1] * (board.height / 2);

    // to
    to.x = points.to[0] * board.width - base;
    to.y = points.to[1] * (board.height / 2);
  }

  return {
    from: from,
    to: to,
  };
};

const changeNumeralLED = (stair) => {
  let leftNum;
  let rightNum;
  switch (stair) {
    case "L":
      leftNum = 5;
      rightNum = 0;
      break;
    case "B1":
      leftNum = 4;
      rightNum = 1;
      break;
    case "B2":
      leftNum = 4;
      rightNum = 2;
      break;
    case "B3":
      leftNum = 4;
      rightNum = 3;
      break;
  }

  new Numeral_LED_Matrix(leftNum, { canvas: canvasLED1_1 });
  new Numeral_LED_Matrix(rightNum, { canvas: canvasLED1_2 });
  new Numeral_LED_Matrix(leftNum, { canvas: canvasLED2_1 });
  new Numeral_LED_Matrix(rightNum, { canvas: canvasLED2_2 });
};
//

const init = () => {
  makeDoors();
  makeLED();
  changeNumeralLED("L");
  moveToSection();
};

const clickPanel = (stair) => {
  switch (stair) {
    case "L":
      seletedSection = "section1";
      break;
    case "B1":
      seletedSection = "section2";
      break;
    case "B2":
      seletedSection = "section3";
      break;
    case "B3":
      seletedSection = "section4";
      break;
  }

  changeNumeralLED(stair);
  openDoors();
};

const makeDoors = () => {
  console.log("make doors");
  canvasDoors.height = wrapper.clientHeight;

  leftDoorImg = new Image();
  rightDoorImg = new Image();

  leftDoorImg.src = "../images/panel.jpeg";
  rightDoorImg.src = "../images/panel.jpeg";

  ctxDoors.clearRect(0, 0, canvasDoors.width, canvasDoors.height);

  leftDoorImg.onload = () => {
    ctxDoors.drawImage(leftDoorImg, 0, 0, DOOR_WIDTH, DOOR_HEIGHT);
  };
  rightDoorImg.onload = () => {
    ctxDoors.drawImage(rightDoorImg, 151, 0, DOOR_WIDTH, DOOR_HEIGHT);
  };
};

const makeLED = () => {
  console.log("make LED");
};

let startTime;
// open animation
const openDoors = () => {
  console.log("open doors");
  if (leftDoorX !== 0) return;

  startTime = new Date().getTime();
  setTimeout(() => {
    requestAnimationFrame(moveDoors);
  }, 100);
};

const closeDoors = () => {
  console.log("close doors");
  ctxDoors.drawImage(leftDoorImg, 0, 0, DOOR_WIDTH, DOOR_HEIGHT);
  ctxDoors.drawImage(rightDoorImg, 151, 0, DOOR_WIDTH, DOOR_HEIGHT);

  leftDoorX = 0;
  rightDoorX = 151;
};

// animate
const DURATION = 100;
const moveDoors = () => {
  // console.log("move doors", rightDoorX);
  if (rightDoorX > DOOR_WIDTH * 2) {
    moveToSection();
    closeDoors();
    return;
  }

  // easeOut 효과
  let time = new Date().getTime() - startTime;
  leftDoorX -= DURATION / time;
  rightDoorX += DURATION / time;

  ctxDoors.clearRect(0, 0, canvasDoors.width, canvasDoors.height);
  ctxDoors.drawImage(leftDoorImg, leftDoorX, 0, DOOR_WIDTH, DOOR_HEIGHT);
  ctxDoors.drawImage(rightDoorImg, rightDoorX, 0, DOOR_WIDTH, DOOR_HEIGHT);

  leftDoorX--;
  rightDoorX++;

  requestAnimationFrame(moveDoors);
};

const moveToSection = () => {
  const node = document.querySelector(`#${seletedSection}`);

  window.scrollTo({
    top: node.offsetTop,
    behavior: "instant", // ex: smooth
  });
};

const moveToTop = () => {
  seletedSection = "section1";
  elevatorBtn.children[1].style.color = "#ff0000";

  setTimeout(() => {
    moveToSection();
    elevatorBtn.children[1].style.color = "black";
  }, 1000);
};

window.addEventListener("resize", function () {
  console.log("resize!", wrapper.clientHeight);
  DOOR_HEIGHT = wrapper.clientHeight;
  makeDoors();
});

init();
