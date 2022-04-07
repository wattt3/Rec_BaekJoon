import React from "react";

interface IContainer {
  customStyle?: string;
}

const Container: React.FC<IContainer> = ({ children, customStyle }) => {
  return (
    <div className={`min-h-screen bg-slate-900 ${customStyle}`}>{children}</div>
  );
};

export default Container;
