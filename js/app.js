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
      // deleyScrollTo("section1");
      openDoors();
  }
};

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const init = () => {
  drawDoors();
  drawLCD();
};

const drawDoors = () => {
  console.log("draw doors");
};

const drawLCD = () => {
  console.log("draw LCD");
};

const openDoors = () => {
  console.log("open doors");
  // open animation
};

/* utils */
const deleyScrollTo = (containerByID) => {
  setTimeout(() => {
    const node = document.querySelector(`#${containerByID}`);

    window.scrollTo({
      top: node.offsetTop,
      behavior: "instant", // ex: smooth
    });
  }, 1000);
};

init();
