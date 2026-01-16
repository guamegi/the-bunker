import Numeral_LED_Matrix from "../lib/Numeral_LED_Matrix.js";
import Project from "../lib/Project.js";
import SkillBars from "../lib/SkillBars.js";
import { projects } from "../data/projects.js";
import { skills } from "../data/skills.js";

const canvasDoors = document.querySelector("#canvasDoors");
const canvasLED1_1 = document.querySelector("#canvasLED1_1");
const canvasLED1_2 = document.querySelector("#canvasLED1_2");
const canvasLED2_1 = document.querySelector("#canvasLED2_1");
const canvasLED2_2 = document.querySelector("#canvasLED2_2");
// doors top LED canvases
const canvasDoorsLED_1 = document.querySelector("#canvasDoorsLED_1");
const canvasDoorsLED_2 = document.querySelector("#canvasDoorsLED_2");

const ctxDoors = canvasDoors.getContext("2d");

const wrapper = document.querySelector("#wrapper");
const elevatorBtn = document.querySelector("#elevatorBtn");

const DOOR_WIDTH = 150;
let DOOR_HEIGHT = wrapper.clientHeight;

// Unified state object
const state = {
  selectedSection: "section1",
  currentStair: "L",
  door: {
    leftX: 0,
    rightX: 151,
  },
};

let leftDoorImg;
let rightDoorImg;

const led1_1 = new Numeral_LED_Matrix(0, { canvas: canvasLED1_1 });
const led1_2 = new Numeral_LED_Matrix(0, { canvas: canvasLED1_2 });
const led2_1 = new Numeral_LED_Matrix(0, { canvas: canvasLED2_1 });
const led2_2 = new Numeral_LED_Matrix(0, { canvas: canvasLED2_2 });
// door top LEDs (mirror of panel LED)
const ledDoors_1 = canvasDoorsLED_1
  ? new Numeral_LED_Matrix(0, { canvas: canvasDoorsLED_1 })
  : null;
const ledDoors_2 = canvasDoorsLED_2
  ? new Numeral_LED_Matrix(0, { canvas: canvasDoorsLED_2 })
  : null;

skills.forEach((obj, idx, all) => {
  new SkillBars(obj).createEl(idx, all);
});
projects.forEach((obj) => {
  new Project(obj).createEl();
});

const init = () => {
  makeDoors();
  changeNumeralLED("L");
  moveToSection();
  // 첫 화면 진입 시 층수 버튼 반짝임 효과
  startButtonBlinking();
};

const modal = document.querySelector(".modalWrapper");
const swiperWrapper = document.querySelector(".swiper-wrapper");

// 모달 바깥(오버레이) 클릭 시 모달 닫기
// 모달 내부(.mySwiper)를 클릭한 경우는 닫기 동작을 무시합니다.
if (modal) {
  modal.addEventListener("click", (e) => {
    if (!e.target.closest(".mySwiper")) {
      closeModal();
    }
  });
}

const showModal = (images) => {
  // console.log("show modal");
  modal.classList.remove("hidden");
  // swiper-wrapper children 제거
  swiperWrapper.innerHTML = "";

  // 경로 추출
  const imagesArr = images.split(",");

  let el = "";
  // wiper-wrapper에 image slice 삽입
  imagesArr.forEach((image) => {
    el += `<div class="swiper-slide">
            <img src='${image}' />
          </div>`;
  });
  swiperWrapper.insertAdjacentHTML("beforeend", el);
};

const closeModal = () => {
  // console.log("close", swiper);
  modal.classList.add("hidden");
  swiper.activeIndex = 0;
};

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
  // door top LEDs (same as panel)
  if (ledDoors_1 && ledDoors_2) {
    ledDoors_1.init(leftNum, { canvas: canvasDoorsLED_1 });
    ledDoors_2.init(rightNum, { canvas: canvasDoorsLED_2 });
  }
};

// 층수 버튼 반짝임 효과 시작
const startButtonBlinking = () => {
  const controlButtons = document.querySelectorAll(".controlBtn");
  const elevatorEnterBtn = document.querySelector("#elevatorEnterBtn");

  controlButtons.forEach((btn) => {
    btn.classList.add("blinking");
  });

  // 탑승 버튼에도 깜빡임 효과 추가
  if (elevatorEnterBtn) {
    elevatorEnterBtn.classList.add("blinking");
  }
};

// 층수를 숫자로 변환 (비교용)
const stairToNumber = (stair) => {
  switch (stair) {
    case "L":
      return 0;
    case "-1":
      return 1;
    case "-2":
      return 2;
    default:
      return 0;
  }
};

// 숫자를 층수로 변환
const numberToStair = (num) => {
  switch (num) {
    case 0:
      return "L";
    case 1:
      return "-1";
    case 2:
      return "-2";
    default:
      return "L";
  }
};

