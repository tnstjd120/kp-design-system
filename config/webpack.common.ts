import path from "path";
import webpack from "webpack";

import HtmlWebpackPlugin from "html-webpack-plugin";

const configuration: webpack.Configuration = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx"], // import 할 때 확장자를 설정해주지 않아도 됌. => ex) import './index.tsx' -> import './index'
    alias: {
      "@src": path.resolve(__dirname, "../src/"), // 상대 경로들에 대해서 절대 경로를 지정해 줄 수 있음. => ex) ../../../src/ -> @src/
    },
  },
  entry: "./src/index", // webpack이 종속성 그래프를 만들 때의 진입점 파일을 설정.
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/, // 규칙을 적용시킬 확장자들을 선언. => ts,tsx,js,jsx 지정
        use: ["babel-loader"], // 사용할 트랜스파일러를 지정. => 위의 test에서 지정된 확장자들을 babel을 사용해서 트랜스파일 처리.
        exclude: /node_modules/, // 제외할 디렉토리 지정. => babel이 node_modules를 트랜스파일 처리 하지 않게 제외 시킴.
      },
    ],
  },
  plugins: [
    // webpack 번들에 대한 스크립트가 포함된 index.html을 기본적으로 생성하고, 추가 설정 시 생성되는 html파일 내의 설정을 조정할 수 있다. => public폴더 안의 index.html을 기본 템플릿으로 설정
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "..", "public", "index.html"),
    }),
    new webpack.ProvidePlugin({ React: "react" }), // import 하지 않아도 자동으로 로드되는 모듈을 지정 => React를 직접 import하지 않아도 webpack에 의해 번들로 제공되는 파일에서 참조될 땜마다 React를 자동으로 import함.
  ],
};

export default configuration;
