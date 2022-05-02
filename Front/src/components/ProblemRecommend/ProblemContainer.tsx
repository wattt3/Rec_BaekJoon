/* eslint-disable react/prop-types */
import {
  ProblemCardLeftAnimation,
  ProblemCardLeftAnimationNoDelay,
  ProblemCardRightBottomAnimation,
  ProblemCardRightBottomAnimationNoDelay,
  ProblemCardRightTopAnimation,
  ProblemCardRightTopAnimationNoDelay,
} from "../../animations/problemRecommend";
import { useCombinedStateSelector } from "../../redux/hook";
import ProblemCard from "./ProblemCard";

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
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemContainer;
