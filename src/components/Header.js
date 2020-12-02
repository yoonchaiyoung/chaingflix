import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  background-color: rgba(20, 20, 20, 0.8);
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
  z-index: 10;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 80px;
  text-align: center;
  height: 50px;
  border-bottom: 3px solid
    ${(props) => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const StyledLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 라우터로 인해 컴포넌트가 교체되면 Header에 변화를 줘야한다.
// 탭 아래에 파랑색 밑줄이 생기는 효과를 줄 것이다.
// 어떠한 라우터로 이동하는지 알아야 하기 때문에 withRouter를 사용해야 한다.
// 함수를 withRouter로 감싸준다.

// router로 감싸진 함수에는 match(파라미터), history, location의 정보들 들어옴.

export default withRouter(({ location: { pathname } }) => (
  // ()안에 props 를 쓰면 match, history, location 다 들어옴
  // 근데 pathname만 필요
  // 효과때문에.

  // unpacking 2번 필요
  // props 안에 location 안에 path name 있음

  // location 안에 pathname를 꺼내고 싶다?
  // const {location : {pathname}} = props; 와 의미가 동일
  <Header>
    <List>
      <Item current={pathname === "/"}>
        <StyledLink to="/">영화</StyledLink>
      </Item>
      <Item current={pathname === "/tv"}>
        <StyledLink to="/tv">TV</StyledLink>
      </Item>
      <Item current={pathname === "/search"}>
        <StyledLink to="/search">검색</StyledLink>
      </Item>
    </List>
  </Header>
));
// 함수를 불러오는 것이기 때문에 이렇게 가능.
