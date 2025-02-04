import { configureStore } from "@reduxjs/toolkit";

import StoryReducer from "../features/stories";
import dropDownReducer from "../features/dropdown";

export const store = configureStore({
  reducer: {
    stories: StoryReducer,
    dropdown: dropDownReducer,
  },
});