// 방향 표시등 상태 관리
const updateDirectionIndicators = (direction) => {
  const directionUp = document.querySelector("#directionUp");
  const directionDown = document.querySelector("#directionDown");

  // 모두 기본 색상으로 설정
  directionUp.style.color = "#9ca3af";
  directionDown.style.color = "#9ca3af";

  if (direction === "up") {
    // 위쪽 화살표 빨강으로 변경
    directionUp.style.color = "#eac300";
  } else if (direction === "down") {
    // 아래쪽 화살표 빨강으로 변경
    directionDown.style.color = "#eac300";
  }
};

// 방향 표시등 끄기
const turnOffDirectionIndicators = () => {
  updateDirectionIndicators(null);
};

const clickPanel = (stair) => {
  // 반짝임 효과 제거
  const controlButtons = document.querySelectorAll(".controlBtn");
  const elevatorEnterBtn = document.querySelector("#elevatorEnterBtn");
  controlButtons.forEach((btn) => btn.classList.remove("blinking"));
  if (elevatorEnterBtn) {
    elevatorEnterBtn.classList.remove("blinking");
  }

  switch (stair) {
    case "L":
      state.selectedSection = "section2";
      break;
    case "-1":
      state.selectedSection = "section3";
      break;
    case "-2":
      state.selectedSection = "section4";
      break;
  }

  const currentFloor = stairToNumber(state.currentStair);
  const targetFloor = stairToNumber(stair);
  const floorDiff = Math.abs(targetFloor - currentFloor);

  // 현재 층수와 목적지 층수가 동일하면 바로 문 열기
  if (state.currentStair === stair) {
    turnOffDirectionIndicators();
    openDoors();
    return;
  }

  // 이동 방향 결정 및 표시등 제어
  if (targetFloor > currentFloor) {
    // 아래층으로 이동
    updateDirectionIndicators("down");
  } else {
    // 위층으로 이동
    updateDirectionIndicators("up");
  }

  // 한 층 이상 차이가 나면 한 층씩 이동
  if (floorDiff > 1) {
    moveFloorsStepByStep(state.currentStair, stair);
  } else {
    // 한 층 차이면 기존처럼 동작
    setTimeout(() => {
      changeNumeralLED(stair);
      state.currentStair = stair; // 현재 층수 업데이트
      turnOffDirectionIndicators();
      openDoors();
    }, 2000);
  }
};

// 한 층씩 이동하는 함수
const moveFloorsStepByStep = (fromStair, toStair) => {
  const fromFloor = stairToNumber(fromStair);
  const toFloor = stairToNumber(toStair);
  const direction = toFloor > fromFloor ? 1 : -1; // 1: 아래로, -1: 위로

  let currentFloor = fromFloor;
  let stepCount = 0;
  const totalSteps = Math.abs(toFloor - fromFloor);

  const moveToNextFloor = () => {
    stepCount++;
    currentFloor += direction;
    const nextStair = numberToStair(currentFloor);

    // LED 변경
    changeNumeralLED(nextStair);
    state.currentStair = nextStair;

    // 마지막 층이면 바로 문 열기 (깜빡임 없음)
    if (stepCount >= totalSteps) {
      turnOffDirectionIndicators();
      openDoors();
    } else {
      // 중간 층에서 2초 대기 후 다음 층으로 이동 (깜빡임 없음)
      setTimeout(moveToNextFloor, 2000);
    }
  };

  // 첫 번째 층으로 이동 (현재 층에서 2초 깜빡임 후)
  setTimeout(moveToNextFloor, 2000);
};

// 특정 층수에서 2초간 깜빡임 효과를 보여주는 함수
const showFloorBlinkingForStair = (stair, callback) => {
  let count = 0;
  const maxCount = 4; // 2초 = 2000ms, 0.5초(500ms) 간격 = 4번
  const interval = 500; // 0.5초마다 깜빡임
  let isVisible = true;

  const blinkLED = setInterval(() => {
    if (isVisible) {
      // 해당 층수 표시
      changeNumeralLED(stair);
    } else {
      // LED 숨김 (빈 숫자로 표시)
      led1_1.init(0, { canvas: canvasLED1_1 }); // empty
      led1_2.init(0, { canvas: canvasLED1_2 }); // empty
      led2_1.init(0, { canvas: canvasLED2_1 });
      led2_2.init(0, { canvas: canvasLED2_2 });
      // door top LEDs also clear
      if (ledDoors_1 && ledDoors_2) {
        ledDoors_1.init(0, { canvas: canvasDoorsLED_1 });
        ledDoors_2.init(0, { canvas: canvasDoorsLED_2 });
      }
    }

    isVisible = !isVisible;
    count++;

    if (count >= maxCount) {
      clearInterval(blinkLED);
      // 마지막에 다시 해당 층수 표시
      changeNumeralLED(stair);
      // 콜백 실행 (문 열기 또는 다음 층으로 이동)
      if (callback) {
        callback();
      }
    }
  }, interval);
};

