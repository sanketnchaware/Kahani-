import { configureStore } from "@reduxjs/toolkit";

import StoryReducer from "../features/stories";

export const store = configureStore({
  reducer: {
    stories: StoryReducer,
  },
});
