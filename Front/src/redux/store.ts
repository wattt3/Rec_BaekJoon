import { createStore } from "redux";
import { persistStore } from "redux-persist";
import { rootReducer } from "./reducers/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const store = createStore<any, any, any, any>(
  rootReducer,
  // For Redux dev tools.
  composeWithDevTools()
);

export const persistor = persistStore(store);

export default { store, persistor };
