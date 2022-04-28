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
import {
  addUserName,
  setRecommendProblemMetadatas,
} from "../redux/slices/userSlice";
import { useLocation, useMatch } from "react-router-dom";
import { routes } from "../App";
import ProblemDetail from "../components/ProblemDetail";
import { SearchState } from "../redux/state";

function ProblemRecommend() {
  const currentUserName = useCombinedStateSelector(
    (state) => state.userState.currentUserName
  );

  const [searchState, setSearchState] = useState<SearchState>(
    SearchState.PRESEARCH
  );

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
      } as CheckUserNameRequest),
    })
      .then((response) => response.json())
      .then((response: CheckUserNameResponse) => {
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
              console.log("problems : ", response.problems.length);
              dispatch(setRecommendProblemMetadatas([...response.problems]));
              setSearchState(SearchState.SUCCESS);
            })
            .catch((err) => {
              console.log(err);
              setSearchState(SearchState.UNKNOWN);
            });
        } else {
          setSearchState(SearchState.FAIL);
        }
      })
      .catch((err) => {
        console.log(err);
        setSearchState(SearchState.UNKNOWN);
      });
  }, []);

  const location = useLocation();
  // isClicked는 로딩이 완료 된 후, 유저가 클릭을 했는지 안했는지 판단하는 스테이트입니다.
  const [isClicked, setIsClicked] = useState(false);
  // 현재 드래그가 가능한지 아닌지를 판단하는 스테이트입니다.
  const [draggable, setDraggable] = useState(false);
  // 전체 데이터를 한 페이지당 3개씩 넣어줄 경우에 최대 페이지에 대한 스테이트입니다.
  const [maxIndex, setMaxIndex] = useState(0);
  // maxIndex에 대한 현재 인덱스 스테이트입니다.
  const [curIndex, setCurIndex] = useState(0);

  // 드래그를 1초에 한번씩 할 수 있게 하는 인터벌 내부에 들어가는 핸들러입니다.
  const handleDragable = useCallback(() => {
    setDraggable((prev) => !prev);
  }, [setDraggable]);

  // 로딩때 로딩이 완료 된 상태에서 화면을 클릭하면 발생하는 이벤트 핸들러입니다.
  // maxIndex를 여기서 설정해주시면 되고, isClicked 스테이트가 변경 되어야 다음 단계로 넘어갈 수 있습니다.
  const handleClickToBreak = useCallback(() => {
    if (searchState == SearchState.SUCCESS) {
      setMaxIndex(4);
      setIsClicked((prev) => !prev);
    }
  }, [isClicked]);

  // 휠 이벤트 핸들러입니다.
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

  // 드래그를 1초에 한번씩만 할 수 있게 하는 코드입니다.
  useInterval(handleDragable, isClicked && !draggable ? 1000 : null);

  // 페이지 전체에 휠 이벤트를 거는 코드입니다.
  useEffect(() => {
    window.addEventListener("wheel", handleWheel, false);
    return () => {
      window.removeEventListener("wheel", handleWheel, false);
    };
  }, [handleWheel]);

  const isDetailPage = useMatch(routes.PROBLEM_DETAIL());
  const locationState = location.state as any;
  console.log(locationState?.color, isDetailPage);
  const problemMetadatas = useCombinedStateSelector(
    (state) => state.userState.recommendProblemsOfCurrentUser
  );

  return (
    <Container>
      <PageTitle title="문제 추천" />
      <main className="w-full min-h-screen flex justify-center items-center">
        <AnimatePresence exitBeforeEnter>
          {isClicked ? (
            <div className="w-full h-screen fixed top-0 left-0" key={"clicked"}>
              {/* 바둑판 배경 */}
              <RippleMosaic delay={0.5} />
              <div className="absolute top-0 left-0 w-full h-screen overflow-hidden">
                {/* 문제 카드들 한 페이지당 3개씩 넣어둠. */}
                <ProblemCards
                  curIndex={curIndex}
                  maxIndex={maxIndex}
                  problemMetadatas={problemMetadatas}
                />
                {/* 문제 리스트에 옆에 달려있는 페이지 프로그레스 바 */}
                <ProblemAsideProgress maxIndex={maxIndex} curIndex={curIndex} />
                <AnimatePresence>
                  {locationState?.color && isDetailPage ? (
                    <ProblemDetail color={locationState.color} />
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <ProblemRecommendLoading
              searchState={searchState}
              handleClickToBreak={handleClickToBreak}
            />
          )}
        </AnimatePresence>
      </main>
    </Container>
  );
}
export default ProblemRecommend;
