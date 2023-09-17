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

export default class Numeral_LED_Matrix {
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
