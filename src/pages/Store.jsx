import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "../store/userSlice";
/*
  리덕스란 전역 상태 관리 라이브러리로, 애플리케이션의 상태를 중앙에서 관리할 수 있게 해줍니다.
  리덕스를 사용하면 컴포넌트 간의 상태 공유가 용이해지고, 상태 변경을 예측 가능하게 만들 수 있습니다.
  컴포넌트들이 props를 통해 상태를 전달받는 대신, 리덕스 스토어에서 직접 상태를 가져오고 변경할 수 있습니다.
  
  리덕스는 주로 다음과 같은 상황에서 사용됨 :
  1. 애플리케이션의 상태가 복잡하고 여러 컴포넌트에서 공유해야 할 때
  2. 상태 변경이 자주 발생하고, 이를 추적하기 어려울 때
  3. 상태 변경을 예측 가능하게 만들고 싶을 때
  4. 상태를 중앙에서 관리하고, 이를 기반으로 UI를 업데이트하고 싶을 때
  5. 상태 변경을 기록하고, 디버깅하기 쉽게 만들고 싶을 때
  6. 서버와의 데이터 동기화가 필요할 때
  7. 비동기 작업을 관리하고 싶을 때
  */

//(1) cartData 슬라이스 생성
let cartData = createSlice({
  name: "cartData",
  initialState: [
    { id: 4, name: "Pink Adidas", price: 150000, count: 1 },
    { id: 5, name: "Nike Original", price: 180000, count: 1 },
    { id: 6, name: "miumiu shoes", price: 125000, count: 2 },
    { id: 7, name: "Grey Yordan", price: 110000, count: 1 },
  ],
  // (2) increaseCount 액션 생성 (index를 받아 해당 항목의 count를 증가시킴)
  reducers: {
    // 장바구니 아이템 수량 증가
    IncreaseCount(state, action) {
      state[action.payload].count += 1;
    },

    // 장바구니 아이템 수량 감소
    DecreaseCount(state, action) {
      const index = action.payload;
      state[index].count -= 1;

      if (state[index].count <= 0) {
        // 수량이 0 이하가 되면 해당 상품을 삭제
        state.splice(index, 1);
      }
    },

    // 장바구니에 상품 추가
    AddToItem(state, action) {
      const product = action.payload;
      const existingProduct = state.find((item) => item.id === product.id);

      if (existingProduct) {
        // 이미 장바구니에 있는 상품이면 수량만 증가
        existingProduct.count += 1;
      } else {
        // 장바구니에 없는 상품이면 새로 추가
        state.push({
          id: product.id,
          name: product.title, // title을 name으로 설정
          price: product.price,
          count: 1,
        });
      }
    },

    // 장바구니에서 상품 삭제
    DeleteItem(state, action) {
      const index = action.payload;
      if (index > -1) {
        state.splice(index, 1); // 해당 인덱스의 상품 삭제
      }
    },
    // 장바구니 아이템을 localStorage에 저장하는 리듀서
    SetCartItems(state, action) {
      return action.payload; // 완전히 덮어쓰기
    },
  },
});

let stock = createSlice({
  name: "stock",
  initialState: [10, 23, 12],
});

// 3. 액션 추출
export let { ChangeName } = user.actions;
export let {
  IncreaseCount,
  DecreaseCount,
  AddToItem,
  DeleteItem,
  SetCartItems,
} = cartData.actions;

// eslint-disable-next-line react-refresh/only-export-components
export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cartData: cartData.reducer,
  },
});
