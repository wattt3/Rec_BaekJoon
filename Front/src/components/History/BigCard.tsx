/* eslint-disable react/prop-types */
import { useAnimation, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInterval } from "../../libs/useInterval";

interface IBigCard {
  maxIndex: number;
}

const BigCard: React.FC<IBigCard> = ({ maxIndex }) => {
  // const dragabble = useRef(true);
  // const [draggable, setDraggable] = useState(true);
  const [scrollable, setScrollable] = useState(true);
  const sliderAnimation = useAnimation();
  const [curIndex, setCurIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  const handleScroll = (direction: "UP" | "DOWN") => {
    if (!scrollable) return;
    setScrollable((prev) => !prev);
    switch (direction) {
      case "UP":
        setCurIndex((prev) => (prev === 0 ? 0 : prev - 1));
        break;
      case "DOWN":
        setCurIndex((prev) =>
          prev === maxIndex - 1 ? maxIndex - 1 : prev + 1
        );
        break;
    }
  };

  const toggleScrollable = useCallback(
    () => setScrollable((prev) => !prev),
    []
  );

  useInterval(toggleScrollable, !scrollable ? 1000 : null);

  // const handleInterval = useCallback(() => {
  //   setDraggable((prev) => !prev);
  // }, []);

  // const handleWheel = ({ deltaY }: WheelEvent) => {
  //   if (draggable) {
  //     setDraggable(false);
  //     if (deltaY > 0) {
  //       console.log("down");
  //       setCurIndex((prev) => {
  //         return prev === maxIndex - 1 ? maxIndex - 1 : prev + 1;
  //       });
  //     } else {
  //       console.log("up");
  //       setCurIndex((prev) => {
  //         return prev === 0 ? 0 : prev - 1;
  //       });
  //     }
  //   }
  // };

  // useInterval(handleInterval, !draggable ? 1000 : null);

  // useEffect(() => {
  //   window.addEventListener("wheel", handleWheel);
  //   return () => {
  //     window.removeEventListener("wheel", handleWheel);
  //   };
  // }, []);

  useEffect(() => {
    if (containerHeight > 0) {
      sliderAnimation.start({
        translateY: `-${curIndex * containerHeight}px`,
        transition: {
          duration: 1,
          type: "spring",
        },
      });
    }
  }, [curIndex, containerHeight]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, [containerRef]);

  return (
    <motion.div className="w-full h-full bg-slate-800 rounded-3xl overflow-hidden ring-4  ring-offset-4 ring-offset-slate-900 ring-slate-800">
      {/* slider container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden relative"
      >
        {/* slider items */}
        <motion.div
          animate={sliderAnimation}
          style={{ height: `${containerHeight * maxIndex}px` }}
          className="w-full"
        >
          {Array.from(Array(maxIndex).keys()).map((_, i) => (
            <div
              key={i}
              style={{ height: `${containerHeight}px` }}
              className="w-full  p-10 grid grid-rows-3 grid-cols-1 gap-5"
            >
              <div className="w-full h-full rounded-3xl overflow-hidden">
                <div className="w-full h-full bg-indigo-600 flex justify-center items-center">
                  <span className="font-semibold text-2xl text-white">
                    문제 제목 {i}
                  </span>
                </div>
              </div>
              <div className="w-full h-full rounded-3xl overflow-hidden">
                <div className="w-full h-full bg-rose-600 flex justify-center items-center">
                  <span className="font-semibold text-2xl text-white">
                    문제 제목 {i}
                  </span>
                </div>
              </div>
              <div className="w-full h-full rounded-3xl overflow-hidden">
                <div className="w-full h-full bg-teal-600 flex justify-center items-center">
                  <span className="font-semibold text-2xl text-white">
                    문제 제목 {i}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        <aside className="absolute top-0 right-0 h-full p-3 flex flex-col justify-center items-center gap-3">
          {Array.from(Array(maxIndex).keys()).map((_, i) => (
            <span
              className={`w-2 aspect-square rounded-full ${
                curIndex === i ? "bg-white" : "bg-slate-500"
              }`}
              key={i}
            ></span>
          ))}
        </aside>
        {/* control buttons */}
        <div className="absolute top-0 left-0 w-full flex justify-center items-center">
          <button
            onClick={() => handleScroll("UP")}
            className="opacity-10 hover:opacity-100 transition-opacity duration-300 bg-black rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 aspect-square fill-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full flex justify-center items-center">
          <button
            onClick={() => handleScroll("DOWN")}
            className="opacity-10 hover:opacity-100 transition-opacity duration-300 bg-black rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 aspect-square fill-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BigCard;
