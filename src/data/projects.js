export const projects = [
  {
    no: 9,
    name: "The Bunker",
    period: "2023.09",
    images: [
      "src/images/projects/theBunker/1.png",
      "src/images/projects/theBunker/2.png",
      "src/images/projects/theBunker/3.png",
    ],
    desc: "새로운 My Portfolio 사이트를 구상하던 중, 건물 내 엘리베이터에 영감을 받아 기존 밋밋했던 스크롤 이동 방식을 Canvas를 이용하여 층 이동을 구현해보면 재미있을 것 같아서 작업.",
    func: "엘리베이터 내 층 버튼 누르면 LED 층 수가 바뀌며 문 열리는 애니메이션, 해당 층으로 이동하여 해당 섹션을 확인, 해당 섹션에서 엘리베이터로 다시 탑승",
    github: "https://github.com/guamegi/the-bunker",
    url: "https://guamegi.github.io/the-bunker/",
    stack: "HTML5, CSS3, Javascript, Canvas, Webpack, Tailwindcss",
  },
  {
    no: 8,
    name: "영어 타자 연습",
    period: "2023.09",
    images: [
      "src/images/projects/typing/1.png",
      "src/images/projects/typing/2.png",
      "src/images/projects/typing/3.png",
    ],
    desc: "영어 단어, 문장 타자 연습기. random (word/quote) api 호출하여 영어 단어나 문장을 데이터로 활용",
    func: "영어 타자 속도, 정확도, 오타 횟수 등 상태를 체크.",
    github: "https://github.com/guamegi/typing-exam",
    url: "https://guamegi.github.io/typing-exam/",
    stack: "HTML5, CSS3, Javascript",
  },
  {
    no: 7,
    name: "Sally's Tarot",
    period: "2023.04 ~ 05",
    images: [
      "src/images/projects/sallyTarot/1.png",
      "src/images/projects/sallyTarot/2.png",
      "src/images/projects/sallyTarot/3.png",
      "src/images/projects/sallyTarot/4.png",
      "src/images/projects/sallyTarot/5.png",
      "src/images/projects/sallyTarot/6.png",
      "src/images/projects/sallyTarot/7.png",
      "src/images/projects/sallyTarot/8.png",
    ],
    desc: `타로 카드를 사용하여 미래를 예측하는 모바일 타로 앱. One card로 현재 상황을 해석하고, Three cards로 과거 / 현재 / 미래를 풀이. 영어와 한국어의 다국어 지원. 생성형 이미지 AI 툴인 stable diffusion을 이용해 디자인 활용.`,
    func: "One or Three cards 설정/선택, 선택한 카드 로컬DB 저장, 공유 기능, 다국어 지원(영어/한국어)",
    // github: "https://github.com/guamegi/chart-simulator",
    url: "https://play.google.com/store/apps/details?id=com.guamegi.sallytarot",
    stack: "React Native(CRNA), Styled-Components, i18next, Realm",
  },
  {
    no: 6,
    name: "Mooving",
    period: "2023.03 ~ 04",
    images: [
      "src/images/projects/mooving/1.png",
      "src/images/projects/mooving/2.png",
    ],
    desc: `TMDB의 무료 API 이용해 국내 및 해외의 인기 영화와 TV 프로그램의 평점과 정보들을 제공. 섹션별 컨텐츠 제공 및 상세 내용 안내, 내가 알고싶은 영상 컨텐츠 검색 기능 제공. 인앱브라우저 기능으로 유튜브 트레일러 영상을 지원. `,
    func: "영화, TV 프로그램 정보 제공, 검색 기능, 인앱브라우저, Light/Dark 테마 지원",
    github: "https://github.com/guamegi/mooving",
    url: "https://play.google.com/store/apps/details?id=com.guamegi.mooving",
    stack: "React Native, TypeScript, Styled-Components, react-query",
  },
  {
    no: 5,
    name: "Chart Simulator",
    period: "2022.10 ~ 현재",
    images: [
      "src/images/projects/chartSimulator/1.png",
      "src/images/projects/chartSimulator/2.png",
    ],
    desc: `데이터를 기반으로 종목과 여러 보조지표를 선택하고 AI를 활용해 확률적 결과를 도출하는 시뮬레이터. 주식이나 가상화폐 등 투자자가 최적의 지표를 찾는데 도움을 주고, 히스토리 데이터를 통해 차트 분석 서포팅 목적.`,
    func: "종목과 보조지표 선택에 따른 합성 차트 생성, 예측",
    github: "https://github.com/guamegi/chart-simulator",
    // url: "https://guamegi.github.io/image-classification/",
    stack: "Next.js, Tailwindcss, Zustand",
  },
  {
    no: 4,
    name: "Image Classification",
    period: "2022.09",
    images: [
      "src/images/projects/imageClassification/1.png",
      "src/images/projects/imageClassification/2.png",
    ],
    desc: `AI로 이미지를 해석하고 동적 object로 만드는 것에 관심. 관련 방법을 알아보던 중 머신러닝 모델을 이용하여 구현 가능성을 찾게 됨. 
    먼저 간단한 앱을 만들어 보는데 의의. TensorFlow.js 를 활용해 업로드 한 이미지를 분석.`,
    func: "TensorFlow.js로 업로드 한 이미지 분석",
    github: "https://github.com/guamegi/image-classification",
    url: "https://guamegi.github.io/image-classification/",
    stack: "HTML5, CSS3, Javascript, TensorFlow.js",
  },
  {
    no: 3,
    name: "My Portfolio",
    period: "2022.07 ~ 08",
    images: [
      "src/images/projects/myPortfolio/1.png",
      "src/images/projects/myPortfolio/2.png",
    ],
    desc: `본인의 간략한 소개와 개인 프로젝트 내용을 담은 포트폴리오 사이트. 진행했던 개인 프로젝트들의 이력을 남기고자 만들게 됨.`,
    func: "css 및 wow.js, animate.css를 적용한 간단한 애니메이션",
    github: "https://github.com/guamegi/reactjs-portfolio",
    url: "https://guamegi.github.io/reactjs-portfolio/",
    stack: "React.js, Bootstrap, SCSS",
  },
  {
    no: 2,
    name: "ChartBook",
    period: "2022.05 ~ 06",
    images: [
      "src/images/projects/chartBook/1.png",
      "src/images/projects/chartBook/2.png",
    ],
    desc: `내가 보유한 주식과 가상화폐의 투자 자산 현황을 실시간으로 모니터링.
    총 자산 현황을 파악하기 위해 각각의 앱에 들어가서 계산해야 하는 
    불편함이 계기가 되어 개발.
    `,
    func: "가상화폐 웹소켓 실시간 시세, 주식 시세 크롤링, chart 라이브러리 활용 차트생성",
    github: "https://github.com/guamegi/chart-book-nodejs",
    url: "https://port-0-chart-book-nodejs-jvpb2aln39jnz0.sel5.cloudtype.app/",
    stack:
      "React.js, Bootstrap, Websocket, Chart.js, Tradingview-lightweight, cloudtype, zustand",
  },
  // {
  //   no: 1,
  //   name: "Dynamic Chart Sample",
  //   period: "2019.07 ~ 12, 2022.07 ~",
  //   images: [
  //     "src/images/projects/dynamicChart/1.png",
  //     "src/images/projects/dynamicChart/2.png",
  //   ],
  //   desc: `실시간 차트를 이용한 트레이딩 플랫폼을 검토하기 위해
  //   2인이 Canvas를 사용하여 프로토타입 개발. 임시 중단된 legacy 활용 검토 중.
  //   샘플 데이터를 생성해 동적 차트 생성과 서큘러 큐
  //   방식의 데이터 구조 활용.
  //   `,
  //   func: "샘플 데이터를 이용한 동적 차트 생성 및 차트 설정",
  //   github: "https://github.com/guamegi/dynamic-chart-sample",
  //   url: "https://guamegi.github.io/dynamic-chart-sample/",
  //   stack: "HTML5, CSS3, Javascript, HTML5 Canvas",
  // },
];
