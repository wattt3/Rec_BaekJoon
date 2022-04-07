import { Link } from "react-router-dom";
import { routes } from "../App";

const Header = () => {
  return (
    // <header className="w-full fixed top-0 left-0 z-50 border-b-2 border-slate-300 bg-slate-200">
    //   <div className="flex py-2 max-w-screen-lg w-full mx-auto justify-between items-center">
    //     {/* header left */}
    //     <div className="flex items-center justify-center gap-10">
    //       <Link to={routes.HOME}>
    //         <FontAwesomeIcon
    //           className="text-5xl text-slate-700"
    //           icon={faInnosoft}
    //         />
    //       </Link>
    //       <Link to={routes.PROBLEM_RECOMMEND}>
    //         <section className="text-black  p-3 px-5 hover:bg-slate-300 rounded-2xl transition-all duration-300 cursor-pointer">
    //           문제 추천
    //         </section>
    //       </Link>
    //     </div>
    //   </div>
    // </header>
    <header className="fixed top-0 left-0 w-full text-white flex gap-10 items-center py-5 px-20  z-[99] bg-slate-900">
      <Link className="mr-10" to={routes.HOME}>
        <div className="text-3xl font-bold">
          <span className="text-indigo-500">하루</span>
          <span className="text-white">백준</span>
        </div>
      </Link>
      <Link to={routes.PROBLEM_RECOMMEND}>
        <span className="text-slate-500 hover:text-white cursor-pointer">
          문제 추천
        </span>
      </Link>
      <Link to={routes.HISTORY}>
        <span className="text-slate-500 hover:text-white cursor-pointer">
          히스토리
        </span>
      </Link>
    </header>
  );
};

export default Header;
