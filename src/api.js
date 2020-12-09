import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",

  // local에서 테스트 할 때는
  // baseURL: 'http://localhost:5000/',

  // 배포할 때는 AWS의 DB를 연결
  // baseURL: "aws ip (배포 직전)",
  params: {
    api_key: "f02b39f36febafba0161b0cd7bb4e12f",
    language: "ko-KR",
  },
});

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};

// 영화, TV 정보를 어떤 형식으로 가져오는 지가 이 api.js 에 담겨있음.
// 위의 영화부분 보면
// movie/now_playing을 nowPlaying으로 가져온 것 처럼...
