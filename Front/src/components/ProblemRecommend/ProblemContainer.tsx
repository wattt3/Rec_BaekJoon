/* eslint-disable react/prop-types */
import {
  ProblemCardLeftAnimation,
  ProblemCardLeftAnimationNoDelay,
  ProblemCardRightBottomAnimation,
  ProblemCardRightBottomAnimationNoDelay,
  ProblemCardRightTopAnimation,
  ProblemCardRightTopAnimationNoDelay,
} from "../../animations/problemRecommend";
import { ProblemMetadata } from "../../redux/state";
import ProblemCard from "./ProblemCard";

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
            problemMetadata={leftProblem}
            cardAnimation={
              index > 0
                ? ProblemCardLeftAnimationNoDelay
                : ProblemCardLeftAnimation
            }
            cardColor="indigo"
          />
        </div>
        {/* 오른쪽 카드 두개 */}
        <div className="w-1/2 h-full flex flex-col gap-10">
          {/* 오른쪽 카드 위쪽 */}
          <ProblemCard
            index={index * 3 + 2}
            problemMetadata={rightTopProblem}
            cardAnimation={
              index > 0
                ? ProblemCardRightTopAnimationNoDelay
                : ProblemCardRightTopAnimation
            }
            cardColor="rose"
          />
          {/* 오른쪽 카드 아래쪽 */}
          <ProblemCard
            index={index * 3 + 3}
            problemMetadata={rightBottomProblem}
            cardAnimation={
              index > 0
                ? ProblemCardRightBottomAnimationNoDelay
                : ProblemCardRightBottomAnimation
            }
            cardColor="teal"
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemContainer;
