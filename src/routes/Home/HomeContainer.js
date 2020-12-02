import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "../../api";
// container가 반드시 presenter가 포함
// container가 presenter의 부모 컴포넌트

// Container의 역할 : Application에서 사용되어지는 기능(함수), 상태(state), 이벤트 등을 구현, Presenter에 전달

export default class extends React.Component {
  // class형 component에서 state 만들기
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
  };
  // constructor : 클래스 생성자
  // 생성자의 매개변수로 부모 컴포넌트의 props가 들어온다.
  constructor(props) {
    super(props);
  }

  // component가 부모 component에 마운트 됐을 때 호출되는 함수
  // useEffect(() => {}, [])와 같다.

  // useEffect 에서의 비동기처리와는 다르게, class형 component의 componentDidMount에서의
  // 비동기 처리는 앞에 sync 키워드를 붙여주면 된다.
  // 어제의 비동기 처리, 오늘의 비동기 처리 다름.
  async componentDidMount() {
    try {
      // data -> results에 원하는 내용이 있었음
      // console로 확인했음
      // data : {results : [{}, {}, {}...]} 식의 구조로 있었음
      // unpacking 하면됨

      // 새로운 unpacking 방법~
      // data안에 있는 results에 들어있는 값을 nowPlaying 변수에 넣겠다는 의미.
      // const nowPlaying = await moviesApi.nowPlaying().data.results;
      // 이 코드와 똑같음.
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      // data 안에 results 안에 있는 배열을 뽑아서
      // nowPlaying 이라는 변수에 집어넣겠다.

      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();

      const {
        data: { results: popular },
      } = await moviesApi.popular();

      // console.log(nowPlaying);
      // console.log(upcoming);
      // console.log(popular);
      // 데이터 잘 불러와지는지 확인

      this.setState({
        nowPlaying,
        upcoming,
        popular,
      });
    } catch (error) {
      // 객체로 들어가면 됨
      this.setState({
        error: "영화 정보를 찾을 수 없습니다.",
      });
    } finally {
      // 에러가 나던/ 안 나던 항상 실행되는 코드
      this.setState({
        loading: false,
      });
    }
  }
  // 함수형 component의 return
  // -> class형 component에서는 render
  render() {
    // 렌더링할 때 state 필요
    // 윗 부분에 state = {nowPlaying: null, ,,,,,} 이렇게 묶여있음
    // unpacking 필요

    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    // 그냥 state 라고 쓰면 class용 변수가 아닌 함수용 변수.
    // 명시적으로 this를 붙여줌.
    // class에서 선언된 변수이구나. 라고 알려주는 키워드 : this.
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}

// container -> 데이터, 기능에 대해서만 이야기
// 화면에 보여지는 것에 대해서는 아무 이야기도 하지 X
