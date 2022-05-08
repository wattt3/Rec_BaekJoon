import { useNavigate } from "react-router-dom";
import { routes } from "../App";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";

export default function NotFound() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate(routes.HOME);
  };
  return (
    <Container>
      <PageTitle title="존재하지 않는 페이지" />
      <div className="w-full h-screen flex justify-center items-center text-white flex-col">
        <h1 className="text-5xl font-semibold">404</h1>
        <h1 className="text-3xl font-semibold">존재하지 않는 페이지입니다.</h1>
        <button
          onClick={handleHome}
          className="bg-indigo-500 text-2xl p-3 px-5 mt-5 rounded-md"
        >
          돌아가기
        </button>
      </div>
    </Container>
  );
}
