interface IHomeSliderItem {
  svg: React.ReactNode;
  title: string;
}

// eslint-disable-next-line react/prop-types
const HomeSliderItem: React.FC<IHomeSliderItem> = ({ svg, title }) => {
  return (
    <div className="w-96 h-full px-3">
      <div className="w-full h-full bg-slate-800 rounded-3xl flex flex-col justify-center gap-5 items-center shadow-2xl">
        <div>{svg}</div>
        <span className="text-3xl text-white font-semibold">{title}</span>
      </div>
    </div>
  );
};

export default HomeSliderItem;
