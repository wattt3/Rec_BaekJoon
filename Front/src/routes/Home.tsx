import Container from "../components/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInnosoft } from "@fortawesome/free-brands-svg-icons";
import PageTitle from "../components/PageTitle";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../App";

interface IHomeSequence {
  id: number;
  description: string[];
}

const HomeSequence: React.FC<IHomeSequence> = ({ description, id }) => {
  return (
    <motion.section className="w-full h-[80vh] rounded-2xl shadow-md flex justify-center items-center overflow-hidden relative">
      <img
        draggable={false}
        className="w-full h-full object-cover object-center filter blur-sm"
        src={`https://picsum.photos/500/500?random=${id}`}
      />
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "0px 0px -40% 0px", once: true }}
        transition={{ duration: 0.5, type: "tween" }}
        className="absolute text-5xl w-full font-semibold p-5 bg-black text-slate-200 shadow-2xl flex flex-col items-center"
      >
        {description.map((txt) => (
          <span>{txt}</span>
        ))}
      </motion.h1>
    </motion.section>
  );
};

const UserNameInput: React.FC = () => {
  const navigate = useNavigate();

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key != "Enter") {
      return;
    }
    const userName = (document.getElementById("user-name") as HTMLInputElement)
      .value as string;
    console.log("user name: ", userName);
    return navigate(routes.PROBLEM_RECOMMEND);
  };

  return (
    <input
      id="user-name"
      onKeyDown={onKeyDownHandler}
      className="w-full px-3 py-1 outline-none text-slate-700 text-center"
      placeholder="백준아이디"
      required
    ></input>
  );
};

function Home() {
  return (
    <Container>
      <PageTitle title="홈" />
      <main className="w-full max-w-screen-lg min-h-screen mx-auto flex flex-col items-center gap-[10rem] p-10">
        <section>
          <FontAwesomeIcon
            className="text-[20rem] text-slate-700 mb-5"
            icon={faInnosoft}
          />
          <h1 className="text-5xl font-bold">백준 문제 추천</h1>
        </section>
        <UserNameInput />
        <HomeSequence
          id={0}
          description={["백준의 문제들을 추천해 드립니다."]}
        />
        <HomeSequence
          id={1}
          description={[
            "빅데이터를 활용하여",
            "여러분들 수준에 맞는 문제들을 ",
            "추천해 드립니다.",
          ]}
        />
        <HomeSequence
          id={2}
          description={["추천 문제들을 통해", "알고리즘 해결 능력을 기르세요!"]}
        />
      </main>
    </Container>
  );
}

export default Home;
