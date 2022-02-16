import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../components/Container";
import { faInnosoft } from "@fortawesome/free-brands-svg-icons";
import ProblemCard from "../components/ProblemCard";
import PageTitle from "../components/PageTitle";

const ProblemRecommend = () => {
  return (
    <Container>
      <PageTitle title="문제 추천" />
      <main className="mx-auto max-w-screen-lg w-full min-h-screen">
        <div className="p-5 w-full flex flex-wrap">
          {Array.from(Array(30).keys()).map((item) => {
            return <ProblemCard item={item} />;
          })}
        </div>
      </main>
    </Container>
  );
};

export default ProblemRecommend;
