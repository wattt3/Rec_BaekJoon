import { Helmet } from "react-helmet";
import React from "react";

interface IPageTitle {
  title: string;
}

const PageTitle: React.FC<IPageTitle> = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | 하루백준</title>
    </Helmet>
  );
};

export default PageTitle;
