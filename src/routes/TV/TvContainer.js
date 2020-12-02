import React from "react";
import TvPresenter from "./TvPresenter";
import { tvApi } from "../../api";
// container가 반드시 presenter가 포함
// container가 presenter의 부모 컴포넌트

export default class extends React.Component {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    error: null,
    loading: true,
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();

      const {
        data: { results: popular },
      } = await tvApi.popular();

      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();

      console.log(topRated);
      console.log(popular);
      console.log(airingToday);

      this.setState({
        topRated,
        popular,
        airingToday,
      });
    } catch (error) {
      this.setState({
        error: "TV 정보를 찾을 수 없습니다.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    const { topRated, popular, airingToday, error, loading } = this.state;
    return (
      <TvPresenter
        topRated={topRated}
        popular={popular}
        airingToday={airingToday}
        error={error}
        loading={loading}
      />
    );
  }
}
// 함수형 component의 return
// -> class형 component에서는 render
