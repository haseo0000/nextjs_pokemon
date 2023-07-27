import { configureStore } from "@reduxjs/toolkit";
import bagReducer from "./bag";
import loadingReducer from "./loading";

export const store = configureStore({
  reducer: {
    bag: bagReducer,
    loading: loadingReducer,
  },
});

// only for TypeScript
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
