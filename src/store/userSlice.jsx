import { createSlice } from "@reduxjs/toolkit";
//   createSlice는 리덕스 스토어의 상태를 관리하기 위한 슬라이스를 생성하는 함수입니다.
//   슬라이스는 리덕스 스토어의 상태를 특정 도메인이나 기능에 따라 나눈 부분을 의미합니다.
let user = createSlice({
  name: "user",
  initialState: { name: "gimyo", age: 30 },
  reducers: {
    ChangeName(state) {
      state.name = "park";
    },
    Increase(state, action) {
      state.age += action.payload; // age 1 증가
    },
  },
});

export default user;
