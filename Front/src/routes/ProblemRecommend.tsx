/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { GetProblemRequest, GetProblemResponse } from "../api/problem";
import { checkUserNameRequest, checkUserNameResponse } from "../api/user";
import ColorExtract from "../components/ColorExtract/index";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import UserNameInput from "../components/UserNameInput";
import { useCombinedStateSelector } from "../redux/hook";
import { addUserName } from "../redux/slices/userSlice";
import { motion, Variants, AnimatePresence, useAnimation } from "framer-motion";
import MovingGradient from "../components/MovingGradient";
import { useInterval } from "../libs/useInterval";
import ProblemCard from "../components/ProblemCard";
//@ts-ignore

const LoadingContainerAnimation: Variants = {
  enter: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 1,
      delayChildren: 2,
      staggerChildren: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 1 },
  },
};

const LoadingGradientAnimation: Variants = {
  enter: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const LoadingTextAnimation: Variants = {
  enter: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const ProblemCardStartTime = 1;
const ProblemCardDuration = 0.5;

const ProblemCardLeftAnimation: Variants = {
  enter: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: ProblemCardStartTime,
      duration: ProblemCardDuration,
      type: "tween",
    },
  },
};

const ProblemCardRightTopAnimation: Variants = {
  enter: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: ProblemCardStartTime + ProblemCardDuration * 1,
      duration: ProblemCardDuration,
      type: "tween",
    },
  },
};

const ProblemCardRightBottomAnimation: Variants = {
  enter: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: ProblemCardStartTime + ProblemCardDuration * 2,
      duration: ProblemCardDuration,
      type: "tween",
    },
  },
};

enum SearchState {
  SEARCHING,
  SUCESS,
  FAIL,
  UNKNOWN,
}

