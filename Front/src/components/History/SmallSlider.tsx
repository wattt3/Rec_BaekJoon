/* eslint-disable react/prop-types */
import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import { ISelectedHistory } from "../../routes/History";
import { useCombinedStateSelector } from "../../redux/hook";

interface ICard {
  username: string;
  selectedHistory: ISelectedHistory | null;
  setSelectedHistory: React.Dispatch<
    React.SetStateAction<ISelectedHistory | null>
  >;
}

// SmallSlider는 히스토리 페이지에서 불투명한 껍데기를 클릭하면 잠깐 보이는 문제 3개가 담긴 공간입니다.
// username은 말 그대로 유저에 대한 이름입니다
// selectedHistory는 클릭 후에 가운데로 이동 되면서 좀 더 큰 상태의 슬라이더를 선택할 때 사용 되는 변수입니다. state형태이고 그래서 setSelectedHistory가 같이 따라오고 있습니다.
//  재승님이 해주셔야 할 부분은 유저에게 추천한 문제의 정보 3개를 가져와 해당 문제들의 이름을 아래 더미 데이터에 넣어주시면 됩니다.

const SmallSlider: React.FC<ICard> = ({
  username,
  setSelectedHistory,
  selectedHistory,
}) => {
  // coverAnimation은 히스토리를 감싸고 있는 불투명한 판떼기를 움직이는 애니메이션 객체입니다.
  const coverAnimation = useAnimation();
  // animate 함수는 해당 껍데기를 아래로 내려주는 함수입니다. selectedHistory 값을 업데이트 해줌으로써 BigSlider가 튀어나오도록 합니다.
  const animate = async () => {
    await coverAnimation.start({
      y: "100%",
      transition: { type: "spring", duration: 0.7 },
    });
    setSelectedHistory({ username });
  };
  // unAnimate는 아래로 내려간 껍데기를 다시 원상복구 시켜주는 함수입니다.
  const unAnimate = () => {
    coverAnimation.start({
      y: 0,
      transition: { type: "spring", duration: 0.7, delay: 0.5 },
    });
  };

  // selectedHistory가 null이란 말은 유저가 BigSlider를 보다가 나온 것으로 unAnimate를 동작시켜 껍데기를 다시 원상복구 시켜줍니다.
  useEffect(() => {
    if (selectedHistory === null) {
      unAnimate();
    }
  }, [selectedHistory]);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const problemList = useCombinedStateSelector(
    (state) => state.userState.recommendProblemList
  ).find(
    (problemRelation) => problemRelation.userName == username
  )!.problemList;

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <motion.div
        layoutId={username}
        className="w-full h-full bg-slate-800 rounded-3xl relative overflow-hidden ring-4  ring-offset-4 ring-offset-slate-900 ring-slate-800"
      >
        {/* 여기에다가 특정 유저에게 추천한 문제중에 아무거나 3개 골라서 이름만 넣어주시면 될꺼 같습니다. */}
        <div className="w-full h-full p-10 grid grid-rows-3 grid-cols-1 gap-5 relative">
          <div className="w-full h-full rounded-3xl overflow-hidden">
            <div className="w-full h-full bg-indigo-600 flex justify-center items-center">
              <span className="font-semibold text-2xl text-white">
                {problemList[0].title}
              </span>
            </div>
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden">
            <div className="w-full h-full bg-rose-600 flex justify-center items-center">
              <span className="font-semibold text-2xl text-white">
                {problemList[1].title}
              </span>
            </div>
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden">
            <div className="w-full h-full bg-teal-600 flex justify-center items-center">
              <span className="font-semibold text-2xl text-white">
                {problemList[2].title}
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
      <div className="w-full p-5 bg-slate-800 rounded-md">
        <h1 className="text-white font-semibold text-center">{username}</h1>
      </div>
    </div>
  );
};
export default SmallSlider;
