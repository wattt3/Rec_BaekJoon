import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import ProblemContainer from "./ProblemContainer";

interface IProblemCardContainer {
  maxIndex: number;
  curIndex: number;
}

const ProblemCards: React.FC<IProblemCardContainer> = ({
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