const makeDoors = () => {
  // console.log("make doors");
  // Set canvas height to its parent container's height so it stays inside the relative box
  const canvasContainer = canvasDoors.parentElement;
  canvasDoors.height = canvasContainer.clientHeight;

  leftDoorImg = new Image();
  rightDoorImg = new Image();

  // github 주소 pathname 문제로 분기 추가
  const href = window.location.href;
  const panelImagePath = "/src/images/panel.jpeg";
  if (href.charAt(href.length - 1) === "/") {
    leftDoorImg.src = window.location.href + panelImagePath;
    rightDoorImg.src = window.location.href + panelImagePath;
  } else {
    leftDoorImg.src = window.location.origin + panelImagePath;
    rightDoorImg.src = window.location.origin + panelImagePath;
  }

  ctxDoors.clearRect(0, 0, canvasDoors.width, canvasDoors.height);

  leftDoorImg.onload = () => {
    ctxDoors.drawImage(leftDoorImg, 0, 0, DOOR_WIDTH, DOOR_HEIGHT);
  };
  rightDoorImg.onload = () => {
    ctxDoors.drawImage(rightDoorImg, 151, 0, DOOR_WIDTH, DOOR_HEIGHT);
  };
};

let startTime;
// open animation
const openDoors = () => {
  // console.log("open doors");
  if (state.door.leftX !== 0) return;

  startTime = new Date().getTime();
  setTimeout(() => {
    requestAnimationFrame(moveDoors);
  }, 100);
};

const closeDoors = () => {
  // console.log("close doors");
  ctxDoors.drawImage(leftDoorImg, 0, 0, DOOR_WIDTH, DOOR_HEIGHT);
  ctxDoors.drawImage(rightDoorImg, 151, 0, DOOR_WIDTH, DOOR_HEIGHT);

  state.door.leftX = 0;
  state.door.rightX = 151;
};

// animate
const DURATION = 400;
const moveDoors = () => {
  // console.log("move doors", state.door.rightX);
  if (state.door.rightX > DOOR_WIDTH * 2) {
    moveToSection();
    closeDoors();
    // 해당 층수 화면으로 이동 후 깜빡임 효과 재시작
    setTimeout(() => {
      startButtonBlinking();
    }, 100);
    return;
  }

  // easeOut 효과
  let time = new Date().getTime() - startTime;
  state.door.leftX -= DURATION / time;
  state.door.rightX += DURATION / time;

  ctxDoors.clearRect(0, 0, canvasDoors.width, canvasDoors.height);
  ctxDoors.drawImage(leftDoorImg, state.door.leftX, 0, DOOR_WIDTH, DOOR_HEIGHT);
  ctxDoors.drawImage(
    rightDoorImg,
    state.door.rightX,
    0,
    DOOR_WIDTH,
    DOOR_HEIGHT
  );

  state.door.leftX--;
  state.door.rightX++;

  requestAnimationFrame(moveDoors);
};

const moveToSection = () => {
  const node = document.querySelector(`#${state.selectedSection}`);

  window.scrollTo({
    top: node.offsetTop,
    behavior: "instant", // ex: smooth
  });
};

