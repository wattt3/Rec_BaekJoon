/* eslint-disable react/prop-types */
import Container from "../components/Container";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import SmallSlider from "../components/History/SmallSlider";
import BigSlider from "../components/History/BigSlider";
import { useLocation, useMatch } from "react-router-dom";
import { routes } from "../App";
import ProblemDetail from "../components/ProblemDetail";

export interface ISelectedHistory {
  username: string;
}

export default function History() {
  // locatio으로 state에 있는 color 값을 추출하여 히스토리 페이지에서도 문제 디테일 컴포넌트를 동작할 수 있게 하고 있습니다.
  const location = useLocation();
  const locationState = location.state as any;
  // historyDetailMatch는 현재 문제 디테일을 꺼낸 상태인지를 URL로 판단하기 때문에 useMatch로 판단하고 있습니다.
  const historyDetailMatch = useMatch(routes.HISTORY_PROBLEM_DETAIL());
  // selectedHistory 스테이트는 특정 히스토리를 클릭하면 업데이트가 되는 값으로 해당 값이 업데이트가 되어야 가운데로 슬라이더가 이동 되고, 커지는 애니메이션이 정상적으로 동작합니다. 현재 내부에 username 밖에 가지고 있지 않지만, 후에 실질적인 데이터를 가지고 오게 된다면 더 커져야 할꺼 같습니다.
  const [selectedHistory, setSelectedHistory] =
    useState<ISelectedHistory | null>(null);

  // 히스토리를 클릭해서 BigSlider가 가운데로 오게 된다면, 오른쪽에 차지하고 있던 본문 페이지의 스크롤을 없애주는 effect 문입니다.
  useEffect(() => {
    if (selectedHistory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedHistory]);

  return (
    <Container>
      <div className="w-full min-h-screen pt-20 relative">
        <div className="w-full p-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-10">
          {/* 해당 부분에 지금은 더미 데이터가 들어가 있지만, 실제로는 리덕스에서 추천 받았던 모든 유저에 대한 정보를 담은 배열이 들어오면 됩니다. */}
          {[1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
            <motion.div key={i} className="w-full aspect-[1/1.5]">
              <SmallSlider
                selectedHistory={selectedHistory}
                setSelectedHistory={setSelectedHistory}
                username={`${i}번째 유저`}
              />
            </motion.div>
          ))}
        </div>
        {/* 유저가 특정 히스토리를 누르면 뚜겅이 내려가고 가운데로 오면서 주위 환경이 블러 처리되고, 집중하여 클릭한 히스토리를 볼 수 있게 해주는 부분. */}
        {selectedHistory ? (
          <aside className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center">
            <div
              onClick={() => setSelectedHistory(null)}
              className="w-full h-full backdrop-blur cursor-pointer"
            ></div>
            <motion.div
              layoutId={selectedHistory.username}
              className="absolute h-[80%] aspect-[1/1.5] flex flex-col gap-5 px-5"
            >
              {/* 크게 보는 화면의 슬라이더 역할을 하며,  */}
              <BigSlider maxIndex={3} />
            </motion.div>
          </aside>
        ) : null}
        <AnimatePresence>
          {historyDetailMatch && locationState.color ? (
            <ProblemDetail color={locationState.color} />
          ) : null}
        </AnimatePresence>
      </div>
    </Container>
  );
}
