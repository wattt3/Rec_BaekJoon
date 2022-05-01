import React from "react";
import Header from "./Header";

interface IContainer {
  customStyle?: string;
}

const Container: React.FC<IContainer> = ({ children, customStyle }) => {
  return (
    <div
      className={`min-h-screen bg-slate-900 ${customStyle ? customStyle : ""}`}
    >
      <Header />
      {children}
    </div>
  );
};

export default Container;
