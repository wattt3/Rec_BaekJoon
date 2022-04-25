import Container from "../components/Container";
export default function History() {
  return (
    <Container>
      <div className="max-w-screen-md mx-auto w-full min-h-screen flex flex-wrap justify-center items-center gap-5 pt-20 p-5">
        <div className="w-full h-96 rounded-md shadow-2xl bg-slate-800 relative flex overflow-hidden">
          <span className="absolute bottom-0 left-0 text-9xl font-semibold text-slate-900 p-3">
            1
          </span>
          <div className="w-1/4 h-full "></div>
          <div className="w-3/4 h-full flex flex-col justify-between items-center gap-5 p-5">
            <div className="w-full flex-1 bg-slate-900 rounded-md"></div>
            <button className="w-full p-3 bg-slate-900 text-white rounded-md">
              상세보기
            </button>
          </div>
        </div>
        <div className="w-[50%] h-48 rounded-md shadow-2xl bg-slate-800 relative flex overflow-hidden">
          <span className="absolute bottom-0 left-0 text-9xl font-semibold text-slate-900 p-3">
            1
          </span>
          <div className="w-1/3 h-full "></div>
          <div className="w-2/3 h-full flex flex-col justify-between items-center gap-5 p-5">
            <div className="w-full flex-1 bg-slate-900 rounded-3xl"></div>
            <button className="w-full p-3 bg-slate-900 text-white rounded-md">
              상세보기
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
