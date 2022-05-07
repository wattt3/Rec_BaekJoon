import { Helmet } from "react-helmet";
import React from "react";

interface IPageTitle {
  title: string;
}

const PageTitle: React.FC<IPageTitle> = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | 프론트</title>
    </Helmet>
  );
};

export default PageTitle;
