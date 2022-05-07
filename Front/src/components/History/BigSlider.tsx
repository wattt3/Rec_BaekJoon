/* eslint-disable react/prop-types */
import { useAnimation, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInterval } from "../../libs/useInterval";
import { useCombinedStateSelector } from "../../redux/hook";
import HistoryProblemCard from "./HistoryProblemCard";

interface BigSlider {
  maxIndex: number;
  userName: string;
}

const BigSlider: React.FC<BigSlider> = ({ maxIndex, userName }) => {
  // sldierAnimation은 버튼을 누르면 슬라이더가 움직이게 해주는 애니메이션 객체입니다.
  const sliderAnimation = useAnimation();
  // containerRef는 해당 슬라이더의 3개의 문제를 담은 하나의 페이지의 크기를 측정하기 위해 사용하는 컨테이너 객체입니다.
  const containerRef = useRef<HTMLDivElement | null>(null);
  // scrollable은 스크롤을 한번에 여러번 하는 것을 막아주는 변수입니다. 일단은 슬라이딩 애니메이션을 보이게 하기 위해 슬라이딩 후에 1초 동안 딜레이를 걸어두었는데, 히스토리 페이지에서 슬라이드 움직이는 방식이 휠로 스크롤 하는 방식이 아니라 없애는 방법도 고려하고 있습니다.
  const [scrollable, setScrollable] = useState(true);
  // curIndex은 슬라이더에 현재 어느 페이지에 위치하고 있는지 알려주는 스테이트입니다.
  const [curIndex, setCurIndex] = useState(0);
  // containerHeight는 앞서 본 contaierRef의 height 값을 저장하는 스테이트입니다.
  const [containerHeight, setContainerHeight] = useState(0);

  // handleScroll은 스크롤을 발생 시키는 함수입니다. 스크롤이 불가능 하다면 함수는 그냥 종료 되고, 아니면 방향에 따라 curIndex가 변하게 됩니다. 해당 변화는 스크롤의 translateY 값을 변화 시키게 되어 결과적으로 슬라이더가 움직이게 됩니다.
  const handleScroll = (direction: "UP" | "DOWN") => {
    if (!scrollable) return;
    setScrollable((prev) => !prev);
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
  };

  //  스크롤을 한 후에 딜레이를 걸기 위해 사용하는 함수입니다.
  const toggleScrollable = useCallback(
    () => setScrollable((prev) => !prev),
    []
  );

  // 인터벌을 주어서 scrollable이 false면 1초 뒤에 해당 스테이트의 값을 반대로 바꿔줍니다.
  useInterval(toggleScrollable, !scrollable ? 1000 : null);

  // containerHeight가 존재하고, curIndex가 변화한다면 슬라이더의 translateY값을 변동 시켜 슬라이더를 움직이게 해주는 effect 문입니다.
  useEffect(() => {
    if (containerHeight > 0) {
      sliderAnimation.start({
        translateY: `-${curIndex * containerHeight}px`,
        transition: {
          duration: 1,
          type: "spring",
        },
      });
    }
  }, [curIndex, containerHeight]);

  // containerRef가 존재한다면 containerHeight 값을 업데이트 하는 effect 문입니다.
  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, [containerRef]);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const problemList = useCombinedStateSelector(
    (state) => state.userState.recommendProblemList
  ).find(
    (problemRelation) => problemRelation.userName == userName
  )!.problemList;

  const renderProblemCards = () => {
    const problemCards: JSX.Element[] = [];
    for (let index = 0; index + 2 < problemList.length; index = index + 3) {
      problemCards.push(
        <div
          key={index}
          style={{ height: `${containerHeight}px` }}
          className="w-full p-10 grid grid-rows-3 grid-cols-1 gap-5"
        >
          <HistoryProblemCard
            color="indigo"
            problemMetadata={problemList[index]}
            userName={userName}
          />
          <HistoryProblemCard
            color="rose"
            problemMetadata={problemList[index + 1]}
            userName={userName}
          />
          <HistoryProblemCard
            color="teal"
            problemMetadata={problemList[index + 2]}
            userName={userName}
          />
        </div>
      );
    }
    return problemCards;
  };

  return (
    <motion.div className="w-full h-full bg-slate-800 rounded-3xl overflow-hidden ring-4  ring-offset-4 ring-offset-slate-900 ring-slate-800">
      {/* slider container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden relative"
      >
        {/* 실질적인 아이템들이 담기는 곳으로 3개가 하나의 containerHeight 만큼을 가지게 되고, maxIndex 만큼 길이를 가지고 있습니다. */}
        <motion.div
          animate={sliderAnimation}
          style={{ height: `${containerHeight * maxIndex}px` }}
          className="w-full"
        >
          {renderProblemCards()}
        </motion.div>
        {/* 오른쪽에 있는 현재 어느 페이지에 있는지 확인 시켜주는 인디케이터 */}
        <aside className="absolute top-0 right-0 h-full p-3 flex flex-col justify-center items-center gap-3">
          {Array.from(Array(maxIndex).keys()).map((_, i) => (
            <span
              className={`w-2 aspect-square rounded-full ${
                curIndex === i ? "bg-white" : "bg-slate-500"
              }`}
              key={i}
            ></span>
          ))}
        </aside>
        {/* 슬라이더 조작에 필요한 위로 올라가는 버튼 */}
        <div className="absolute top-0 left-0 w-full flex justify-center items-center">
          <button
            onClick={() => handleScroll("UP")}
            className="opacity-10 hover:opacity-100 transition-opacity duration-300 bg-black rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 aspect-square fill-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {/* 슬라이더 조작에 필요한 아래로 내려가는 버튼 */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center items-center">
          <button
            onClick={() => handleScroll("DOWN")}
            className="opacity-10 hover:opacity-100 transition-opacity duration-300 bg-black rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 aspect-square fill-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BigSlider;
