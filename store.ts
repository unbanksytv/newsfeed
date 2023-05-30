import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/loginModal";
import RegModalReducer from "./slices/registerModal";
import editReducer from "./slices/editModal";
import { twitterApi } from "./slices/apiSlices/apiSlice1";

const rootReducer = combineReducers({
  login: counterReducer,
  register: RegModalReducer,
  edit: editReducer,
  [twitterApi.reducerPath]: twitterApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(twitterApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
