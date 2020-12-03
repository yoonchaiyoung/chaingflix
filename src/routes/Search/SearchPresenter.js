import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Poster from "../../components/Poster";
import Section from "../../components/Section";

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

const SearchPresenter = ({
  movieResults,
  tvResults,
  searchTerm,
  error,
  loading,
  handleSubmit,
  updateTerm,
}) => {
  return (
    <Container>
      <Helmet>
        <title>Search | Chaingflix</title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="검색할 영화나 TV 프로그램을 검색하세요"
          value={searchTerm}
          onChange={updateTerm}
        />
      </Form>
      {/* Form 안쪽에 있는 모든 input들을 서버로 보냄. */}

      {loading ? (
        <Loader />
      ) : (
        <>
          {movieResults && movieResults.length > 0 && (
            <Section title="영화 검색 결과">
              {movieResults.map((movie) => (
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
          {tvResults && tvResults.length > 0 && (
            <Section title="TV 검색 결과">
              {tvResults.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  title={show.name}
                  imageUrl={show.poster_path}
                  rating={show.vote_average}
                  isMovie={false}
                  year={
                    show.first_air_date && show.first_air_date.substring(0, 4)
                  }
                />
              ))}
            </Section>
          )}
          {error && <Message color={"e74c3c"} text={error} />}
          {tvResults &&
            movieResults &&
            tvResults.length === 0 &&
            movieResults.length === 0 && (
              <Message text="검색 결과가 없습니다." color={"#95a5a6"} />
              // if문을 사용할 수 없음. 이런 형식으로 사용하는 것 알아두기!
            )}
        </>
      )}
    </Container>
  );
};

export default SearchPresenter;
