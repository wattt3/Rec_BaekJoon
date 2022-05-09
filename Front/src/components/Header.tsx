import { Link } from "react-router-dom";
import { routes } from "../App";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full text-white flex gap-10 items-center py-5 px-20 z-50 bg-slate-900">
      <Link className="mr-10" to={routes.HOME}>
        <div className="lg:text-3xl text-2xl font-bold">
          <span className="text-indigo-500">하루</span>
          <span className="text-white">백준</span>
        </div>
      </Link>
      {/* <Link to={routes.PROBLEM_RECOMMEND}>
        <span className="text-slate-500 hover:text-white cursor-pointer">
          문제 추천
        </span>
      </Link> */}
      <Link to={routes.HISTORY}>
        <span className="text-slate-500 hover:text-white cursor-pointer text-sm lg:text-lg">
          히스토리
        </span>
      </Link>
    </header>
  );
};

export default Header;
