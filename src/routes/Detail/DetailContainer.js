import React from "react";
import DetailPresenter from "./DetailPresenter";
// container가 반드시 presenter가 포함
// container가 presenter의 부모 컴포넌트

export default class extends React.Component {
  // class 형 component
  constructor(props) {
    super(props);
  }
  // 함수형 component의 return
  // -> class형 component에서는 render
  render() {
    return <DetailPresenter />;
  }
}
