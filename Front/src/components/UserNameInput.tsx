import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../App";
import { useCombinedStateSelector } from "../redux/hook";
import { setSearchState } from "../redux/slices/problemRecommendSlice";
import { setCurrentUserName } from "../redux/slices/userSlice";
import { SearchState } from "../redux/state";

const PopupAnimation: Variants = {
  enter: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: "tween",
    },
  },
};

const UserNameInput: React.FC = () => {
  const navigate = useNavigate();
  const [isPopUpHidden, setIsPopUpHidden] = useState(true);
  const [isHistoryClicked, setIsHistoryClicked] = useState(true);
  const expandedPopUp = useRef(null);
  const borderAnimation = useAnimation();

  const dispatch = useDispatch();

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
    dispatch(setCurrentUserName(userName));
    return navigate(routes.PROBLEM_RECOMMEND);
  };

  const onClickHandler = () => {
    setIsPopUpHidden(false);
  };

  const historyUserName = useCombinedStateSelector(
    (state) => state.userState.historyUserNames
  );

  const historyUserNameButtons = historyUserName?.map((userName, index) => {
    return (
      <button
        key={index}
        onClick={() => {
          dispatch(setCurrentUserName(userName));
          navigate(routes.PROBLEM_RECOMMEND);
        }}
      >
        {userName}
      </button>
    );
  });

  const favoriteUserName = useCombinedStateSelector(
    (state) => state.userState.favoriteUserNames
  );

  const favoriteUserNameButtons = favoriteUserName?.map((userName, index) => {
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
      "absolute top-[100%] w-full outline-none text-slate-700 text-left bg-white grid grid-cols-2 border-t border-gray-200 text-center z-10 shadow-xl rounded-bl-md rounded-br-md";

    if (!isPopUpHidden && historyUserName.length == 0 && isHistoryClicked) {
      return (
        <motion.div
          variants={PopupAnimation}
          initial="enter"
          animate="animate"
          exit={"exit"}
          className={popUpStyle}
          ref={expandedPopUp}
        >
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
        </motion.div>
      );
    }

    if (!isPopUpHidden && historyUserName.length != 0 && isHistoryClicked) {
      return (
        <motion.div
          variants={PopupAnimation}
          initial="enter"
          animate="animate"
          exit={"exit"}
          className={popUpStyle}
          ref={expandedPopUp}
        >
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
        </motion.div>
      );
    }

    if (!isPopUpHidden && favoriteUserName.length == 0 && !isHistoryClicked) {
      return (
        <motion.div
          variants={PopupAnimation}
          initial="enter"
          animate="animate"
          exit={"exit"}
          className={popUpStyle}
          ref={expandedPopUp}
        >
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
        </motion.div>
      );
    }

    if (!isPopUpHidden && favoriteUserName.length != 0 && !isHistoryClicked) {
      return (
        <motion.div
          variants={PopupAnimation}
          initial="enter"
          animate="animate"
          exit={"exit"}
          className={popUpStyle}
          ref={expandedPopUp}
        >
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
        </motion.div>
      );
    }
  };

  useEffect(() => {
    if (!isPopUpHidden) {
      borderAnimation.start({
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      });
    } else {
      borderAnimation.start({
        borderBottomLeftRadius: "0.375rem",
        borderBottomRightRadius: "0.375rem",
      });
    }
  }, [isPopUpHidden]);

  return (
    <div className="relative w-full flex flex-col items-center">
      <motion.input
        animate={borderAnimation}
        id="user-name"
        onKeyDown={onKeyDownHandler}
        onClick={onClickHandler}
        className={`w-full p-3 outline-none rounded-md text-slate-700 text-left pr-14`}
        placeholder="백준아이디"
        required
      />
      <button className="absolute right-2 my-auto top-0 bottom-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 aspect-square fill-slate-500 hover:fill-indigo-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <AnimatePresence initial={false} exitBeforeEnter>
        {renderPopUp()}
      </AnimatePresence>
    </div>
  );
};

export default UserNameInput;
