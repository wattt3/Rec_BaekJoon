import { Variants } from "framer-motion";

const ProblemCardStartTime = 1;
const ProblemCardDuration = 0.5;

export const LoadingContainerAnimation: Variants = {
  enter: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 1,
      delayChildren: 2,
      staggerChildren: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 1 },
  },
};

export const LoadingGradientAnimation: Variants = {
  enter: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

export const LoadingTextAnimation: Variants = {
  enter: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

export const ProblemCardLeftAnimation: Variants = {
  enter: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: ProblemCardStartTime,
      duration: ProblemCardDuration,
      type: "tween",
    },
  },
};

export const ProblemCardRightTopAnimation: Variants = {
  enter: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: ProblemCardStartTime + ProblemCardDuration * 1,
      duration: ProblemCardDuration,
      type: "tween",
    },
  },
};

export const ProblemCardRightBottomAnimation: Variants = {
  enter: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: ProblemCardStartTime + ProblemCardDuration * 2,
      duration: ProblemCardDuration,
      type: "tween",
    },
  },
};

export const ProblemCardLeftAnimationNoDelay: Variants = {
  enter: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0,
      duration: ProblemCardDuration,
      type: "tween",
    },
  },
};

export const ProblemCardRightTopAnimationNoDelay: Variants = {
  enter: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: ProblemCardDuration * 1,
      duration: ProblemCardDuration,
      type: "tween",
    },
  },
};

export const ProblemCardRightBottomAnimationNoDelay: Variants = {
  enter: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: ProblemCardDuration * 2,
      duration: ProblemCardDuration,
      type: "tween",
    },
  },
};

export const AsideProgressBarAnimation: Variants = {
  enter: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: ProblemCardStartTime,
      duration: 1,
      type: "spring",
    },
  },
};
