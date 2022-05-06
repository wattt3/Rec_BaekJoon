/* eslint-disable react/prop-types */
import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import { ISelectedHistory } from "../../routes/History";

interface ICard {
  username: string;
  selectedHistory: ISelectedHistory | null;
  setSelectedHistory: React.Dispatch<
    React.SetStateAction<ISelectedHistory | null>
  >;
}

const SmallCard: React.FC<ICard> = ({
  username,
  setSelectedHistory,
  selectedHistory,
}) => {
  const coverAnimation = useAnimation();
  const animate = async () => {
    await coverAnimation.start({
      y: "100%",
      transition: { type: "spring", duration: 1 },
    });
    setSelectedHistory({ username });
  };
  const unAnimate = () => {
    coverAnimation.start({
      y: 0,
      transition: { type: "spring", duration: 1, delay: 0.5 },
    });
  };

  useEffect(() => {
    if (selectedHistory === null) {
      unAnimate();
    }
  }, [selectedHistory]);

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <motion.div
        layoutId={username}
        className="w-full h-full bg-slate-800 rounded-3xl relative overflow-hidden ring-4  ring-offset-4 ring-offset-slate-900 ring-slate-800"
      >
        <div className="w-full h-full p-10 grid grid-rows-3 grid-cols-1 gap-5 relative">
          <div className="w-full h-full rounded-3xl overflow-hidden">
            <div className="w-full h-full bg-indigo-600 flex justify-center items-center">
              <span className="font-semibold text-2xl text-white">
                문제 제목
              </span>
            </div>
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden">
            <div className="w-full h-full bg-rose-600 flex justify-center items-center">
              <span className="font-semibold text-2xl text-white">
                문제 제목
              </span>
            </div>
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden">
            <div className="w-full h-full bg-teal-600 flex justify-center items-center">
              <span className="font-semibold text-2xl text-white">
                문제 제목
              </span>
            </div>
          </div>
        </div>
        {/* 위로 올라오는 투명한 판떼기 */}
        <motion.div
          onClick={animate}
          animate={coverAnimation}
          className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center backdrop-blur-2xl cursor-pointer rounded-3xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[40%] aspect-square stroke-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <span className="px-5 text-2xl text-center font-semibold text-black">
            {username}
          </span>
        </motion.div>
      </motion.div>
      <div className="w-full p-5 bg-slate-800 rounded-md shadow-inner">
        <h1 className="text-white font-semibold text-center">{username}</h1>
      </div>
    </div>
  );
};
export default SmallCard;
