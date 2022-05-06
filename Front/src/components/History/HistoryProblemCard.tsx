/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { routes } from "../../App";
import { ProblemCardColor } from "../../libs/utils";

interface IHistoryProblemCard {
  color: ProblemCardColor;
}

const HistoryProblemCard: React.FC<IHistoryProblemCard> = ({ color }) => {
  const bgColor =
    color === "indigo"
      ? "bg-indigo-600"
      : color === "rose"
      ? "bg-rose-600"
      : color === "slate"
      ? "bg-slate-600"
      : "bg-teal-600";

  const darkerBgColor =
    color === "indigo"
      ? "bg-indigo-700"
      : color === "rose"
      ? "bg-rose-700"
      : color === "slate"
      ? "bg-slate-700"
      : "bg-teal-700";

  return (
    <Link
      className="w-full h-full"
      state={{ color }}
      // 여기 링크에서 problemId를 to 부분 함수 내부에 넣어주시면 됩니다.
      to={routes.HISTORY_PROBLEM_DETAIL(Date.now())}
    >
      <div className="w-full h-full rounded-3xl overflow-hidden">
        <div
          className={`w-full h-full ${bgColor} flex justify-center items-center relative`}
        >
          {/* 여기에 문제에 대한 제목과 태그 넣어주시면 될꺼 같습니다. 공간이 협소해서 최대 3개정도가 가장 이상적인거 같습니다. */}
          <span className="font-semibold text-2xl text-white">문제 제목</span>
          <div className="absolute bottom-0 left-0 w-full p-3 flex flex-wrap justify-center items-center gap-1 text-white">
            <span className={`text-xs p-1 px-3 ${darkerBgColor} rounded-md`}>
              태그
            </span>
            <span className={`text-xs p-1 px-3 ${darkerBgColor} rounded-md`}>
              태그
            </span>
            <span className={`text-xs p-1 px-3 ${darkerBgColor} rounded-md`}>
              태그
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HistoryProblemCard;
