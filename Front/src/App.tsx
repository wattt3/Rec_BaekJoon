import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./routes/404";
import Home from "./routes/Home";
import History from "./routes/History";
import ProblemRecommend from "./routes/ProblemRecommend";

export enum routes {
  HOME = "/",
  PROBLEM_RECOMMEND = "/problem-recommend",
  HISTORY = "/history",
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
        <Route path={routes.HISTORY} element={<History />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
