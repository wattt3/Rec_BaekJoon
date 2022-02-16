import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Login from "./routes/Login";
import ProblemRecommend from "./routes/ProblemRecommend";

export enum routes {
  HOME = "/",
  LOGIN = "/login",
  JOIN = "/join",
  PROBLEM_RECOMMEND = "/problem-recommend",
}

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path={routes.HOME} element={<Home />}></Route>
        <Route
          path={routes.PROBLEM_RECOMMEND}
          element={<ProblemRecommend />}
        ></Route>
        <Route path={routes.LOGIN} element={<Login />}></Route>
        <Route path={routes.JOIN} element={<Join />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
