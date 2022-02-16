import React from "react";

interface IContainer {
  customStyle?: string;
}

const Container: React.FC<IContainer> = ({ children, customStyle }) => {
  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-slate-200 to-slate-400 pt-20 p-5  ${customStyle}`}
    >
      {children}
    </div>
  );
};

export default Container;
