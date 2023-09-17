/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Numeral_LED_Matrix.js":
/*!**************************************!*\
  !*** ./src/js/Numeral_LED_Matrix.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Numeral_LED_Matrix)\n/* harmony export */ });\nconst board = {\n  width: 16,\n  height: 32,\n};\n\nconst axis_x_points = [\n  { from: [0, 0], to: [1, 0] },\n  { from: [0, 1], to: [1, 1] },\n  { from: [0, 2], to: [1, 2] },\n];\nconst axis_y_points = [\n  { from: [0, 0], to: [0, 1] }, // left\n  { from: [0, 1], to: [0, 2] }, // left\n  { from: [1, 0], to: [1, 1] }, // right\n  { from: [1, 1], to: [1, 2] }, // right\n];\n\nconst empty = {\n  x: [],\n  y: [],\n};\nconst one = {\n  x: [],\n  y: [2, 3],\n};\nconst two = {\n  x: [0, 1, 2],\n  y: [1, 2],\n};\nconst alphabetL = {\n  x: [2],\n  y: [0, 1],\n};\nconst hyphen = {\n  x: [1],\n  y: [],\n};\n\nconst supported_numbers = [empty, one, two, alphabetL, hyphen];\n\nconst utils = {\n  is_vertical(points) {\n    if (points.from[1] != points.to[1]) return true;\n    return false;\n  },\n  diff(first, second) {\n    return first.filter(function (value) {\n      return !second.find(function (current_item) {\n        return current_item === value;\n      });\n    });\n  },\n};\n\nclass Numeral_LED_Matrix {\n  constructor(number, options) {\n    this.init(number, options);\n  }\n\n  init(number, options) {\n    this.ctx = options.canvas.getContext(\"2d\");\n    this.reset();\n\n    const selected_num = supported_numbers[number];\n    this.ctx.save();\n    this.ctx.translate(4, 4);\n\n    this.convert_points_to_board_values(selected_num);\n    this.ctx.restore();\n  }\n\n  reset() {\n    this.ctx.clearRect(0, 0, 100, 100);\n  }\n\n  draw_line(points, isOff) {\n    let values = this.positioning_values_on_board(points);\n\n    this.ctx.save();\n    this.ctx.beginPath();\n    this.ctx.lineCap = \"round\";\n    this.ctx.lineWidth = 4;\n    this.ctx.strokeStyle = \"red\";\n    if (isOff) this.ctx.globalAlpha = 0.2;\n    this.ctx.moveTo(values.from.x, values.from.y);\n    this.ctx.lineTo(values.to.x, values.to.y);\n    this.ctx.stroke();\n    this.ctx.closePath();\n    this.ctx.restore();\n  }\n\n  convert_points_to_board_values(points) {\n    var __ = this;\n    this.x_points = axis_x_points.map(function (val, index) {\n      return index;\n    });\n    this.y_points = axis_y_points.map(function (val, index) {\n      return index;\n    });\n\n    this.x_on = points.x;\n    this.x_off = utils.diff(this.x_points, this.x_on);\n\n    this.y_on = points.y;\n    this.y_off = utils.diff(this.y_points, this.y_on);\n\n    // draw off lines\n    this.x_off.forEach(function (selected_index) {\n      __.draw_line(axis_x_points[selected_index], true);\n    });\n\n    this.y_off.forEach(function (selected_index) {\n      __.draw_line(axis_y_points[selected_index], true);\n    });\n\n    // draw on lines\n    this.x_on.forEach(function (selected_index) {\n      __.draw_line(axis_x_points[selected_index]);\n    });\n\n    this.y_on.forEach(function (selected_index) {\n      __.draw_line(axis_y_points[selected_index]);\n    });\n  }\n\n  positioning_values_on_board(points) {\n    const base = board.width / 4;\n\n    const from = {};\n    const to = {};\n\n    if (utils.is_vertical(points)) {\n      // from\n      from.x = points.from[0] * board.width;\n      from.y = points.from[1] * (board.height / 2) + base;\n\n      // to\n      to.x = points.to[0] * board.width;\n      to.y = points.to[1] * (board.height / 2) - base;\n    } else {\n      // from\n      from.x = points.from[0] * board.width + base;\n      from.y = points.from[1] * (board.height / 2);\n\n      // to\n      to.x = points.to[0] * board.width - base;\n      to.y = points.to[1] * (board.height / 2);\n    }\n\n    return {\n      from: from,\n      to: to,\n    };\n  }\n}\n\n\n//# sourceURL=webpack://the-bunker/./src/js/Numeral_LED_Matrix.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Numeral_LED_Matrix_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Numeral_LED_Matrix.js */ \"./src/js/Numeral_LED_Matrix.js\");\n\n\nconst canvasDoors = document.querySelector(\"#canvasDoors\");\nconst canvasLED1_1 = document.querySelector(\"#canvasLED1_1\");\nconst canvasLED1_2 = document.querySelector(\"#canvasLED1_2\");\nconst canvasLED2_1 = document.querySelector(\"#canvasLED2_1\");\nconst canvasLED2_2 = document.querySelector(\"#canvasLED2_2\");\n\nconst ctxDoors = canvasDoors.getContext(\"2d\");\n\nconst wrapper = document.querySelector(\"#wrapper\");\nconst elevatorBtn = document.querySelector(\"#elevatorBtn\");\n\nconst DOOR_WIDTH = 150;\nlet DOOR_HEIGHT = wrapper.clientHeight;\n\nlet seletedSection = \"section1\";\nlet leftDoorImg;\nlet rightDoorImg;\n\nlet leftDoorX = 0;\nlet rightDoorX = 151;\n\nconst led1_1 = new _Numeral_LED_Matrix_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, { canvas: canvasLED1_1 });\nconst led1_2 = new _Numeral_LED_Matrix_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, { canvas: canvasLED1_2 });\nconst led2_1 = new _Numeral_LED_Matrix_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, { canvas: canvasLED2_1 });\nconst led2_2 = new _Numeral_LED_Matrix_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, { canvas: canvasLED2_2 });\n\nconst changeNumeralLED = (stair) => {\n  let leftNum;\n  let rightNum;\n  switch (stair) {\n    case \"L\":\n      leftNum = 0;\n      rightNum = 3;\n      break;\n    case \"-1\":\n      leftNum = 4;\n      rightNum = 1;\n      break;\n    case \"-2\":\n      leftNum = 4;\n      rightNum = 2;\n      break;\n  }\n\n  led1_1.init(leftNum, { canvas: canvasLED1_1 });\n  led1_2.init(rightNum, { canvas: canvasLED1_2 });\n  led2_1.init(leftNum, { canvas: canvasLED2_1 });\n  led2_2.init(rightNum, { canvas: canvasLED2_2 });\n};\n//\n\nconst init = () => {\n  makeDoors();\n  makeLED();\n  changeNumeralLED(\"L\");\n  moveToSection();\n};\n\nconst clickPanel = (stair) => {\n  switch (stair) {\n    case \"L\":\n      seletedSection = \"section2\";\n      break;\n    case \"-1\":\n      seletedSection = \"section3\";\n      break;\n    case \"-2\":\n      seletedSection = \"section4\";\n      break;\n  }\n\n  changeNumeralLED(stair);\n  openDoors();\n};\n\nconst makeDoors = () => {\n  console.log(\"make doors\");\n  canvasDoors.height = wrapper.clientHeight;\n\n  leftDoorImg = new Image();\n  rightDoorImg = new Image();\n\n  leftDoorImg.src = window.location.href + \"src/images/panel.jpeg\";\n  rightDoorImg.src = window.location.href + \"src/images/panel.jpeg\";\n\n  ctxDoors.clearRect(0, 0, canvasDoors.width, canvasDoors.height);\n\n  leftDoorImg.onload = () => {\n    ctxDoors.drawImage(leftDoorImg, 0, 0, DOOR_WIDTH, DOOR_HEIGHT);\n  };\n  rightDoorImg.onload = () => {\n    ctxDoors.drawImage(rightDoorImg, 151, 0, DOOR_WIDTH, DOOR_HEIGHT);\n  };\n};\n\nconst makeLED = () => {\n  console.log(\"make LED\");\n};\n\nlet startTime;\n// open animation\nconst openDoors = () => {\n  console.log(\"open doors\");\n  if (leftDoorX !== 0) return;\n\n  startTime = new Date().getTime();\n  setTimeout(() => {\n    requestAnimationFrame(moveDoors);\n  }, 100);\n};\n\nconst closeDoors = () => {\n  console.log(\"close doors\");\n  ctxDoors.drawImage(leftDoorImg, 0, 0, DOOR_WIDTH, DOOR_HEIGHT);\n  ctxDoors.drawImage(rightDoorImg, 151, 0, DOOR_WIDTH, DOOR_HEIGHT);\n\n  leftDoorX = 0;\n  rightDoorX = 151;\n};\n\n// animate\nconst DURATION = 100;\nconst moveDoors = () => {\n  // console.log(\"move doors\", rightDoorX);\n  if (rightDoorX > DOOR_WIDTH * 2) {\n    moveToSection();\n    closeDoors();\n    return;\n  }\n\n  // easeOut 효과\n  let time = new Date().getTime() - startTime;\n  leftDoorX -= DURATION / time;\n  rightDoorX += DURATION / time;\n\n  ctxDoors.clearRect(0, 0, canvasDoors.width, canvasDoors.height);\n  ctxDoors.drawImage(leftDoorImg, leftDoorX, 0, DOOR_WIDTH, DOOR_HEIGHT);\n  ctxDoors.drawImage(rightDoorImg, rightDoorX, 0, DOOR_WIDTH, DOOR_HEIGHT);\n\n  leftDoorX--;\n  rightDoorX++;\n\n  requestAnimationFrame(moveDoors);\n};\n\nconst moveToSection = () => {\n  const node = document.querySelector(`#${seletedSection}`);\n\n  window.scrollTo({\n    top: node.offsetTop,\n    behavior: \"instant\", // ex: smooth\n  });\n};\n\nconst moveToTop = () => {\n  seletedSection = \"section1\";\n  elevatorBtn.children[1].style.color = \"#ff0000\";\n\n  setTimeout(() => {\n    moveToSection();\n    elevatorBtn.children[1].style.color = \"black\";\n  }, 500);\n};\n\nwindow.addEventListener(\"resize\", function () {\n  console.log(\"resize!\", wrapper.clientHeight);\n  DOOR_HEIGHT = wrapper.clientHeight;\n  makeDoors();\n});\n\ninit();\n\n// module 방식이라 global로 보내야 함\nwindow.moveToTop = moveToTop;\nwindow.clickPanel = (stair) => {\n  clickPanel(stair);\n};\n\n\n//# sourceURL=webpack://the-bunker/./src/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/main.js");
/******/ 	
/******/ })()
;