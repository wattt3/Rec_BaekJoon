import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../components/Container";
import { useForm } from "react-hook-form";
import PageTitle from "../components/PageTitle";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

interface IForm {
  email: string;
  password: string;
}

const Join = () => {
  const { register } = useForm<IForm>();
  return (
    <Container customStyle="flex justify-center items-center">
      <PageTitle title="회원가입" />
      <main className="max-w-screen-lg  w-full h-[60vh] bg-slate-300 rounded-2xl overflow-hidden flex">
        <section className="w-[40%] h-full bg-slate-400 flex justify-center items-center flex-col gap-5">
          <FontAwesomeIcon
            className="text-[12rem] text-slate-700"
            icon={faUserCircle}
          />
          <span className="text-5xl font-semibold text-slate-700">
            회원가입
          </span>
        </section>
        <section className="w-[60%] h-full p-10">
          <form
            autoComplete="off"
            className="w-full h-full flex flex-col items-center justify-center gap-5 text-slate-700 text-lg"
          >
            <input
              {...register("email", { required: "이메일은 필수입니다." })}
              className="w-full p-5 outline-none rounded-2xl"
              placeholder="email"
              type="email"
              required
            />
            <input
              {...register("password", { required: "패스워드는 필수입니다." })}
              className="w-full p-5 outline-none rounded-2xl"
              type="password"
              placeholder="password"
              required
            />
            <button className="w-full p-3 bg-slate-400 rounded-2xl font-semibold">
              회원가입
            </button>
          </form>
        </section>
      </main>
    </Container>
  );
};

export default Join;
