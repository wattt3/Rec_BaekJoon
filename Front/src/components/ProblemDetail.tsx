import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../App";
import { colorApply, ProblemCardColor } from "../libs/utils";
import { useCombinedStateSelector } from "../redux/hook";
import { ProblemMetadata } from "../redux/state";

interface IProblemDetail {
  color: ProblemCardColor;
}

const ProblemDetail: React.FC<IProblemDetail> = ({ color }) => {
  const navigate = useNavigate();

  const { problemId } = useParams<{ problemId?: string }>();
  console.log(problemId);
  if (problemId == undefined) {
    return <div>No matched problemId.</div>;
  }

  const ProblemMetadataList = useCombinedStateSelector(
    (state) => state.userState.recommendProblemsOfCurrentUser
  );

  const currentProblemMetadata = ProblemMetadataList.find(
    (problemMetadata) => problemMetadata.problemId == parseInt(problemId!)
  )!;

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

  const lighterBgColor =
    color === "indigo"
      ? "bg-indigo-500"
      : color === "rose"
      ? "bg-rose-500"
      : color === "slate"
      ? "bg-slate-500"
      : "bg-teal-500";

  // dispalyNames의 0번째가 한글 이름
  const tagItemList = currentProblemMetadata.tags
    .map((tag) => tag.displayNames[0].name)
    .map((tagName, index) => (
      <span
        className={`px-2 py-1 ${darkerBgColor}  rounded-full text-white font-medium`}
        key={index}
      >
        {tagName}
      </span>
    ));

  return (
    <motion.section
      initial={{ opacity: 0, y: document.body.clientHeight }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: document.body.clientHeight }}
      transition={{ duration: 0.5, type: "tween" }}
      className="absolute top-0 left-0 w-full h-full pt-20 flex flex-col"
    >
      <div
        onClick={() => {
          navigate(routes.PROBLEM_RECOMMEND);
        }}
        className="w-full p-2 px-5 backdrop-blur-sm hover:backdrop-blur-0 transition-all cursor-pointer flex justify-end items-center group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 aspect-square fill-white opacity-50 group-hover:opacity-100 transition-colors"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="w-full flex-1 backdrop-blur-sm bg-transparent">
        <div
          className={`w-full h-full ${bgColor} rounded-tl-3xl rounded-tr-3xl p-10`}
        >
          <div className="w-full h-full flex flex-col gap-5 items-start">
            <div className="text-5xl font-semibold text-white">
              {currentProblemMetadata.title}
            </div>
            <div className="flex flex-wrap w-full justify-start items-center gap-3 ">
              {tagItemList}
            </div>
            <div className="w-full flex flex-wrap justify-start items-center gap-5">
              <div
                className={`w-72 aspect-square ${lighterBgColor} rounded-3xl flex justify-center items-center  text-2xl font-semibold`}
              >
                {currentProblemMetadata.level}
              </div>
              <div
                className={`w-72 aspect-square ${lighterBgColor} rounded-3xl flex justify-center items-center`}
              >
                {currentProblemMetadata.averageTries}
              </div>
              <div
                className={`w-72 aspect-square ${lighterBgColor} rounded-3xl flex justify-center items-center`}
              >
                {currentProblemMetadata.acceptedUserCount}
              </div>
              <div
                className={`w-72 aspect-square ${lighterBgColor} rounded-3xl flex justify-center items-center`}
              >
                {currentProblemMetadata.link}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProblemDetail;

// problemId: number;

// // 문제의 제목
// title: string;

// // 문제의 level
// level: number;

// // 평균 시도 횟수
// averageTries: number;

// // 문제 맞은 사람 수
// acceptedUserCount: number;

// // 문제의 태그들 (solved.ac 에서는 tags.key)
// tags: string[];

// // 백준으로 넘어갈 수 있는 링크
// link: string;
