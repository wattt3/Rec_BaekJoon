/* eslint-disable react/prop-types */
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { routes } from "../../App";
import { colorApply, ProblemCardColor } from "../../libs/utils";

interface IProblemCard {
  title: string;
  tags: string[];
  cardAnimation: Variants;
  cardColor: ProblemCardColor;
  index: number;
  problemId: number;
}

const ProblemCard: React.FC<IProblemCard> = ({
  title,
  tags,
  cardAnimation,
  cardColor,
  index,
  problemId,
}) => {
  const navigate = useNavigate();
  const isBig = index % 3 === 1;

  const showDetail = () => {
    navigate(routes.PROBLEM_DETAIL(problemId), { state: { color: cardColor } });
  };

  const bgColor =
    cardColor === "indigo"
      ? "bg-indigo-600"
      : cardColor === "rose"
      ? "bg-rose-600"
      : cardColor === "slate"
      ? "bg-slate-600"
      : "bg-teal-600";

  const darkerBgColor =
    cardColor === "indigo"
      ? "bg-indigo-700"
      : cardColor === "rose"
      ? "bg-rose-700"
      : cardColor === "slate"
      ? "bg-slate-700"
      : "bg-teal-700";

  const textColor =
    cardColor === "indigo"
      ? "text-indigo-900"
      : cardColor === "rose"
      ? "text-rose-900"
      : cardColor === "slate"
      ? "text-slate-900"
      : "text-teal-900";

  return bgColor && darkerBgColor && textColor ? (
    <motion.div
      initial="enter"
      whileInView={"animate"}
      viewport={{ once: true }}
      variants={cardAnimation}
      onClick={showDetail}
      className={`w-full h-full flex relative rounded-3xl overflow-hidden cursor-pointer ${bgColor}`}
    >
      <motion.div
        className={`px-3 flex items-end justify-end h-full font-semibold ${
          isBig ? "text-9xl" : "text-8xl"
        }  ${darkerBgColor} ${textColor}`}
      >
        {index}
      </motion.div>
      <div className="flex-1 h-full">
        <div className="w-full h-full flex flex-col justify-center items-center gap-10 relative">
          <h1
            className={`${
              isBig ? "text-6xl" : "text-5xl"
            } font-semibold text-white`}
          >
            {title}
          </h1>
          <div className="absolute bottom-0 left-0 w-full flex justify-center items-center gap-2 flex-wrap p-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`p-1 px-2 text-white shadow-inner rounded-md text-xs font-medium ${darkerBgColor}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  ) : null;
};

export default ProblemCard;
