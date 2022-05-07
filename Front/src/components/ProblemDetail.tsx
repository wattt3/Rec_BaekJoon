/* eslint-disable react/prop-types */
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { routes } from "../App";
import { convertLevelToTier, ProblemCardColor } from "../libs/utils";
import StaticMosaic from "./StaticMosaic";
import { motion } from "framer-motion";
import {
  ProblemDescriptionAnimation,
  ProblemDetailContainerAnimation,
  ProblemDetailItemAnimation,
} from "../animations/problemDetail";
import React from "react";
import { useCombinedStateSelector } from "../redux/hook";
import { ProblemMetadata } from "../redux/state";

interface IProblemDetail {
  color: ProblemCardColor;
}

const ProblemDetail: React.FC<IProblemDetail> = ({ color }) => {
  const navigate = useNavigate();
  const isRecommendDetail = useMatch(routes.PROBLEM_DETAIL());
  const isHistoryDetail = useMatch(routes.HISTORY_PROBLEM_DETAIL());
  const { problemId } = useParams();

  const currentUserName = useCombinedStateSelector((state) => {
    if (isHistoryDetail) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return state.historyState.currentUserName!;
    }
    if (isRecommendDetail) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return state.userState.currentUserName!;
    }
    return "";
  });

  let ProblemMetadataList: ProblemMetadata[] = [];
  useCombinedStateSelector(
    (state) => state.userState.recommendProblemList
  ).forEach((problemRelation) => {
    if (problemRelation.userName == currentUserName) {
      ProblemMetadataList = [...problemRelation.problemList];
    }
  });

  const currentProblemMetadata = problemId
    ? ProblemMetadataList.find(
        (problemMetadata) => problemMetadata.problemId == problemId
      )
    : undefined;

  const bgColor =
    color === "indigo"
      ? "bg-indigo-500"
      : color === "rose"
      ? "bg-rose-500"
      : color === "slate"
      ? "bg-slate-500"
      : "bg-teal-500";

  const darkerBgColor =
    color === "indigo"
      ? "bg-indigo-600"
      : color === "rose"
      ? "bg-rose-600"
      : color === "slate"
      ? "bg-slate-600"
      : "bg-teal-600";

  const lighterBgColor =
    color === "indigo"
      ? "bg-indigo-300"
      : color === "rose"
      ? "bg-rose-300"
      : color === "slate"
      ? "bg-slate-300"
      : "bg-teal-300";

  const ringColor =
    color === "indigo"
      ? "ring-indigo-500"
      : color === "rose"
      ? "ring-rose-500"
      : color === "slate"
      ? "ring-slate-500"
      : "ring-teal-500";

  // dispalyNames의 0번째가 한글 이름
  const tagItemList = currentProblemMetadata
    ? currentProblemMetadata.tags
        .map((tag) => tag.displayNames[0].name)
        .map((tagName, index) => (
          <span
            className={`px-2 py-1 ${darkerBgColor}  rounded-full text-white font-medium`}
            key={index}
          >
            {tagName}
          </span>
        ))
    : null;

  const handleGoBack = () => {
    const goto = isHistoryDetail
      ? routes.HISTORY
      : isRecommendDetail
      ? routes.PROBLEM_RECOMMEND
      : routes.HOME;
    navigate(goto);
  };

  console.log(currentUserName, ProblemMetadataList, currentProblemMetadata);

  return (
    <motion.section
      initial={{ opacity: 0, y: window.outerHeight }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: window.outerHeight }}
      transition={{ duration: 0.5, type: "tween" }}
      className="fixed top-0 left-0 w-full h-full flex flex-col z-[99] overflow-hidden"
    >
      {/* 문제 디테일 빠져 나가는 부분  */}
      <div
        onClick={handleGoBack}
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
      {/* 문제 디테일 컨테이너 */}
      <div className="w-full flex-1 backdrop-blur-sm bg-transparent group-hover:backdrop-blur-0">
        <div
          className={`w-full h-full ${bgColor} rounded-tl-3xl rounded-tr-3xl p-10`}
        >
          <div className="w-full h-full flex flex-col gap-5 items-start">
            <div className="text-5xl font-semibold text-white">
              {currentProblemMetadata?.title}
            </div>
            <div className="flex flex-wrap w-full justify-start items-center gap-3">
              {tagItemList}
            </div>
            {/* 문제 디테일에서 가운데 뚫린 부분 컨테이너 */}
            <div
              className={`w-full flex-1  overflow-hidden  rounded-3xl shadow-inner text-white ${lighterBgColor} relative`}
            >
              <div className="absolute w-full h-full">
                <StaticMosaic />
              </div>
              <div className="absolute w-full h-full p-20 flex flex-col gap-10 overflow-auto">
                <motion.div
                  variants={ProblemDescriptionAnimation}
                  initial="enter"
                  animate="animate"
                  className={`relative w-full px-5 py-10 lg:py-5 rounded-md backdrop-blur ring-2 ${ringColor} ring-offset-4 ring-offset-slate-900`}
                >
                  <h1>{currentProblemMetadata?.text}</h1>
                  <div
                    className={`absolute -top-4 -left-2 p-1 px-5 flex justify-center items-center ${bgColor} rounded-md`}
                  >
                    <span>설명</span>
                  </div>
                </motion.div>
                <motion.div
                  variants={ProblemDetailContainerAnimation}
                  initial="enter"
                  animate="animate"
                  className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
                >
                  <motion.div
                    variants={ProblemDetailItemAnimation}
                    className={`relative w-full px-5 py-10 lg:py-5 rounded-md backdrop-blur ring-2 ${ringColor} ring-offset-4 ring-offset-slate-900 flex justify-center items-center`}
                  >
                    <h1 className="text-4xl font-medium">
                      {convertLevelToTier(currentProblemMetadata?.level)}
                    </h1>
                    <div
                      className={`absolute -top-4 -left-2 p-1 px-5 flex justify-center items-center ${bgColor} rounded-md`}
                    >
                      <span>레벨</span>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={ProblemDetailItemAnimation}
                    className={`relative w-full px-5 py-10 lg:py-5 rounded-md backdrop-blur ring-2 ${ringColor} ring-offset-4 ring-offset-slate-900 flex justify-center items-center`}
                  >
                    <h1 className="text-4xl font-medium">
                      {currentProblemMetadata?.averageTries}
                    </h1>
                    <div
                      className={`absolute -top-4 -left-2 p-1 px-5 flex justify-center items-center ${bgColor} rounded-md`}
                    >
                      <span>평균 시도 횟수</span>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={ProblemDetailItemAnimation}
                    className={`relative w-full px-5 py-10 lg:py-5 rounded-md backdrop-blur ring-2 ${ringColor} ring-offset-4 ring-offset-slate-900 flex justify-center items-center`}
                  >
                    <h1 className="text-4xl font-medium">
                      {currentProblemMetadata?.acceptedUserCount}
                    </h1>
                    <div
                      className={`absolute -top-4 -left-2 p-1 px-5 flex justify-center items-center ${bgColor} rounded-md`}
                    >
                      <span>맞은 사람 수</span>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={ProblemDetailItemAnimation}
                    className={`relative w-full px-5 py-10 lg:py-5 rounded-md backdrop-blur ring-2 ${ringColor} ring-offset-4 ring-offset-slate-900`}
                  >
                    <a
                      className="w-full h-full flex justify-center items-center"
                      target={"_blank"}
                      rel="noreferrer"
                      href={currentProblemMetadata?.link}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 fill-white"
                        viewBox="0 0 20 20"
                        fill="currentolor"
                      >
                        C
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </a>

                    <div
                      className={`absolute -top-4 -left-2 p-1 px-5 flex justify-center items-center ${bgColor} rounded-md`}
                    >
                      <span>링크</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProblemDetail;
