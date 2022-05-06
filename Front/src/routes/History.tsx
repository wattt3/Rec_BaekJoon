/* eslint-disable react/prop-types */
import Container from "../components/Container";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SmallCard from "../components/History/SmallCard";
import BigCard from "../components/History/BigCard";

export interface ISelectedHistory {
  username: string;
}

export default function History() {
  const [selectedHistory, setSelectedHistory] =
    useState<ISelectedHistory | null>(null);

  useEffect(() => {
    if (selectedHistory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedHistory]);
  return (
    <Container>
      <div className="w-full min-h-screen pt-20">
        <div className="w-full p-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-10">
          {[1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
            <motion.div key={i} className="w-full aspect-[1/1.5]">
              <SmallCard
                selectedHistory={selectedHistory}
                setSelectedHistory={setSelectedHistory}
                username={`${i}번째 유저`}
              />
            </motion.div>
          ))}
        </div>
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
              <BigCard maxIndex={3} />
            </motion.div>
          </aside>
        ) : null}
      </div>
    </Container>
  );
}
