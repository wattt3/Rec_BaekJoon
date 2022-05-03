import Container from "../components/Container";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const Card: React.FC = () => {
  const coverAnimation = useAnimation();
  const [isClicked, setIsClicked] = useState(false);
  const animate = async () => {
    await coverAnimation.start({
      y: "100%",
      transition: { duration: 1, type: "spring" },
    });
  };
  const unanimate = async () => {
    await coverAnimation.start({
      y: 0,
      transition: { duration: 1, type: "spring" },
    });
  };
  const handleClick = () => setIsClicked((prev) => !prev);
  useEffect(() => {
    if (isClicked) {
      animate();
    } else {
      unanimate();
    }
  }, [isClicked]);
  return (
    <div className="w-full aspect-[1/1.5]">
      <motion.div className="w-full h-full bg-slate-800 rounded-3xl relative overflow-hidden ring-2  ring-offset-4 ring-offset-slate-900 ring-slate-800">
        <div
          onClick={handleClick}
          className="w-full h-full p-5 grid grid-rows-3 grid-cols-1 gap-5"
        >
          <div className="w-full h-full rounded-3xl overflow-hidden">
            <div className="w-full h-full bg-indigo-500 flex justify-center items-center">
              <span className="font-semibold text-2xl text-white">
                문제 제목
              </span>
            </div>
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden">
            <div className="w-full h-full bg-rose-500 flex justify-center items-center">
              <span className="font-semibold text-2xl text-white">
                문제 제목
              </span>
            </div>
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden">
            <div className="w-full h-full bg-teal-500 flex justify-center items-center">
              <span className="font-semibold text-2xl text-white">
                문제 제목
              </span>
            </div>
          </div>
        </div>
        <motion.div
          onClick={handleClick}
          animate={coverAnimation}
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur   cursor-pointer rounded-3xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[40%] aspect-square stroke-slate-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          {/* <h1 className="w-full text-3xl font-semibold text-white p-5 bg-slate-900 text-center break-words transform skew-y-6">
            엄청긴유저이름을입력하는중입니다.
          </h1> */}
        </motion.div>
      </motion.div>
      <div className="w-full mt-5 p-5 bg-slate-800 shadow-inner rounded-md flex justify-center items-center ring ring-slate-800 ring-offset-4 ring-offset-slate-900">
        <span className="text-base text-white font-semibold break-words text-center">
          엄청긴유저이름을입력하는중입니다. 문제 제목 문제 제목
        </span>
      </div>
    </div>
  );
};

export default function History() {
  return (
    <Container>
      <div className="w-full min-h-screen pt-20">
        <div className="w-full p-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
          {[1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
            <Card key={i} />
          ))}
        </div>
      </div>
    </Container>
  );
}
