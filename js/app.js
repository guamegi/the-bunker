const canvasDoors = document.querySelector("#canvasDoors");
const canvasLCD = document.querySelector("#canvasLCD");
const ctxDoors = canvasDoors.getContext("2d");
const ctxLCD = canvasLCD.getContext("2d");
const wrapper = document.querySelector("#wrapper");
const elevatorBtn = document.querySelector("#elevatorBtn");

const DOOR_WIDTH = 150;
let DOOR_HEIGHT = wrapper.clientHeight;

let seletedSection = "section1";
let leftDoorImg;
let rightDoorImg;

let leftDoorX = 0;
let rightDoorX = 151;

const init = () => {
  makeDoors();
  makeLCD();
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

const makeLCD = () => {
  console.log("make LCD");
};

// open animation
const openDoors = () => {
  console.log("open doors");
  if (leftDoorX !== 0) return;
  requestAnimationFrame(moveDoors);
};

const closeDoors = () => {
  console.log("close doors");
  ctxDoors.drawImage(leftDoorImg, 0, 0, DOOR_WIDTH, DOOR_HEIGHT);
  ctxDoors.drawImage(rightDoorImg, 151, 0, DOOR_WIDTH, DOOR_HEIGHT);

  leftDoorX = 0;
  rightDoorX = 151;
};

const moveDoors = () => {
  console.log("move doors", rightDoorX);
  if (rightDoorX > DOOR_WIDTH * 2) {
    moveToSection();
    closeDoors();
    return;
  }

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

  toggleElevatorBtn();
};

const toggleElevatorBtn = () => {
  if (seletedSection === "section1") elevatorBtn.classList.add("hidden");
  else elevatorBtn.classList.remove("hidden");
};

window.addEventListener("resize", function () {
  console.log("resize!", wrapper.clientHeight);
  DOOR_HEIGHT = wrapper.clientHeight;
  makeDoors();
});

init();
