import React from "react";
import { moviesApi, tvApi } from "../../api";
import DetailPresenter from "./DetailPresenter";
// container가 반드시 presenter가 포함
// container가 presenter의 부모 컴포넌트

export default class extends React.Component {
  // class 형 component
  // 생성자에서 할 일
  // 영화 상세 페이지를 표현해야 하는지 설정

  // detail을 한 파일에서 처리 -> /movie인지 /show 인지 path를 받아야 함
  constructor(props) {
    super(props);

    // 함수형 component의 return
    // -> class형 component에서는 render

    const {
      location: { pathname },
    } = props;

    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
    };
  }

  async componentDidMount() {
    // match.params로부터 id 가지고 오기
    // 만약에 id가 들어오지 X -> HOME으로 강제 이동 -> history의 push함수가 해준다.
    // 과정 중요!
    // 사용자의 요청을 서버가 받고, 재요청하도록 하는 것을 redirect라고 한다.

    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;

    // id : 문자열
    // -> 숫자로 바꿔야 함.
    const { isMovie } = this.state;
    const parseId = parseInt(id);
    // 올바르지 않은 id라면
    if (isNaN(parseId)) {
      // Home으로 redirect
      return push("/");
    }

    let result = null;
    // data를 뽑아서 result에 넣겠다는 이야기
    // 우선 null

    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parseId));
      } else {
        ({ data: result } = await tvApi.showDetail(parseId));
      }
    } catch (error) {
      this.setState({
        error: "아무것도 찾을 수가 없어요",
      });
    } finally {
      this.setState({ loading: false, result });
    }
  }
  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}

// 변수 key, 위치, 이름 다 신경써야 함.
// state의 key 값이 result
// 변수들의 이름도 result이니까
// 그냥 {result}로 표시가능
