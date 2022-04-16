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
  problemData: ProblemMetadata[];
  maxIndex: number;
  curIndex: number;
}

interface IProblemContainer {
  index: number;
}

const ProblemContainer: React.FC<IProblemContainer> = ({ index }) => {
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
            tags={["태그1", "태그2", "태그3", "태그4"]}
            title="문제 제목"
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
            tags={["태그1", "태그2", "태그3", "태그4"]}
            title="문제 제목"
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
            tags={["태그1", "태그2", "태그3", "태그4"]}
            title="문제 제목"
          />
        </div>
      </div>
    </div>
  );
};

const ProblemCards: React.FC<IProblemCardContainer> = ({
  problemData,
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
        <ProblemContainer key={i} index={i} />
      ))}
    </motion.div>
  );
};
export default ProblemCards;