function ProblemRecommend() {
  const currentUserName = useCombinedStateSelector(
    (state) => state.userState.currentUserName
  );

  const renderInput = () => {
    if (!currentUserName) {
      return <UserNameInput />;
    } else {
      return null;
    }
  };

  const [searchState, setSearchState] = useState(SearchState.SEARCHING);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUserName) {
      setSearchState(SearchState.UNKNOWN);
      return;
    }

    fetch("/api/user/check", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: currentUserName,
      } as checkUserNameRequest),
    })
      .then((response) => response.json())
      .then((response: checkUserNameResponse) => {
        if (response.err) {
          console.log(response.err);
          setSearchState(SearchState.UNKNOWN);
          return;
        }

        if (response.result) {
          dispatch(addUserName(currentUserName, /* isHistory */ true));

          // 여기에 문제를 검색하는 api가 들어와야함.
          fetch("/api/problem/get", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName: currentUserName,
            } as GetProblemRequest),
          })
            .then((response) => response.json())
            .then((response: GetProblemResponse) => {
              if (response.err) {
                console.log(response.err);
                setSearchState(SearchState.UNKNOWN);
                return;
              }
              console.log("problems : ", response.problems);
              setSearchState(SearchState.SUCESS);
            });
        } else {
          setSearchState(SearchState.FAIL);
        }
      });
  }, []);

  const [isReady, setIsReady] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [draggable, setDraggable] = useState(false);
  const [maxIndex, setMaxIndex] = useState(4);
  const [curIndex, setCurIndex] = useState(0);
  const scrollContainerAnimation = useAnimation();

  const handleDragable = useCallback(() => {
    setDraggable((prev) => !prev);
  }, [setDraggable]);

  const handleClickToBreak = () => {
    if (isReady) {
      setIsClicked((prev) => !prev);
    }
  };

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (draggable) {
        setDraggable(false);
        const direction = e.deltaY > 0 ? "DOWN" : "UP";
        if (maxIndex) {
          switch (direction) {
            case "UP":
              setCurIndex((prev) => (prev === 0 ? 0 : prev - 1));
              break;
            case "DOWN":
              setCurIndex((prev) =>
                prev === maxIndex - 1 ? maxIndex - 1 : prev + 1
              );
              break;
          }
        }
      } else {
        console.log("blocking wheel");
      }
    },
    [draggable]
  );

  useInterval(
    () => {
      setIsReady((prev) => !prev);
    },
    isReady ? null : 1000 * 8
  );
  useInterval(handleDragable, isClicked && !draggable ? 1000 : null);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, false);
    return () => {
      window.removeEventListener("wheel", handleWheel, false);
    };
  }, [handleWheel]);

  useEffect(() => {
    scrollContainerAnimation.start({
      translateY: `-${curIndex * 100}vh`,
      transition: { duration: 1, type: "spring" },
    });
  }, [curIndex]);

  return (
    <Container>
      <PageTitle title="문제 추천" />
      {/* <main className="mx-auto max-w-screen-lg w-full min-h-screen">
        {renderInput()}
      </main> */}
      <main className="w-full min-h-screen flex justify-center items-center">
        <AnimatePresence exitBeforeEnter>
          {isClicked ? (
            <div className="w-full h-screen fixed top-0 left-0" key={"clicked"}>
              <ColorExtract delay={0.5} />
              <div className="absolute top-0 left-0 w-full h-screen overflow-hidden">
                {/* 스크롤 컨테이너 */}
                <motion.div
                  animate={scrollContainerAnimation}
                  style={{ height: `${maxIndex * 100}vh` }}
                  className="w-full"
                >
                  {/* 스크롤 컴포넌트 */}
                  <div className="w-full h-screen flex justify-center items-center">
                    <div className="max-w-screen-lg w-full h-[70vh] p-5 px-10 flex gap-10">
                      {/* 왼쪽 큰 카드 */}
                      <div className="w-1/2 h-full">
                        <ProblemCard
                          index={1}
                          cardAnimation={ProblemCardLeftAnimation}
                          cardColor="indigo"
                          tags={["태그1", "태그2", "태그3", "태그4"]}
                          title="문제 제목"
                        />
                      </div>
                      {/* 오른쪽 카드 두개 */}
                      <div className="w-1/2 h-full flex flex-col gap-10">
                        {/* 오른쪽 카드 위쪽 */}
                        <ProblemCard
                          index={2}
                          cardAnimation={ProblemCardRightTopAnimation}
                          cardColor="rose"
                          tags={["태그1", "태그2", "태그3", "태그4"]}
                          title="문제 제목"
                        />
                        {/* 오른쪽 카드 아래쪽 */}
                        <ProblemCard
                          index={3}
                          cardAnimation={ProblemCardRightBottomAnimation}
                          cardColor="teal"
                          tags={["태그1", "태그2", "태그3", "태그4"]}
                          title="문제 제목"
                        />
                      </div>
                    </div>
                  </div>
                  {/* 스크롤 컴포넌트 */}
                  <div className="w-full h-screen flex justify-center items-center">
                    <div className="max-w-screen-lg w-full h-[70vh] p-5 px-10 flex gap-10">
                      {/* 왼쪽 큰 카드 */}
                      <div className="w-1/2 h-full">
                        <ProblemCard
                          index={4}
                          cardAnimation={ProblemCardLeftAnimation}
                          cardColor="indigo"
                          tags={["태그1", "태그2", "태그3", "태그4"]}
                          title="문제 제목"
                        />
                      </div>
                      {/* 오른쪽 카드 두개 */}
                      <div className="w-1/2 h-full flex flex-col gap-10">
                        {/* 오른쪽 카드 위쪽 */}
                        <ProblemCard
                          index={5}
                          cardAnimation={ProblemCardRightTopAnimation}
                          cardColor="rose"
                          tags={["태그1", "태그2", "태그3", "태그4"]}
                          title="문제 제목"
                        />
                        {/* 오른쪽 카드 아래쪽 */}
                        <ProblemCard
                          index={6}
                          cardAnimation={ProblemCardRightBottomAnimation}
                          cardColor="teal"
                          tags={["태그1", "태그2", "태그3", "태그4"]}
                          title="문제 제목"
                        />
                      </div>
                    </div>
                  </div>
                  {/* 스크롤 컴포넌트 */}
                  <div className="w-full h-screen flex justify-center items-center">
                    <div className="max-w-screen-lg w-full h-[70vh] p-5 px-10 flex gap-10">
                      {/* 왼쪽 큰 카드 */}
                      <div className="w-1/2 h-full">
                        <ProblemCard
                          index={7}
                          cardAnimation={ProblemCardLeftAnimation}
                          cardColor="indigo"
                          tags={["태그1", "태그2", "태그3", "태그4"]}
                          title="문제 제목"
                        />
                      </div>
                      {/* 오른쪽 카드 두개 */}
                      <div className="w-1/2 h-full flex flex-col gap-10">
                        {/* 오른쪽 카드 위쪽 */}
                        <ProblemCard
                          index={8}
                          cardAnimation={ProblemCardRightTopAnimation}
                          cardColor="rose"
                          tags={["태그1", "태그2", "태그3", "태그4"]}
                          title="문제 제목"
                        />
                        {/* 오른쪽 카드 아래쪽 */}
                        <ProblemCard
                          index={9}
                          cardAnimation={ProblemCardRightBottomAnimation}
                          cardColor="teal"
                          tags={["태그1", "태그2", "태그3", "태그4"]}
                          title="문제 제목"
                        />
                      </div>
                    </div>
                  </div>
                  {/* 스크롤 컴포넌트 */}
                  <div className="w-full h-screen flex justify-center items-center">
                    <div className="max-w-screen-lg w-full h-[70vh] p-5 px-10 flex gap-10">
                      {/* 왼쪽 큰 카드 */}
                      <div className="w-1/2 h-full">
                        <ProblemCard
                          index={10}
                          cardAnimation={ProblemCardLeftAnimation}
                          cardColor="indigo"
                          tags={["태그1", "태그2", "태그3", "태그4"]}
                          title="문제 제목"
                        />
                      </div>
                      {/* 오른쪽 카드 두개 */}
                      <div className="w-1/2 h-full flex flex-col gap-10">
                        {/* 오른쪽 카드 위쪽 */}
                        <ProblemCard
                          index={11}
                          cardAnimation={ProblemCardRightTopAnimation}
                          cardColor="rose"
                          tags={["태그1", "태그2", "태그3", "태그4"]}
                          title="문제 제목"
                        />
                        {/* 오른쪽 카드 아래쪽 */}
                        <ProblemCard
                          index={12}
                          cardAnimation={ProblemCardRightBottomAnimation}
                          cardColor="teal"
                          tags={["태그1", "태그2", "태그3", "태그4"]}
                          title="문제 제목"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.aside
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="fixed pt-20 top-0 right-0 p-3 h-full flex flex-col justify-around items-center"
                >
                  <div className="absolute top-0 left-0 w-full h-full  flex justify-center items-center">
                    <div className="w-[1px] h-full bg-slate-500 z-0"></div>
                  </div>
                  {Array.from(Array(maxIndex).keys()).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-3 aspect-square z-10 ${
                        i === curIndex ? "bg-slate-200" : "bg-slate-500"
                      }`}
                    ></motion.div>
                  ))}
                </motion.aside>
              </div>
            </div>
          ) : (
            <motion.div
              onClick={handleClickToBreak}
              key={"nonClicked"}
              variants={LoadingContainerAnimation}
              initial="enter"
              animate="animate"
              exit={"exit"}
              className="w-full max-w-screen-sm h-[70vh] ring-4 ring-offset-4 ring-slate-700 ring-offset-slate-900 bg-transparent rounded-3xl overflow-hidden relative shadow-2xl"
            >
              <motion.div
                variants={LoadingGradientAnimation}
                className="w-full h-full"
              >
                <MovingGradient />
              </motion.div>
              <motion.div
                variants={LoadingTextAnimation}
                className="absolute top-0 left-0 w-full h-full flex justify-center items-center "
              >
                <AnimatePresence exitBeforeEnter>
                  {isReady ? (
                    <motion.div
                      key={"ready"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
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
                  ) : (
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
                        xxx님의 정보를 바탕으로 추천할 문제들을 준비하고
                        있습니다.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </Container>
  );
}
export default ProblemRecommend;
