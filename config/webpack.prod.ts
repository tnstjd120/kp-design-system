import path from "path";
import webpack from "webpack";
import { merge } from "webpack-merge";
import common from "./webpack.common";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

const configuration: webpack.Configuration = {
  mode: "production", // 최적화와 압축을 위한 여러 플러그인들이 기본적으로 활성화 됌.
  devtool: "cheap-module-source-map", // 소스 맵 생성방식 정의 - 각 열에 대한 정보 제공하지 않고 행에 대한 매핑 정보만 제공하고 프로젝트 원본 소스 코드의 매핑 뿐만 아니라 loader에 의해 변환된 모든 모듈들에 대한 소스 맵도 생성
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[contenthash].js", // 출력 파일의 이름을 결정. => [contenthash] 사용 시 파일 이름이 같을 때 캐시에 저장하는 브라우저의 특성을 활용해 파일 내용이 변경 될 때만 파일 이름을 바꿔줌.
    clean: true, // 빌드 전 'output.paht' 경로에 있는 디렉토리 내용을 자동으로 삭제.
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // MiniCssExtractPlugin.loader와 css-loader을 같이 사용하게 되면, css를 별도의 파일로 추출해 줄 수 있어 js와 css를 병렬 처리가 가능하게함.
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()], // 플러그인에 포함시켜 MiniCssExtractPlugin를 사용하게함. => css를 별도의 파일로 추출하여 캐싱 및 병렬 처리를 통해 성능을 최적화 함.
  optimization: {
    usedExports: true, // tree shaking을 활성화. => 사용하지 않는 코드를 제거 (import하고 사용하지 않는 코드는 번들링 후 제거)
    minimize: true, // 번들을 최소화 시킴.
    minimizer: [new CssMinimizerPlugin()], // css의 공백, 주석등을 제거해서 파일 크기를 줄여줌.
  },
};

export default merge(common, configuration);
