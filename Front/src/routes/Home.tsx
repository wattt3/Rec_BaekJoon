/* eslint-disable react/prop-types */
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import Container from "../components/Container";
import HomeSliderItem from "../components/HomeSliderItem";
import {
  FingerPrintSvg,
  GlobeAltSvg,
  LinkSvg,
  MicrophoneSvg,
  PaperClipSvg,
} from "../components/Svgs";
import UserNameInput from "../components/UserNameInput";

const svgData = [
  FingerPrintSvg,
  GlobeAltSvg,
  LinkSvg,
  MicrophoneSvg,
  PaperClipSvg,
  FingerPrintSvg,
  GlobeAltSvg,
  LinkSvg,
  MicrophoneSvg,
  PaperClipSvg,
  FingerPrintSvg,
  GlobeAltSvg,
  LinkSvg,
  MicrophoneSvg,
  PaperClipSvg,
  FingerPrintSvg,
  GlobeAltSvg,
  LinkSvg,
  MicrophoneSvg,
  PaperClipSvg,
  FingerPrintSvg,
  GlobeAltSvg,
  LinkSvg,
  MicrophoneSvg,
  PaperClipSvg,
  FingerPrintSvg,
  GlobeAltSvg,
  LinkSvg,
  MicrophoneSvg,
  PaperClipSvg,
];

const DialogAnimation: Variants = {
  enter: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      type: "spring",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
      type: "spring",
    },
  },
};

const SequenceDialog = [
  ["하루", "백준"],
  [
    "하루백준은 백준에서 문제를 고르는데 어려움을 겪는 여러분들을 위해 태어났습니다.",
  ],
  [
    "하루 백준을 통해 백준에서 푼 문제를 바탕으로 새로운 문제를 추천 받아 보세요!",
  ],
  ["백준 아이디만 입력해 주시면 바로 사용할 수 있습니다!"],
];

function Home() {
  const [sequence, setSequence] = useState(0);
  const Dialog: React.FC<{ description: string[] }> = ({ description }) => {
    const handleSequence = () => {
      setSequence((prev) =>
        prev + 1 === SequenceDialog.length ? -1 : prev + 1
      );
    };
    return (
      <motion.div
        variants={DialogAnimation}
        initial="enter"
        animate="animate"
        exit="exit"
        className="w-full h-full flex justify-center items-center"
      >
        {sequence === 0 ? (
          <div className="space-y-5">
            <div
              onClick={handleSequence}
              className="flex justify-center items-center font-semibold text-7xl w-full cursor-pointer p-5  rounded-3xl hover:scale-110 transform transition-transform duration-300 "
            >
              <span className="text-indigo-400">하루</span>
              <span className="text-white font-semibold">백준</span>
            </div>
            <h1
              onClick={() => setSequence(-1)}
              className="text-2xl font-semibold text-white text-center cursor-pointer hover:underline"
            >
              스킵하기
            </h1>
          </div>
        ) : (
          <div
            className="cursor-pointer hover:scale-110 transform transition-transform duration-300"
            onClick={handleSequence}
          >
            {description.map((dialog) => (
              <h1
                key={dialog}
                className="text-3xl font-semibold text-white text-center"
              >
                {dialog}
              </h1>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <Container>
      <main className="w-full h-screen flex flex-col justify-center items-center overflow-hidden relative">
        <div className="w-full h-[60vh] overflow-hidden">
          <motion.div
            animate={{
              x: ["0%", "-80%"],
              transition: {
                duration: 60 * 2,
                type: "tween",
                repeat: Infinity,
              },
            }}
            style={{ width: `${24 * svgData.length}rem` }}
            className="h-full flex"
          >
            {svgData.map((_, i) => (
              <HomeSliderItem
                key={i}
                title={`문제 ${i + 1}`}
                svg={svgData[i]()}
              />
            ))}
          </motion.div>
        </div>
        <aside className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="w-full h-[70vh] flex justify-center items-center px-10">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 1, delay: 0.5, type: "spring" },
              }}
              className="max-w-screen-sm w-full h-full p-10 bg-transparent rounded-3xl flex flex-col justify-center  items-center ring-4 ring-slate-700 ring-offset-4 ring-offset-slate-900 backdrop-blur-sm overflow-hidden"
            >
              <AnimatePresence initial={false} exitBeforeEnter>
                {sequence === -1 ? (
                  <motion.div
                    variants={DialogAnimation}
                    initial="enter"
                    animate="animate"
                    exit="exit"
                    className="w-full h-full space-y-5"
                  >
                    <h1 className="text-center text-3xl font-semibold text-white">
                      아이디를 입력해 주세요!
                    </h1>
                    <form
                      autoComplete="off"
                      className="w-full flex flex-col items-center gap-3"
                    >
                      <UserNameInput />
                    </form>
                  </motion.div>
                ) : (
                  <Dialog
                    key={sequence}
                    description={SequenceDialog[sequence]}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </aside>
      </main>
    </Container>
  );
}

export default Home;
