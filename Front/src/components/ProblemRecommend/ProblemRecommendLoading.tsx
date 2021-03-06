/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  LoadingContainerAnimation,
  LoadingGradientAnimation,
  LoadingTextAnimation,
} from "../../animations/problemRecommend";
import { routes } from "../../App";
import { useCombinedStateSelector } from "../../redux/hook";
import { setSearchState } from "../../redux/slices/problemRecommendSlice";
import { SearchState } from "../../redux/state";
import MovingGradient from "../MovingGradient";
import UserNameInput from "../UserNameInput";

interface IProblemRecommendLoading {
  searchState: SearchState;
}

const ProblemRecommendLoading: React.FC<IProblemRecommendLoading> = ({
  searchState,
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const currentUserName = useCombinedStateSelector(
    (state) => state.userState.currentUserName
  );

  const renderLoadingState = () => {
    if (searchState == SearchState.SUCCESS) {
      return (
        <motion.div
          key={"ready"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-full cursor-pointer flex flex-col gap-5 justify-center items-center p-5"
        >
          <h1 className="text-5xl text-white font-semibold text-center">
            준비가 되었습니다.
          </h1>
          <span className="text-lg text-white font-semibold">
            화면을 클릭해 주세요.
          </span>
        </motion.div>
      );
    } else if (searchState == SearchState.SEARCHING) {
      return (
        <motion.div
          key={"loading"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-5 justify-center items-center p-5"
        >
          <h1 className="text-5xl text-white font-semibold text-center">
            잠시만 기다려 주세요.
          </h1>
          <span className="text-lg text-white font-semibold">
            {currentUserName}님의 정보를 바탕으로 추천할 문제들을 준비하고
            있습니다.
          </span>
        </motion.div>
      );
    } else if (searchState == SearchState.UNKNOWN) {
      return (
        <motion.div
          key={"loading"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-5 justify-center items-center p-5"
        >
          <h1 className="text-5xl text-white font-semibold text-center">
            예상치 못한 오류가 발생하였습니다.
          </h1>
          <span className="text-lg text-white font-semibold">
            아이디를 다시 검색하여 주세요.
          </span>
          <Link to={routes.HOME} className="text-lg text-white font-semibold">
            돌아가기
          </Link>
        </motion.div>
      );
    } else if (searchState == SearchState.FAIL) {
      return (
        <motion.div
          key={"loading"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-5 justify-center items-center p-5"
        >
          <h1 className="text-5xl text-white font-semibold text-center">
            존재하지 않는 이름 : {currentUserName} 입니다.
          </h1>
          <span className="text-lg text-white font-semibold">
            다시 검색하여주세요.
          </span>
          <UserNameInput></UserNameInput>
        </motion.div>
      );
    }
  };

  return (
    <motion.div
      onClick={() => {
        if (searchState == SearchState.SUCCESS) {
          dispatch(setSearchState(SearchState.SHOW));
        }
      }}
      key={"nonClicked"}
      variants={LoadingContainerAnimation}
      initial="enter"
      animate="animate"
      exit={"exit"}
      className="w-full max-w-screen-sm aspect-square p-5"
    >
      <div className="w-full h-full ring-4 ring-offset-4 ring-slate-700 ring-offset-slate-900 bg-transparent rounded-3xl relative overflow-hidden">
        {/* 로딩 움직이는 그래디언트 */}
        <motion.div
          ref={container}
          variants={LoadingGradientAnimation}
          className="w-full h-full"
        >
          <MovingGradient
            width={container.current?.clientWidth || 0}
            height={container.current?.clientHeight || 0}
          />
        </motion.div>
        {/* 그래디언트 위에 올라올 텍스트 컨테이너 */}
        <motion.div
          variants={LoadingTextAnimation}
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center "
        >
          <AnimatePresence exitBeforeEnter>
            {renderLoadingState()}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProblemRecommendLoading;
