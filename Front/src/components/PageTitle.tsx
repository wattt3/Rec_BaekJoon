import { Helmet } from "react-helmet";

interface IPageTitle {
  title: string;
}

// eslint-disable-next-line react/prop-types
const PageTitle: React.FC<IPageTitle> = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | 프론트</title>
    </Helmet>
  );
};

export default PageTitle;
