import Numeral_LED_Matrix from "../lib/Numeral_LED_Matrix.js";
import Project from "../lib/Project.js";
import { projects } from "../data/projects.js";

const canvasDoors = document.querySelector("#canvasDoors");
const canvasLED1_1 = document.querySelector("#canvasLED1_1");
const canvasLED1_2 = document.querySelector("#canvasLED1_2");
const canvasLED2_1 = document.querySelector("#canvasLED2_1");
const canvasLED2_2 = document.querySelector("#canvasLED2_2");

const ctxDoors = canvasDoors.getContext("2d");

const wrapper = document.querySelector("#wrapper");
const elevatorBtn = document.querySelector("#elevatorBtn");

const DOOR_WIDTH = 150;
let DOOR_HEIGHT = wrapper.clientHeight;

let seletedSection = "section1";
let leftDoorImg;
let rightDoorImg;

let leftDoorX = 0;
let rightDoorX = 151;

const led1_1 = new Numeral_LED_Matrix(0, { canvas: canvasLED1_1 });
const led1_2 = new Numeral_LED_Matrix(0, { canvas: canvasLED1_2 });
const led2_1 = new Numeral_LED_Matrix(0, { canvas: canvasLED2_1 });
const led2_2 = new Numeral_LED_Matrix(0, { canvas: canvasLED2_2 });

projects.forEach((obj) => {
  new Project(obj).createEl();
});

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

  leftDoorImg.src = window.location.href + "src/images/panel.jpeg";
  rightDoorImg.src = window.location.href + "src/images/panel.jpeg";

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
  }, 500);
};

window.addEventListener("resize", function () {
  console.log("resize!", wrapper.clientHeight);
  DOOR_HEIGHT = wrapper.clientHeight;
  makeDoors();
});

init();

// module 방식이라 global로 보내야 함
window.moveToTop = moveToTop;
window.clickPanel = (stair) => {
  clickPanel(stair);
};
