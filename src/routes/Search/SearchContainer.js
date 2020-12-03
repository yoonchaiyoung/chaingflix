import React from "react";
import { moviesApi, tvApi } from "../../api";
import SearchPresenter from "./SearchPresenter";
// container가 반드시 presenter가 포함
// container가 presenter의 부모 컴포넌트

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null,
    loading: false,
  };

  // submit
  handleSubmit = (event) => {
    // form에서 submit이 작동은 하는데, 원래 하고자 했던 이벤트를 취소한다. (중요!)
    // 그래서 원래 form이 하려고 했던 이벤트를 알고 있어야 함.
    event.preventDefault();
    const { searchTerm } = this.state;

    if (searchTerm !== "") {
      this.searchByTerm();
    }
    // searchTerm이 비워있지 않는 경우.
  };

  // update -> onChange에서 일어날 이벤트
  updateTerm = (event) => {
    const {
      target: { value: searchTerm },
    } = event;

    this.setState({ searchTerm });
  };

  // search -> 검색어를 넣은 api 호출
  // event가 일어났을 때 비동기적으로 호출 -> async 앞에 붙여주기
  searchByTerm = async () => {
    // 1. 검색어 가져오기
    const { searchTerm } = this.state;

    // 2. loading 설정하기
    this.setState({ loading: true });

    // 3. 실제 api 호출
    // data의 응답 형태 : {data:{results:[{},{},{},,,]}} 형태로 있음 -> unpacking 필요
    try {
      // moviesApi.search -> movieResults 에 담기
      // tvApi.search -> tvResults에 담기

      // unpacking 기법을 활용해서
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      // state에 의해 바뀌어진 검색어(searchTerm) 대입

      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);

      this.setState({ movieResults, tvResults });
    } catch (error) {
      this.setState({
        error: "결과를 찾을 수 없습니다.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  constructor(props) {
    super(props);
  }
  // 함수형 component의 return
  // -> class형 component에서는 render
  render() {
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
