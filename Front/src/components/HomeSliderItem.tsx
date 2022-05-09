import React from "react";
import { ProblemCardColor } from "../libs/utils";

interface IHomeSliderItem {
  svg: () => JSX.Element;
  title: string;
  color: ProblemCardColor;
}

const HomeSliderItem: React.FC<IHomeSliderItem> = ({
  svg: SvgElement,
  title,
  color,
}) => {
  const svgColor =
    color === "indigo"
      ? "text-indigo-500"
      : color === "rose"
      ? "text-rose-500"
      : color === "slate"
      ? "text-slate-500"
      : "text-teal-500";
  return (
    <div className="w-96 h-full px-3">
      <div className="w-full h-full bg-slate-800 rounded-3xl flex flex-col justify-center gap-5 items-center shadow-2xl">
        <div className={`${svgColor}`}>
          <SvgElement />
        </div>
        <span className="text-3xl text-white font-semibold">{title}</span>
      </div>
    </div>
  );
};

export default HomeSliderItem;
