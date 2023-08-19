const presets = [
  "@babel/preset-react", // jsx 구문들을 javascript로 변환하는데 사용.
  [
    "@babel/preset-env", // 브라우저의 버전과 node.js의 버전 등에 대해 호환성을 생각하지 않고 최신 javascript의 기능들을 사용할 수 있음.
    {
      modules: false, // 컴파일할 모듈 시스템을 결정. => false로 설정하면 모듈이 변환되지 않아서 ES6 모듈을 사용함.
      useBuiltIns: "usage", // 코드에서 실제로 사용하고 있는 pollyfill만 포함하도록 처리(babel 자동감지 처리).
      corejs: 3, // 사용중인 core-js의 버전을 지정. => 위의 useBuiltIns를 제대로 작동하게 하기 위해서 사용.
    },
  ],
  "@babel/preset-typescript", // tsc를 사용하여 ts를 js로 변환하지 않아도 ts를 작성하고 js를 출력할 수 있도록  사용. => 트랜스파일 처리는 되지만 타입 검사는 안해줌.
];

const plugins = [];

module.exports = { presets, plugins };
