/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetProblemRequest, GetProblemResponse } from "../api/problem";
import { CheckUserNameRequest, CheckUserNameResponse } from "../api/user";
import RippleMosaic from "../components/RippleMosaic/index";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import { useCombinedStateSelector } from "../redux/hook";
import { AnimatePresence } from "framer-motion";
import { useInterval } from "../libs/useInterval";
import ProblemCards from "../components/ProblemRecommend/ProblemCards";
import ProblemAsideProgress from "../components/ProblemRecommend/ProblemAsideProgress";
import ProblemRecommendLoading from "../components/ProblemRecommend/ProblemRecommendLoading";
import { addUserName, addRecommendProblem } from "../redux/slices/userSlice";
import { useLocation, useMatch } from "react-router-dom";
import { routes } from "../App";
import ProblemDetail from "../components/ProblemDetail";
import { ProblemMetadata, SearchState } from "../redux/state";
import { setSearchState } from "../redux/slices/problemRecommendSlice";
import StaticMosaic from "../components/StaticMosaic";

function ProblemRecommend() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isDetailPage = useMatch(routes.PROBLEM_DETAIL());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const locationState = location.state as any;

  // 현재 드래그가 가능한지 아닌지를 판단하는 스테이트입니다.
  const [draggable, setDraggable] = useState(false);

  // maxIndex에 대한 현재 인덱스 스테이트입니다.
  const [curIndex, setCurIndex] = useState(0);

  // 리플 모자이크 최적화 스테이트
  const [isRippleRun, setIsRippleRun] = useState(true);

  const currentUserName = useCombinedStateSelector(
    (state) => state.userState.currentUserName
  );

  const searchState = useCombinedStateSelector(
    (state) => state.problemRecommendState.searchState
  );

  const maxIndex = useCombinedStateSelector(
    (state) => state.problemRecommendState.maxProblemNumPerPage
  );

  const recommendProblemList = useCombinedStateSelector(
    (state) => state.userState.recommendProblemList
  );

  // 휠 이벤트 핸들러입니다.
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (isDetailPage) return;
      if (draggable) {
        setDraggable(false);
        const direction = e.deltaY > 0 ? "DOWN" : "UP";
        if (maxIndex > 0) {
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
    [draggable, isDetailPage]
  );

  const renderContainer = (searchState: SearchState) => {
    if (searchState == SearchState.SHOW) {
      return (
        <div className="w-full h-screen" key={"clicked"}>
          {/* 바둑판 배경 */}
          {isRippleRun ? <RippleMosaic delay={0.5} /> : <StaticMosaic />}
          <div className="absolute top-0 left-0 w-full h-screen overflow-hidden">
            {/* 문제 카드들 한 페이지당 3개씩 넣어둠. */}
            <ProblemCards curIndex={curIndex} maxIndex={maxIndex} />
            {/* 문제 리스트에 옆에 달려있는 페이지 프로그레스 바 */}
            <ProblemAsideProgress maxIndex={maxIndex} curIndex={curIndex} />
            <AnimatePresence>
              {isDetailPage && locationState?.color ? (
                <ProblemDetail color={locationState.color} />
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      );
    } else {
      return <ProblemRecommendLoading searchState={searchState} />;
    }
  };

  // 드래그를 1초에 한번씩 할 수 있게 하는 인터벌 내부에 들어가는 핸들러입니다.
  const handleRippleRun = useCallback(() => {
    setIsRippleRun((prev) => !prev);
  }, [setIsRippleRun]);

  // 드래그를 1초에 한번씩 할 수 있게 하는 인터벌 내부에 들어가는 핸들러입니다.
  const handleDragable = useCallback(() => {
    setDraggable((prev) => !prev);
  }, [setDraggable]);

  // 드래그를 1초에 한번씩만 할 수 있게 하는 코드입니다.
  useInterval(handleDragable, !draggable ? 1000 : null);

  useInterval(
    handleRippleRun,
    searchState === SearchState.SHOW && isRippleRun ? 3000 : null
  );

  // 페이지 전체에 휠 이벤트를 거는 코드입니다.
  useEffect(() => {
    window.addEventListener("wheel", handleWheel, false);
    return () => {
      window.removeEventListener("wheel", handleWheel, false);
    };
  }, [handleWheel]);

  useEffect(() => {
    if (!currentUserName) {
      dispatch(setSearchState(SearchState.UNKNOWN));
      return;
    }

    if (searchState != SearchState.PRESEARCH) {
      return;
    }

    if (
      recommendProblemList
        .map((problemRelation) => problemRelation.userName)
        .includes(currentUserName)
    ) {
      dispatch(setSearchState(SearchState.SUCCESS));
      return;
    }

    fetch("/api/user/check/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: currentUserName,
      } as CheckUserNameRequest),
    })
      .then((response) => response.json())
      .then((response: CheckUserNameResponse) => {
        if (response.err) {
          console.log(response.err);
          dispatch(setSearchState(SearchState.UNKNOWN));
          return;
        }

        if (response.result) {
          dispatch(addUserName(currentUserName, /* isHistory */ true));

          // 여기에 문제를 검색하는 api가 들어와야함.
          fetch("/api/problem/get/", {
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
                dispatch(setSearchState(SearchState.UNKNOWN));
                return;
              }
              const typedProblemsInResponse = () => {
                return [...response.problems].map((problem) => {
                  return {
                    problemId: problem.problemId,
                    title: problem.title,
                    level: problem.level,
                    averageTries: problem.averageTries,
                    acceptedUserCount: problem.acceptedUserCount,
                    tags: problem.tags,
                    link: problem.link,
                    text: problem.text,
                  } as ProblemMetadata;
                });
              };

              dispatch(
                addRecommendProblem(currentUserName, typedProblemsInResponse())
              );
              dispatch(setSearchState(SearchState.SUCCESS));
            })
            .catch((err) => {
              console.log(err);
              dispatch(setSearchState(SearchState.UNKNOWN));
            });
        } else {
          dispatch(setSearchState(SearchState.FAIL));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(setSearchState(SearchState.UNKNOWN));
      });
  }, [searchState]);

  return (
    <Container>
      <PageTitle title="문제 추천" />
      <main className="w-full h-screen flex justify-center items-center pt-20 overflow-hidden">
        <AnimatePresence exitBeforeEnter>
          {renderContainer(searchState)}
        </AnimatePresence>
      </main>
    </Container>
  );
}
export default ProblemRecommend;
