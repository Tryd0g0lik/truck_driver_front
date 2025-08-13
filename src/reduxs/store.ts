/**
 * src\reduxs\store.ts
 */
import { configureStore } from "@reduxjs/toolkit";
import personSlice from "reduxToolkit/features/userstate/personSlice";
import pageSlice from "reduxToolkit/features/pagestate/pageSlice";

/**
 * personSlice - This is the state of the  user/person.
 * pageSlice - This is the state of the meta page's data.
 */
export const store = configureStore({
    reducer: {
        personstate:  personSlice,
        metapage: pageSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself;
export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
