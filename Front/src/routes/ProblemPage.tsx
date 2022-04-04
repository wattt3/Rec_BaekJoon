import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkUserNameRequest, checkUserNameResponse } from "../api/user";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import { useCombinedStateSelector } from "../redux/hook";
import { addUserName } from "../redux/slices/userSlice";

enum SearchState {
  SEARCHING,
  SUCESS,
  FAIL,
  UNKNOWN,
}

function ProblemPage() {
  const currentUserName = useCombinedStateSelector(
    (state) => state.userState.currentUserName
  );

  const [searchState, setSearchState] = useState(SearchState.SEARCHING);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUserName) {
      setSearchState(SearchState.UNKNOWN);
      return;
    }

    fetch("/api/user/check", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: currentUserName,
      } as checkUserNameRequest),
    })
      .then((response) => response.json())
      .then((response: checkUserNameResponse) => {
        if (response.err) {
          console.log(response.err);
          setSearchState(SearchState.UNKNOWN);
          return;
        }

        if (response.result) {
          dispatch(addUserName(currentUserName, /* isHistory */ true));

          // 여기에 문제를 검색하는 api가 들어와야함.

          setSearchState(SearchState.SUCESS);
        } else {
          setSearchState(SearchState.FAIL);
        }
      });
  }, []);

  return (
    <Container>
      <PageTitle title="추천 문제 검색" />
      <main className="mx-auto max-w-screen-lg w-full min-h-screen"></main>
    </Container>
  );
}
export default ProblemPage;
