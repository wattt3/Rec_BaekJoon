import { motion } from "framer-motion";
import UserNameInput from "../components/UserNameInput";

const svgDefaultStyle = `h-32 w-32 fill-indigo-500`;

const FingerPrintSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${svgDefaultStyle}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const GlobeAltSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${svgDefaultStyle}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const LinkSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${svgDefaultStyle}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const MicrophoneSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${svgDefaultStyle}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const PaperClipSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${svgDefaultStyle}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
        clipRule="evenodd"
      />
    </svg>
  );
};

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

const Item: React.FC<{ svg: React.ReactNode; title: string }> = ({
  // eslint-disable-next-line react/prop-types
  svg,
  // eslint-disable-next-line react/prop-types
  title,
}) => {
  return (
    <section className="w-96 h-full px-3">
      <div className="w-full h-full bg-slate-800 rounded-3xl flex flex-col justify-center gap-5 items-center shadow-2xl">
        <div>{svg}</div>
        <span className="text-3xl text-white font-semibold">{title}</span>
      </div>
    </section>
  );
};

function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      <header className="fixed top-0 left-0 w-full text-white flex gap-10 items-center py-5 px-20  z-[99] bg-slate-900">
        <div className="text-3xl font-bold mr-10 ">
          <span className="text-indigo-500">하루</span>
          <span className="text-white">백준</span>
        </div>
        <span className="text-slate-500 hover:text-white cursor-pointer">
          문제 추천
        </span>
        <span className="text-slate-500 hover:text-white cursor-pointer">
          히스토리
        </span>
      </header>
      <main className="w-full h-screen flex flex-col justify-center items-center overflow-hidden relative">
        <div className="w-full h-[60vh] overflow-hidden">
          <motion.div
            animate={{
              x: ["0%", "-90%"],
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
              <Item key={i} title={`문제 ${i + 1}`} svg={svgData[i]()} />
            ))}
          </motion.div>
        </div>
        <aside className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="w-full h-[80vh] flex justify-center items-center px-10">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 1, delay: 0.5, type: "spring" },
              }}
              className="max-w-screen-sm w-full h-full p-10  bg-transparent rounded-3xl flex flex-col items-center gap-5 ring-4 ring-slate-700 ring-offset-4 ring-offset-slate-900 backdrop-blur-sm"
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
          </div>
        </aside>
      </main>
    </div>
  );
}

export default Home;
