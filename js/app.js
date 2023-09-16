const canvasDoors = document.querySelector("#canvasDoors");
const canvasLCD = document.querySelector("#canvasLCD");
const ctxDoors = canvasDoors.getContext("2d");
const ctxLCD = canvasLCD.getContext("2d");
const wrapper = document.querySelector("#wrapper");

const DOOR_WIDTH = 150;
let DOOR_HEIGHT = wrapper.clientHeight;
const DOOR_OPEN_SPEED = 3000;

let leftDoorImg;
let rightDoorImg;

let leftDoorX = 0;
let rightDoorX = 151;

const init = () => {
  makeDoors();
  makeLCD();
};

const clickPanel = (stair) => {
  switch (stair) {
    case "L":
      deleyScrollTo("section1");
      break;
    case "B1":
      deleyScrollTo("section2");
      break;
    case "B2":
      deleyScrollTo("section3");
      break;
    case "B3":
      deleyScrollTo("section4");
      break;
    default:
      deleyScrollTo("section1");
  }
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
  console.log("move doors");
  if (leftDoorX < -150) {
    return;
  }

  ctxDoors.clearRect(0, 0, canvasDoors.width, canvasDoors.height);
  ctxDoors.drawImage(leftDoorImg, leftDoorX, 0, DOOR_WIDTH, DOOR_HEIGHT);
  ctxDoors.drawImage(rightDoorImg, rightDoorX, 0, DOOR_WIDTH, DOOR_HEIGHT);

  leftDoorX--;
  rightDoorX++;

  requestAnimationFrame(moveDoors);
};

/* utils */
const deleyScrollTo = (containerByID) => {
  openDoors();

  setTimeout(() => {
    const node = document.querySelector(`#${containerByID}`);

    window.scrollTo({
      top: node.offsetTop,
      behavior: "instant", // ex: smooth
    });

    closeDoors();
  }, DOOR_OPEN_SPEED);
};

window.addEventListener("resize", function () {
  console.log("resize!", wrapper.clientHeight);
  DOOR_HEIGHT = wrapper.clientHeight;
  makeDoors();
});

init();
