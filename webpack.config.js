const path = require("path");

// env(환경변수), argv(인자값)를 파라미터로 받는 함수형태로 변경
module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: argv.mode, // 명령어가 넘겨준 'production' 또는 'development' 적용
    entry: "./src/js/main.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    // 배포 모드일 때만 보안용 소스맵 적용, 개발 때는 빠른 디버깅용 적용
    devtool: isProduction ? "hidden-source-map" : "eval-source-map",
  };
};
