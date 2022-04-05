import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import NewHome from "./routes/NewHome";
import ProblemRecommend from "./routes/ProblemRecommend";

export enum routes {
  HOME = "/",
  PROBLEM_RECOMMEND = "/problem-recommend",
  NEW_HOME = "/new-home",
}

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/* <Header /> */}
      <Routes>
        <Route path={routes.HOME} element={<Home />}></Route>
        <Route path={routes.NEW_HOME} element={<NewHome />}></Route>
        <Route
          path={routes.PROBLEM_RECOMMEND}
          element={<ProblemRecommend />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