const moveToTop = () => {
  // 모든 버튼 깜빡임 효과 제거
  const controlButtons = document.querySelectorAll(".controlBtn");
  const elevatorEnterBtn = document.querySelector("#elevatorEnterBtn");
  controlButtons.forEach((btn) => btn.classList.remove("blinking"));
  if (elevatorEnterBtn) {
    elevatorEnterBtn.classList.remove("blinking");
  }

  elevatorBtn.children[1].style.color = "#ff0000";

  // 현재 보이는 섹션 찾기
  const sections = document.querySelectorAll('[id^="section"]');
  let currentVisibleSection = null;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (
      rect.top >= 0 &&
      rect.top < window.innerHeight &&
      section.id !== "section1"
    ) {
      currentVisibleSection = section;
    }
  });

  // 패널 닫기 애니메이션 적용
  if (currentVisibleSection) {
    currentVisibleSection.style.overflow = "hidden";

    // section2: flex-wrap 구조의 패널들 (좌우로 분리된 패널)
    const flexWrapContainer =
      currentVisibleSection.querySelector(".flex.flex-wrap");
    if (flexWrapContainer) {
      const panels = Array.from(flexWrapContainer.children);
      panels.forEach((panel, index) => {
        panel.style.transition =
          "transform 0.6s ease-in-out, opacity 0.6s ease-in-out";
        if (index < Math.ceil(panels.length / 2)) {
          // 좌측 패널들
          panel.style.transform = "translateX(-100%)";
          panel.style.opacity = "0";
        } else {
          // 우측 패널들
          panel.style.transform = "translateX(100%)";
          panel.style.opacity = "0";
        }
      });
    } else {
      // section3, section4: 컨텐츠를 화면 중앙 기준으로 좌우 분리
      const mainContent = currentVisibleSection.querySelector(
        ".max-w-5xl, .max-w-\\[1000px\\]"
      );
      if (mainContent) {
        const viewportCenterX = window.innerWidth / 2;

        // 직접 자식 요소들에 대해 애니메이션 적용
        const directChildren = Array.from(mainContent.children);
        directChildren.forEach((child) => {
          const rect = child.getBoundingClientRect();
          const childCenterX = rect.left + rect.width / 2;

          child.style.transition =
            "transform 0.6s ease-in-out, opacity 0.6s ease-in-out";

          if (childCenterX < viewportCenterX) {
            // 좌측
            child.style.transform = "translateX(-100%)";
            child.style.opacity = "0";
          } else {
            // 우측
            child.style.transform = "translateX(100%)";
            child.style.opacity = "0";
          }
        });
      }
    }
  }

  state.selectedSection = "section1";

  setTimeout(() => {
    moveToSection();
    // 엘리베이터 내부 LED와 우측 위젯 LED 모두 최종 변경된 층수 유지
    changeNumeralLED(state.currentStair);
    elevatorBtn.children[1].style.color = "black";

    // 패널 애니메이션 초기화
    setTimeout(() => {
      sections.forEach((section) => {
        if (section.id !== "section1") {
          section.style.overflow = "";
          // 모든 인라인 스타일 제거
          const allElements = section.querySelectorAll("*");
          allElements.forEach((el) => {
            if (el.style.transform || el.style.opacity) {
              el.style.transition = "";
              el.style.transform = "";
              el.style.opacity = "";
            }
          });
        }
      });

      // 층수 버튼 및 탑승 버튼 반짝임 효과 다시 시작
      startButtonBlinking();
    }, 600);
  }, 500);
};

// 모바일 감지 및 PC 최적화 안내 배너 표시
const isMobileDevice = () => {
  return /Mobi|Android|iPhone|iPad|Tablet/i.test(navigator.userAgent);
};

const showMobileNotice = () => {
  try {
    if (!isMobileDevice()) return;
  } catch (e) {
    // localStorage may be disabled — still proceed to show
  }
  if (document.getElementById("mobile-notice")) return;

  const wrapper = document.createElement("div");
  wrapper.id = "mobile-notice";
  wrapper.innerHTML = `<div class="mobile-notice-inner"><span>PC 브라우저에 최적화되어 있습니다</span>더 나은 경험을 위해 PC에서 방문해주세요!</div>`;
  document.body.appendChild(wrapper);
  // prevent body scroll / layout shift while overlay is visible
  try {
    document.documentElement.classList.add("has-mobile-overlay");
    document.body.classList.add("has-mobile-overlay");
  } catch (e) {}
};

window.addEventListener("resize", function () {
  // console.log("resize!", wrapper.clientHeight);
  DOOR_HEIGHT = wrapper.clientHeight;
  makeDoors();
});

window.onload = function () {
  init();

  if (isMobileDevice()) {
    showMobileNotice();
  } else {
    introJs()
      .setOptions({
        steps: [
          {
            // title: "Welcome",
            element: "#doorsLED",
            intro:
              '<img src="https://i.giphy.com/media/ujUdrdpX7Ok5W/giphy.webp" onerror="this.onerror=null;this.src="https://i.giphy.com/ujUdrdpX7Ok5W.gif" alt=""> <br/>환영합니다! <br/> 이 웹사이트는 엘리베이터를 테마로 한 포트폴리오 사이트입니다. <br/>',
          },
          {
            element: "#onboard1",
            intro:
              "엘리베이터 내부의 층수 버튼을 클릭하여 다양한 섹션을 탐색해보세요!",
            position: "left", // 위치 설정 (top, bottom, left, right)
          },
          {
            element: "#onboard2",
            intro:
              "엘리베이터 내부의 LED는 현재 층수를 나타냅니다. <br/> 즐거운 시간 되세요! ",
            position: "left",
          },
        ],
        nextLabel: "다음",
        prevLabel: "이전",
        doneLabel: "완료",
        dontShowAgain: true,
        tooltipClass: "customTooltip",
        // showProgress: true,
        // showBullets: false,
      })
      .start();
  }
};

// module 방식이라 global로 보내야 함
window.moveToTop = moveToTop;
window.showModal = showModal;
window.closeModal = closeModal;
window.clickPanel = clickPanel;
