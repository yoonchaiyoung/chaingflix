import React from "react";
// Presenter의 역할 : Container으로 부터 받은 각종 이벤트나 상태 등을
// 화면에 적용 시키는 역할
import styled from "styled-components";
import Helmet from "react-helmet";
// helmet : title을 바꿀 수 있게 해줌.
// 브라우저에서 볼록 튀어나온 윗부분의 그림, 글.

import Section from "../../components/Section";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Poster from "../../components/Poster";

const Container = styled.div`
  padding: 20px;
`;

const HomePresenter = ({ nowPlaying, upcoming, popular, error, loading }) => {
  return (
    <>
      <Helmet>
        <title>Movies | Chaingflix</title>
        {/* 브라우저의 타이틀 부분 */}
      </Helmet>

      {loading ? (
        <Loader />
      ) : (
        <Container>
          {nowPlaying && nowPlaying.length > 0 && (
            <Section title="현재 상영작">
              {nowPlaying.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imageUrl={movie.poster_path}
                  rating={movie.vote_average}
                  isMovie={true}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                />
              ))}
            </Section>
          )}
          {upcoming && upcoming.length > 0 && (
            <Section title="개봉 예정작">
              {upcoming.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imageUrl={movie.poster_path}
                  rating={movie.vote_average}
                  isMovie={true}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                />
              ))}
            </Section>
          )}
          {popular && popular.length > 0 && (
            <Section title="인기 상영작">
              {popular.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imageUrl={movie.poster_path}
                  rating={movie.vote_average}
                  isMovie={true}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                />
              ))}
            </Section>
          )}

          {error && <Message color={"#e74c3c"} text={error} />}
        </Container>
      )}
    </>
  );
};

export default HomePresenter;

/* nowPlaying이 있고, 배열의 길이가 0보다 크면 -> 보여주겠다. 
삼항 연산자 사용.
loading ? A : B // loading이 true 라면 A하고
loading이 false라면 B하겠다. 
*/
