import { Variants } from "framer-motion";

export const ProblemDescriptionAnimation: Variants = {
  enter: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      type: "spring",
      delay: 0.5,
    },
  },
};

export const ProblemDetailContainerAnimation: Variants = {
  enter: {},
  animate: {
    transition: {
      delayChildren: 1,
      staggerChildren: 0.2,
    },
  },
};

export const ProblemDetailItemAnimation: Variants = {
  enter: {
    opacity: 0,
    scale: 0,
    rotateZ: "90deg",
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateZ: 0,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
};
