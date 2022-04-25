/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { AsideProgressBarAnimation } from "../../animations/problemRecommend";

interface IProblemAsideProgress {
  maxIndex: number;
  curIndex: number;
}

const ProblemAsideProgress: React.FC<IProblemAsideProgress> = ({
  maxIndex,
  curIndex,
}) => {
  return (
    <motion.aside
      variants={AsideProgressBarAnimation}
      initial="enter"
      animate="animate"
      className="fixed pt-20 top-0 right-0 p-3 h-full flex flex-col justify-around items-center"
    >
      {/* 프로그레스바 가운데 줄 */}
      <div className="absolute top-0 left-0 w-full h-full  flex justify-center items-center">
        <div className="w-[1px] h-full bg-slate-500 z-0" />
      </div>
      {/* 프로그레스 바 네모들 */}
      {Array.from(Array(maxIndex).keys()).map((_, i) => (
        <motion.div
          key={i}
          className={`w-5 aspect-square z-10 flex justify-center items-center bg-slate-700 rounded-sm`}
        >
          {i === curIndex ? (
            <motion.span
              layoutId={i === curIndex ? "filled" : undefined}
              className="w-3 aspect-square bg-white rounded-sm"
            ></motion.span>
          ) : null}
        </motion.div>
      ))}
    </motion.aside>
  );
};

export default ProblemAsideProgress;
