import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, ProblemMetadata } from "../state";

interface addUserNameAction {
  userName: string;
  isHistory: boolean;
}

interface deleteUserNameAction {
  userName: string;
  isHistory: boolean;
}

interface ClickUserInputButtonAction {
  userName: string;
  isHistory: boolean;
}

const userSlice = createSlice({
  name: "USER",
  initialState: {
    favoriteUserNames: [],
    historyUserNames: [],
    currentUserName: undefined,
    recommendProblemsOfCurrentUser: [],
  } as UserState,
  reducers: {
    addUserName: {
      reducer: (state, action: PayloadAction<addUserNameAction>) => {
        if (action.payload.isHistory) {
          const historyUserNames = [...state.historyUserNames];
          if (!historyUserNames.includes(action.payload.userName)) {
            historyUserNames.push(action.payload.userName);
          }
          return {
            ...state,
            historyUserNames: historyUserNames,
          };
        } else {
          const favoriteUserNames = [...state.favoriteUserNames];
          if (!favoriteUserNames.includes(action.payload.userName)) {
            favoriteUserNames.push(action.payload.userName);
          }
          return {
            ...state,
            favoriteUserNames: favoriteUserNames,
          };
        }
      },
      prepare: (userName: string, isHistory: boolean) => {
        return { payload: { userName, isHistory } };
      },
    },
    deleteUserName: {
      reducer: (state, action: PayloadAction<deleteUserNameAction>) => {
        if (action.payload.isHistory) {
          let historyUserNames = [...state.historyUserNames];
          if (!historyUserNames.includes(action.payload.userName)) {
            historyUserNames = historyUserNames.splice(
              historyUserNames.indexOf(action.payload.userName),
              1
            );
          }
          return {
            ...state,
            historyUserNames,
          };
        } else {
          let favoriteUserNames = [...state.favoriteUserNames];
          if (!favoriteUserNames.includes(action.payload.userName)) {
            favoriteUserNames = favoriteUserNames.splice(
              favoriteUserNames.indexOf(action.payload.userName),
              1
            );
          }
          return {
            ...state,
            favoriteUserNames,
          };
        }
      },
      prepare: (userName: string, isHistory: boolean) => {
        return { payload: { userName, isHistory } };
      },
    },
    clickUserInputButton: {
      reducer: (state, action: PayloadAction<ClickUserInputButtonAction>) => {
        const historyUserNames = [...state.historyUserNames];
        const favoriteUserNames = [...state.favoriteUserNames];
        if (
          action.payload.isHistory &&
          historyUserNames.includes(action.payload.userName)
        ) {
          historyUserNames.splice(
            historyUserNames.indexOf(action.payload.userName),
            1
          );
          return {
            ...state,
            historyUserNames,
          };
        }
        if (
          action.payload.isHistory &&
          !historyUserNames.includes(action.payload.userName)
        ) {
          historyUserNames.push(action.payload.userName);
          return {
            ...state,
            historyUserNames,
          };
        }
        if (
          !action.payload.isHistory &&
          favoriteUserNames.includes(action.payload.userName)
        ) {
          favoriteUserNames.splice(
            favoriteUserNames.indexOf(action.payload.userName),
            1
          );
          return {
            ...state,
            favoriteUserNames,
          };
        }
        if (
          !action.payload.isHistory &&
          !favoriteUserNames.includes(action.payload.userName)
        ) {
          favoriteUserNames.push(action.payload.userName);
          return {
            ...state,
            favoriteUserNames,
          };
        }
      },
      prepare: (userName: string, isHistory: boolean) => {
        return { payload: { userName, isHistory } };
      },
    },
    setCurrentUserName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        currentUserName: action.payload,
      };
    },
    setRecommendProblemMetadatas: (
      state,
      action: PayloadAction<ProblemMetadata[]>
    ) => {
      return {
        ...state,
        recommendProblemsOfCurrentUser: [...action.payload],
      };
    },
  },
});

export const {
  addUserName,
  deleteUserName,
  setCurrentUserName,
  setRecommendProblemMetadatas,
  clickUserInputButton,
} = userSlice.actions;
export default userSlice.reducer;
