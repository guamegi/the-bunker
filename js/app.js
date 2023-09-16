const canvasDoors = document.querySelector("#canvasDoors");
const canvasLED1_1 = document.querySelector("#canvasLED1_1");
const canvasLED1_2 = document.querySelector("#canvasLED1_2");
const canvasLED2_1 = document.querySelector("#canvasLED2_1");
const canvasLED2_2 = document.querySelector("#canvasLED2_2");

const ctxDoors = canvasDoors.getContext("2d");
// const ctxLED1_1 = canvasLED1_1.getContext("2d");
// const ctxLED1_2 = canvasLED1_2.getContext("2d");
// const ctxLED2_1 = canvasLED2_1.getContext("2d");
// const ctxLED2_2 = canvasLED2_2.getContext("2d");

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
const alphabetL = {
  x: [2],
  y: [0, 1],
};
const hyphen = {
  x: [1],
  y: [],
};

const supported_numbers = [empty, one, two, alphabetL, hyphen];

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

class Numeral_LED_Matrix {
  constructor(number, options) {
    this.init(number, options);
  }

  init(number, options) {
    this.ctx = options.canvas.getContext("2d");
    this.reset();

    const selected_num = supported_numbers[number];
    this.ctx.save();
    this.ctx.translate(4, 4);

    this.convert_points_to_board_values(selected_num);
    this.ctx.restore();
  }

  reset() {
    this.ctx.clearRect(0, 0, 100, 100);
  }

  draw_line(points, isOff) {
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
  }

  convert_points_to_board_values(points) {
    var __ = this;
    this.x_points = axis_x_points.map(function (val, index) {
      return index;
    });
    this.y_points = axis_y_points.map(function (val, index) {
      return index;
    });

    this.x_on = points.x;
    this.x_off = utils.diff(this.x_points, this.x_on);

    this.y_on = points.y;
    this.y_off = utils.diff(this.y_points, this.y_on);

    // draw off lines
    this.x_off.forEach(function (selected_index) {
      __.draw_line(axis_x_points[selected_index], true);
    });

    this.y_off.forEach(function (selected_index) {
      __.draw_line(axis_y_points[selected_index], true);
    });

    // draw on lines
    this.x_on.forEach(function (selected_index) {
      __.draw_line(axis_x_points[selected_index]);
    });

    this.y_on.forEach(function (selected_index) {
      __.draw_line(axis_y_points[selected_index]);
    });
  }

  positioning_values_on_board(points) {
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
  }
}

const led1_1 = new Numeral_LED_Matrix(0, { canvas: canvasLED1_1 });
const led1_2 = new Numeral_LED_Matrix(0, { canvas: canvasLED1_2 });
const led2_1 = new Numeral_LED_Matrix(0, { canvas: canvasLED2_1 });
const led2_2 = new Numeral_LED_Matrix(0, { canvas: canvasLED2_2 });

const changeNumeralLED = (stair) => {
  let leftNum;
  let rightNum;
  switch (stair) {
    case "L":
      leftNum = 0;
      rightNum = 3;
      break;
    case "-1":
      leftNum = 4;
      rightNum = 1;
      break;
    case "-2":
      leftNum = 4;
      rightNum = 2;
      break;
  }

  led1_1.init(leftNum, { canvas: canvasLED1_1 });
  led1_2.init(rightNum, { canvas: canvasLED1_2 });
  led2_1.init(leftNum, { canvas: canvasLED2_1 });
  led2_2.init(rightNum, { canvas: canvasLED2_2 });
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
      seletedSection = "section2";
      break;
    case "-1":
      seletedSection = "section3";
      break;
    case "-2":
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

  leftDoorImg.src = "/images/panel.jpeg";
  rightDoorImg.src = "/images/panel.jpeg";

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
