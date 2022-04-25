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
            problemId={leftProblem ? leftProblem.problemId : 1}
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
            problemId={rightTopProblem ? rightTopProblem.problemId : 2}
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
            problemId={rightBottomProblem ? rightBottomProblem.problemId : 3}
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

export default ProblemContainer;
