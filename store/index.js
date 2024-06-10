import { configureStore, createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      if (state.value > 0) {
        state.value -= 1;
      }
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const progressSlice = createSlice({
  name: "progress",
  initialState: {
    lessonsCompleted: 0,
    testsCompleted: 0,
    codeTasksCompleted: 0,
  },
  reducers: {
    completeLesson: (state) => {
      state.lessonsCompleted += 1;
    },
    completeTest: (state) => {
      state.testsCompleted += 1;
    },
    completeCodeTask: (state) => {
      state.codeTasksCompleted += 1;
    },
    resetProgress: (state) => {
      state.lessonsCompleted = 0;
      state.testsCompleted = 0;
      state.codeTasksCompleted = 0;
    },
  },
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
export const { completeLesson, completeTest, completeCodeTask, resetProgress } = progressSlice.actions;
export const { signIn, signOut } = authSlice.actions;

export default configureStore({
  reducer: {
    counter: counterSlice.reducer,
    progress: progressSlice.reducer,
    auth: authSlice.reducer,
  },
});
