const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// env(환경변수), argv(인자값)를 파라미터로 받는 함수형태로 변경
module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: argv.mode, // 명령어가 넘겨준 'production' 또는 'development' 적용
    entry: "./src/js/main.js",
    output: {
      filename: isProduction ? "js/[name].[contenthash:8].js" : "js/[name].js",
      chunkFilename: isProduction
        ? "js/[name].[contenthash:8].chunk.js"
        : "js/[name].chunk.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    // 배포 모드일 때만 보안용 소스맵 적용, 개발 때는 빠른 디버깅용 적용
    devtool: isProduction ? "hidden-source-map" : "eval-source-map",

    // ============ 번들 사이즈 최적화 설정 ============
    optimization: {
      minimize: isProduction,
      minimizer: [
        // JavaScript 최소화
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: isProduction, // production에서 console 제거
              drop_debugger: isProduction,
            },
            mangle: true,
            output: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        // CSS 최소화 (CSS 파일이 있을 경우)
        new CssMinimizerPlugin(),
      ],

      // 핵심: 코드 분할 설정
      splitChunks: {
        chunks: "all", // async, initial, all 중 선택. all이 가장 효과적
        minSize: 20000, // 20KB 이상일 때만 분할
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          // 1. node_modules의 라이브러리를 별도 번들로 분리
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },

          // 2. React 관련 라이브러리 분리 (React 사용 시)
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "react-vendors",
            priority: 20,
            reuseExistingChunk: true,
            enforce: true,
          },

          // 3. 중복되는 공통 코드 추출
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
            name: "common",
          },

          // 4. 스타일 관련 라이브러리 분리 (필요시)
          styles: {
            type: "css/mini-extract",
            name: "styles",
            priority: 15,
            enforce: true,
          },
        },
      },

      // 런타임 청크 분리 (webpack 런타임 코드를 별도 파일로)
      runtimeChunk: {
        name: "runtime",
      },

      // 모듈 ID를 결정적으로 설정 (캐싱 개선)
      moduleIds: "deterministic",
    },

    // 로더 설정 (바벨, 스타일 등)
    module: {
      rules: [
        // JavaScript 로더
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    // 폴리필 최적화
                    useBuiltIns: "usage",
                    corejs: 3,
                  },
                ],
              ],
              plugins: [
                // 필요시 추가 플러그인
              ],
            },
          },
        },

        // CSS 로더 (필요시)
        // {
        //   test: /\.css$/,
        //   use: ["style-loader", "css-loader"],
        // },

        // 이미지 최적화
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, // 8KB 이하는 inline, 초과는 별도 파일
            },
          },
          generator: {
            filename: "images/[name].[contenthash:8][ext]",
          },
        },
      ],
    },

    // 플러그인 설정
    plugins: [
      // 번들 분석을 위한 플러그인 (선택사항, 로컬에서만 사용)
      // 설치: npm install --save-dev webpack-bundle-analyzer
      // 사용: npm run analyze
      // ...(process.env.ANALYZE && [
      //   new BundleAnalyzerPlugin(),
      // ]),
      new HtmlWebpackPlugin({
        template: "./index.html", // 소스 HTML 파일
        filename: "index.html", // 출력 HTML 파일명
        minify: isProduction
          ? {
              removeComments: true,
              collapseWhitespace: true,
            }
          : false,
      }),
    ],

    // 성능 경고 설정
    performance: {
      maxEntrypointSize: 250000, // 250 KiB
      maxAssetSize: 250000, // 250 KiB
      hints: isProduction ? "warning" : false,
    },

    // 해석 설정
    resolve: {
      extensions: [".js", ".json"],
      // 별칭 설정으로 import 경로 간단하게
      alias: {
        "@": path.resolve(__dirname, "src"),
        // 필요시 추가
      },
    },
  };
};
