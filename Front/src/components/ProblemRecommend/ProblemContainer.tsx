/* eslint-disable react/prop-types */
import {
  ProblemCardLeftAnimation,
  ProblemCardLeftAnimationNoDelay,
  ProblemCardRightBottomAnimation,
  ProblemCardRightBottomAnimationNoDelay,
  ProblemCardRightTopAnimation,
  ProblemCardRightTopAnimationNoDelay,
} from "../../animations/problemRecommend";
import ProblemCard from "./ProblemCard";

interface IProblemContainer {
  index: number;
}

const ProblemContainer: React.FC<IProblemContainer> = ({ index }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center pt-20">
      <div className="max-w-screen-lg w-full h-full p-5 px-10 grid grid-cols-1 grid-rows-3 lg:grid-cols-2 lg:grid-rows-2 gap-5">
        {/* 왼쪽 큰 카드 */}
        <div className="w-full h-full lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3">
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
        <div className="w-full h-full lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2">
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
        </div>
        <div className="w-full h-full lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3">
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
