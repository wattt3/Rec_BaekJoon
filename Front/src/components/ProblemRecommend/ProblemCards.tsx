/* eslint-disable react/prop-types */
import { ProblemMetadata } from "../../redux/state";
import { motion, useAnimation } from "framer-motion";

import { useEffect } from "react";
import ProblemContainer from "./ProblemContainer";

interface IProblemCardContainer {
  problemMetaData: ProblemMetadata[];
  maxIndex: number;
  curIndex: number;
}

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
