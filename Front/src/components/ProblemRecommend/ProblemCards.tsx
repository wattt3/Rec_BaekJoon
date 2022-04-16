/* eslint-disable react/prop-types */
import { ProblemMetadata } from "../../redux/state";
import ProblemCard from "./ProblemCard";
import { motion, useAnimation } from "framer-motion";
import {
  ProblemCardLeftAnimation,
  ProblemCardLeftAnimationNoDelay,
  ProblemCardRightBottomAnimation,
  ProblemCardRightBottomAnimationNoDelay,
  ProblemCardRightTopAnimation,
  ProblemCardRightTopAnimationNoDelay,
} from "../../animations/problemRecommend";
import { useEffect } from "react";

interface IProblemCardContainer {
  problemMetaData: ProblemMetadata[];
  maxIndex: number;
  curIndex: number;
}

interface IProblemContainer {
  index: number;
  problemMetaData: ProblemMetadata[];
}

const ProblemContainer: React.FC<IProblemContainer> = ({
  index,
  problemMetaData,
}) => {
  const leftProblem = problemMetaData[0];
  const rightTopProblem = problemMetaData[1];
  const rightBottomProblem = problemMetaData[2];
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-screen-lg w-full h-[70vh] p-5 px-10 flex gap-10">
        {/* 왼쪽 큰 카드 */}
        <div className="w-1/2 h-full">
          <ProblemCard
            index={index * 3 + 1}
            cardAnimation={
              index > 0
                ? ProblemCardLeftAnimationNoDelay
                : ProblemCardLeftAnimation
            }
            cardColor="indigo"
            tags={
              leftProblem
                ? leftProblem.tags
                : ["태그1", "태그2", "태그3", "태그4"]
            }
            title={leftProblem ? leftProblem.title : "문제 제목"}
          />
        </div>
        {/* 오른쪽 카드 두개 */}
        <div className="w-1/2 h-full flex flex-col gap-10">
          {/* 오른쪽 카드 위쪽 */}
          <ProblemCard
            index={index * 3 + 2}
            cardAnimation={
              index > 0
                ? ProblemCardRightTopAnimationNoDelay
                : ProblemCardRightTopAnimation
            }
            cardColor="rose"
            tags={
              rightTopProblem
                ? rightTopProblem.tags
                : ["태그1", "태그2", "태그3", "태그4"]
            }
            title={rightTopProblem ? rightTopProblem.title : "문제 제목"}
          />
          {/* 오른쪽 카드 아래쪽 */}
          <ProblemCard
            index={index * 3 + 3}
            cardAnimation={
              index > 0
                ? ProblemCardRightBottomAnimationNoDelay
                : ProblemCardRightBottomAnimation
            }
            cardColor="teal"
            tags={
              rightBottomProblem
                ? rightBottomProblem.tags
                : ["태그1", "태그2", "태그3", "태그4"]
            }
            title={rightBottomProblem ? rightBottomProblem.title : "문제 제목"}
          />
        </div>
      </div>
    </div>
  );
};

const ProblemCards: React.FC<IProblemCardContainer> = ({
  problemMetaData,
  maxIndex,
  curIndex,
}) => {
  const scrollContainerAnimation = useAnimation();
  useEffect(() => {
    scrollContainerAnimation.start({
      translateY: `-${curIndex * 100}vh`,
      transition: { duration: 1, type: "spring" },
    });
  }, [curIndex]);

  return (
    <motion.div
      animate={scrollContainerAnimation}
      style={{ height: `${maxIndex * 100}vh` }}
      className="w-full"
    >
      {Array.from(Array(maxIndex).keys()).map((_, i) => (
        <ProblemContainer
          problemMetaData={problemMetaData.slice(i, i * 3 + 3)}
          key={i}
          index={i}
        />
      ))}
    </motion.div>
  );
};
export default ProblemCards;
