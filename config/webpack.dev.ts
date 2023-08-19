import path from "path";
import webpack from "webpack";
import "webpack-dev-server";
import { merge } from "webpack-merge";
import common from "./webpack.common";

import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";

const configuration: webpack.Configuration = {
  mode: "development", // 개발 모드를 활성화하여 디버깅 및 개발에 최적화된 번들링과 HMR이 가능해짐.
  devtool: "inline-source-map", // 소스맵 생성 방식 정의 - 디버깅을 수월하게 하기위해 소스 맵 파일을 번들리에 포함 시킴. => 번들링된 파일에서 에러가 났을 때 소스 맵 파일로 인해 React에서 에러가 난 부분의 정확한 위치를 찾을 수 있음.
  output: {
    path: path.resolve(__dirname, "../dist"), // 번들 파일들을 출력할 디렉토리를 지정.
    filename: "[name].bundle.js", // 출력된 번들 파일의 이름 지정.
  },
  module: {
    rules: [
      {
        test: /\.css$/, // .css 확장자를 타겟팅
        use: ["style-loader", "css-loader"], // test에 선언된 확장자 파일들을 'style-loader', 'css-loader'를 사용해 파일을 변환함.
        exclude: /node_modules/, // node_modules는 제외하고 적용
      },
    ],
  },
  plugins: [new ReactRefreshPlugin()], // webpack dev 서버에 react의 변경 사항을 실시간으로 반영 => react용 HMR
  devServer: {
    static: path.join(__dirname, "public"), // 정적 파일을 제공할 디렉토리 설정
    port: 3000, // 개발 서버의 포트 번호 설정 => auto로 설정 가능
    open: true, // 서버가 시작할 때 자동으로 브라우저를 여는 설정
    compress: true, // 모든 자원들을 gzip 압축하여 제공
    historyApiFallback: true, // 404 에러 대신 index.html 페이지로 리디렉션 시킴 => SPA를 위한 설정
    hot: true, // HMR을 활성화 시켜 코드 변경 시 전체 페이지 새로고침 없이 해당 모듈만 반영 시킴. => RefreshWebpackPlugin이 없으면 react에서 state나 props를 일반 HMR로는 빠른 대응이 불가능 해서 RefreshWebpackPlugin를 플러그인에 포함시켜 react에 특화된 HMR을 제공
  },
  watchOptions: {
    ignored: /node_moduels/, // 변경된 부분을 감지하는 파일 목록 중 node_moduels의 변경은 감지 옵션에서 제외 시킴.
  },
};

export default merge(common, configuration);
