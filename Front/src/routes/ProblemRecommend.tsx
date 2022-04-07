import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetProblemRequest, GetProblemResponse } from "../api/problem";
import { checkUserNameRequest, checkUserNameResponse } from "../api/user";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import UserNameInput from "../components/UserNameInput";
import { useCombinedStateSelector } from "../redux/hook";
import { addUserName } from "../redux/slices/userSlice";

enum SearchState {
  SEARCHING,
  SUCESS,
  FAIL,
  UNKNOWN,
}

function ProblemRecommend() {
  const currentUserName = useCombinedStateSelector(
    (state) => state.userState.currentUserName
  );

  const renderInput = () => {
    if (!currentUserName) {
      return <UserNameInput />;
    } else {
      return null;
    }
  };

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
          fetch("/api/problem/get", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName: currentUserName,
            } as GetProblemRequest),
          })
            .then((response) => response.json())
            .then((response: GetProblemResponse) => {
              if (response.err) {
                console.log(response.err);
                setSearchState(SearchState.UNKNOWN);
                return;
              }
              console.log("problems : ", response.problems);
              setSearchState(SearchState.SUCESS);
            });
        } else {
          setSearchState(SearchState.FAIL);
        }
      });
  }, []);

  return (
    <Container>
      <PageTitle title="문제 추천" />
      <main className="mx-auto max-w-screen-lg w-full min-h-screen">
        {renderInput()}
      </main>
    </Container>
  );
}
export default ProblemRecommend;
