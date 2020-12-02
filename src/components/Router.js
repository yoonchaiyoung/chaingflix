// 이 파일에서 router 관리
// App.js 에서는 component 관리만 할 수 있도록
// 따로 파일을 새로 만든 것. -> 기능의 분리!
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
// HashRouter 이름이 기니까 그냥 Router로 alias 해주자.
import Detail from "../routes/Detail";
import Home from "../routes/Home";
import Search from "../routes/Search";
import TV from "../routes/TV";

// 오로지 router만 관리하는 component가 될 것이다.
export default () => (
  <Router>
    <>
      <Header />
      {/* 기본적으로 Switch가 없이 라우터를 배치하면
      모든 라우터를 탄다.
      Switch를 활용하면 오로지 하나의 라우터만 타게 된다. */}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" exact component={TV} />
        <Route path="/search" exact component={Search} />
        <Route path="/movie/:id" exact component={Detail} />
        <Route path="/show/:id" exact component={Detail} />
      </Switch>
    </>
  </Router>
);
