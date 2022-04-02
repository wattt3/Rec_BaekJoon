import Container from "../components/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInnosoft } from "@fortawesome/free-brands-svg-icons";
import PageTitle from "../components/PageTitle";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../App";
import { useCombinedStateSelector } from "../redux/hook";

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
        {description.map((txt, descriptionIndex) => (
          <span key={descriptionIndex}>{txt}</span>
        ))}
      </motion.h1>
    </motion.section>
  );
};

const UserNameInput: React.FC = () => {
  const navigate = useNavigate();
  const [isPopUpHidden, setIsPopUpHidden] = useState(true);
  const [isHistoryClicked, setIsHistoryClicked] = useState(true);
  const expandedPopUp = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (event: any) => {
      if (
        expandedPopUp.current &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !(expandedPopUp.current as any).contains(event.target)
      ) {
        setIsPopUpHidden(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 팝업 없어지고 난 다음엔 unbind.
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expandedPopUp]);

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    const userName = (document.getElementById("user-name") as HTMLInputElement)
      .value as string;

    if (e.key != "Enter" || userName == "") {
      return;
    }
    console.log("user name: ", userName);
    return navigate(routes.PROBLEM_RECOMMEND);
  };

  const onClickHandler = () => {
    setIsPopUpHidden(false);
  };

  const historyUserName = useCombinedStateSelector(
    (state) => state.userState.historyUserNames
  );

  const historyUserNameButtons = historyUserName.map((userName, index) => {
    return <button key={index}>{userName}</button>;
  });

  const favoriteUserName = useCombinedStateSelector(
    (state) => state.userState.favoriteUserNames
  );

  const favoriteUserNameButtons = favoriteUserName.map((userName, index) => {
    return <button key={index}>{userName}</button>;
  });

  const historyOnClickHandler = () => {
    setIsHistoryClicked(true);
  };

  const favoriteOnClickHandler = () => {
    setIsHistoryClicked(false);
  };

  const renderPopUp = () => {
    const popUpStyle =
      "absolute top-8 w-full max-w-[60%] outline-none text-slate-700 text-left bg-white grid grid-cols-2 border-t border-gray-200 text-center z-10 shadow-xl";

    if (!isPopUpHidden && historyUserName.length == 0 && isHistoryClicked) {
      return (
        <div className={popUpStyle} ref={expandedPopUp}>
          <button className="py-2" onClick={historyOnClickHandler}>
            최근검색
          </button>
          <button
            className="py-2 bg-gray-200 text-gray-400"
            onClick={favoriteOnClickHandler}
          >
            즐겨찾기
          </button>
          <div className="text-center py-10 col-span-2 text-gray-400">
            최근에 검색한 이름이 없습니다.
          </div>
        </div>
      );
    }

    if (!isPopUpHidden && historyUserName.length != 0 && isHistoryClicked) {
      return (
        <div className={popUpStyle} ref={expandedPopUp}>
          <button className="py-2" onClick={historyOnClickHandler}>
            최근검색
          </button>
          <button
            className="py-2 bg-gray-200 text-gray-400"
            onClick={favoriteOnClickHandler}
          >
            즐겨찾기
          </button>
          {historyUserNameButtons}
        </div>
      );
    }

    if (!isPopUpHidden && favoriteUserName.length == 0 && !isHistoryClicked) {
      return (
        <div className={popUpStyle} ref={expandedPopUp}>
          <button
            className="py-2 bg-gray-200 text-gray-400"
            onClick={historyOnClickHandler}
          >
            최근검색
          </button>
          <button className="py-2" onClick={favoriteOnClickHandler}>
            즐겨찾기
          </button>
          <div className="text-center py-10 col-span-2 text-gray-400">
            즐겨찾기 해놓은 이름이 없습니다.
          </div>
        </div>
      );
    }

    if (!isPopUpHidden && favoriteUserName.length != 0 && !isHistoryClicked) {
      return (
        <div className={popUpStyle} ref={expandedPopUp}>
          <button
            className="py-2 bg-gray-200 text-gray-400"
            onClick={historyOnClickHandler}
          >
            최근검색
          </button>
          <button className="py-2" onClick={favoriteOnClickHandler}>
            즐겨찾기
          </button>
          {favoriteUserNameButtons}
        </div>
      );
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center mb-20">
      <input
        id="user-name"
        onKeyDown={onKeyDownHandler}
        onClick={onClickHandler}
        className="w-full max-w-[60%] px-3 py-1 outline-none text-slate-700 text-left"
        placeholder="백준아이디"
        required
      ></input>
      {renderPopUp()}
    </div>
  );
};

function Home() {
  const descriptionList = [
    ["백준의 문제들을 추천해 드립니다."],
    [
      "빅데이터를 활용하여",
      "여러분들 수준에 맞는 문제들을 ",
      "추천해 드립니다.",
    ],
    ["추천 문제들을 통해", "알고리즘 해결 능력을 기르세요!"],
  ];

  const HomeSequenceList = descriptionList.map((description, index) => {
    return (
      <HomeSequence
        id={index}
        description={description}
        key={index}
      ></HomeSequence>
    );
  });

  return (
    <Container>
      <PageTitle title="홈" />
      <main className="w-full max-w-screen-lg min-h-screen mx-auto flex flex-col items-center">
        <section className="mb-10">
          <FontAwesomeIcon
            className="text-[20rem] text-slate-700 mb-5"
            icon={faInnosoft}
          />
          <h1 className="text-5xl font-bold text-center">하루 백준</h1>
        </section>
        <UserNameInput />
        {HomeSequenceList}
      </main>
    </Container>
  );
}

export default Home;
