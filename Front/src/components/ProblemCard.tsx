import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProblemCard {
  item: number;
}

const ProblemCard: React.FC<IProblemCard> = ({ item }) => {
  return (
    <div
      className="w-full lg:w-[40%] h-96 lg:app-store-view-first:w-[60%] lg:app-store-view-last:w-[60%] p-3 "
      key={item}
    >
      <div className="w-full h-full bg-slate-200 flex justify-center items-end shadow hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden hover:scale-105 transform relative group">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover object-center filter blur-sm group-hover:blur-none transition-all duration-300"
          alt="lorem picsum"
          src={`https://picsum.photos/500/500?random=${item + 1}`}
        />
        <div className="bg-slate-200 w-full rounded-2xl z-10 flex flex-col items-center overflow-hidden">
          <h1 className="w-full bg-slate-300 p-5 text-center font-semibold">
            추천 문제 {item + 1}
          </h1>
          <div className="w-full p-5 flex justify-center items-center gap-5">
            <button className="p-3 px-5 bg-slate-300 rounded-2xl">
              문제 풀기
            </button>
            <button className="p-3 px-5 bg-slate-300 rounded-2xl flex justify-center items-center gap-3 relative">
              <FontAwesomeIcon
                className="absolute top-0 right-0 -m-2 text-2xl text-slate-500"
                icon={faExclamationCircle}
              />
              문제 정보
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
