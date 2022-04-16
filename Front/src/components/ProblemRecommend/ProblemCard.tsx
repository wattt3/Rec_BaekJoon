/* eslint-disable react/prop-types */
import { motion, Variants } from "framer-motion";

interface IProblemCard {
  title: string;
  tags: string[];
  cardAnimation: Variants;
  cardColor: "rose" | "teal" | "indigo" | "slate";
  index: number;
}

const ProblemCard: React.FC<IProblemCard> = ({
  title,
  tags,
  cardAnimation,
  cardColor,
  index,
}) => {
  const isBig = index % 3 === 1;
  const color =
    cardColor === "indigo"
      ? "indigo"
      : cardColor === "rose"
      ? "rose"
      : cardColor === "slate"
      ? "slate"
      : "teal";

  return (
    <motion.div
      initial="enter"
      whileInView={"animate"}
      viewport={{ once: true }}
      variants={cardAnimation}
      className={`w-full h-full flex gap-3 rounded-3xl overflow-hidden ${
        color === "rose"
          ? "bg-rose-600"
          : color === "indigo"
          ? "bg-indigo-600"
          : color === "teal"
          ? "bg-teal-600"
          : "bg-slate-600"
      } `}
    >
      <div
        className={`px-3  h-full flex items-end font-semibold ${
          isBig ? "text-9xl" : "text-8xl"
        }  ${
          color === "rose"
            ? "bg-rose-700"
            : color === "indigo"
            ? "bg-indigo-700"
            : color === "teal"
            ? "bg-teal-700"
            : "bg-slate-700"
        } ${
          color === "rose"
            ? "text-rose-900"
            : color === "indigo"
            ? "text-indigo-900"
            : color === "teal"
            ? "text-teal-900"
            : "text-slate-900"
        }`}
      >
        {index}
      </div>
      <div className="flex-1 h-full relative">
        <div className="w-full h-full flex flex-col justify-center items-center gap-10 ">
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
                className={`p-1 px-2 text-white shadow-inner rounded-md text-xs font-medium ${
                  color === "rose"
                    ? "bg-rose-700"
                    : color === "indigo"
                    ? "bg-indigo-700"
                    : color === "teal"
                    ? "bg-teal-700"
                    : "bg-slate-700"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProblemCard;
