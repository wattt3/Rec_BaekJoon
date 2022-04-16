/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetProblemRequest, GetProblemResponse } from "../api/problem";
import { checkUserNameRequest, checkUserNameResponse } from "../api/user";
import ColorExtract from "../components/ColorExtract/index";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import UserNameInput from "../components/UserNameInput";
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

enum SearchState {
  // 검색 중
  SEARCHING,

  // 검색 성공
  SUCESS,

  // 존재하지 않는 이름
  FAIL,

  // 그 외의 오류
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

    fetch("/joljack-front/api/user/check", {
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
          fetch("joljack-front/api/problem/get", {
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
              setSearchState(SearchState.SUCESS);
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

  const [isReady, setIsReady] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [draggable, setDraggable] = useState(false);
  const [maxIndex, setMaxIndex] = useState(0);
  const [curIndex, setCurIndex] = useState(0);

  const handleDragable = useCallback(() => {
    setDraggable((prev) => !prev);
  }, [setDraggable]);

  const handleClickToBreak = useCallback(() => {
    if (isReady) {
      setMaxIndex(4);
      setIsClicked((prev) => !prev);
    }
  }, [isReady]);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (draggable) {
        setDraggable(false);
        const direction = e.deltaY > 0 ? "DOWN" : "UP";
        if (maxIndex) {
          switch (direction) {
            case "UP":
              if (curIndex > 0) {
                setCurIndex((prev) => (prev === 0 ? 0 : prev - 1));
              }
              break;
            case "DOWN":
              if (curIndex < maxIndex - 1) {
                setCurIndex((prev) =>
                  prev === maxIndex - 1 ? maxIndex - 1 : prev + 1
                );
              }
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
              {/* 바둑판 배경 */}
              <ColorExtract delay={0.5} />
              <div className="absolute top-0 left-0 w-full h-screen overflow-hidden">
                {/* 문제 카드들 한 페이지당 3개씩 넣어둠. */}
                <ProblemCards
                  curIndex={curIndex}
                  maxIndex={maxIndex}
                  problemData={[]}
                />
                {/* 문제 리스트에 옆에 달려있는 페이지 프로그레스 바 */}
                <ProblemAsideProgress maxIndex={maxIndex} curIndex={curIndex} />
              </div>
            </div>
          ) : (
            <ProblemRecommendLoading
              isReady={isReady}
              handleClickToBreak={handleClickToBreak}
            />
          )}
        </AnimatePresence>
      </main>
    </Container>
  );
}
export default ProblemRecommend;
