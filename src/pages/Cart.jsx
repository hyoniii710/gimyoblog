import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ChangeName, IncreaseCount, DecreaseCount, DeleteItem } from "./Store";
import Button from "react-bootstrap/Button";
import "../App.css";
import { useEffect } from "react";
import { SetCartItems } from "./Store"; // 이미 있는 액션

function Cart() {
  const dispatch = useDispatch();

  // 로컬스토리지에서 cart-items 불러와서 Redux에 반영
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart-items"));
    if (savedCart && Array.isArray(savedCart)) {
      dispatch(SetCartItems(savedCart)); // 수량 중복 없이 복구
    }
  }, []);

  let cartItems = useSelector((state) => state.cartData); // 리덕스 스토어에서 상태를 가져옵니다.

  // 총 수량과 총 금액 계산
  let totalCount = cartItems.reduce((acc, item) => acc + item.count, 0);
  let totalPrice = cartItems.reduce(
    (acc, item) => acc + item.count * item.price,
    0
  );

  // 장바구니 상태가 변경될때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(cartItems)); //장바구니 아이템 저장

    // 장바구니 총 금액과 총 수량 저장
    localStorage.setItem("cart-total-price", totalPrice);
    localStorage.setItem("cart-total-count", totalCount);
  }, [cartItems, totalPrice, totalCount]);
  // cartItems, totalPrice, totalCount 배열 안의 값 중 하나라도 변경되면 useEffect가 실행됨

  return (
    <div>
      <h1>Cart</h1>
      {/* <p>
        {user.name}
        {user.age}의 장바구니
      </p>
      <button
        onClick={() => {
          dispatch(Increase(3));
        }}
      >
        더하기
      </button> */}
      <p>This is the cart page.</p>
      <Table className="cart-table">
        <thead>
          <tr>
            <th>상품 번호</th>
            <th>상품명</th>
            <th>수량</th>
            <th>금액</th>
            <th>수량 변경</th>
            <th>상품 삭제</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>{(item.count * item.price).toLocaleString()}</td>
              <td>
                <Button
                  onClick={() => {
                    dispatch(IncreaseCount(index));
                  }}
                  variant="secondary"
                  size="sm"
                >
                  +
                </Button>
                <Button
                  style={{ marginLeft: "5px" }}
                  onClick={() => {
                    dispatch(DecreaseCount(index));
                  }}
                  variant="secondary"
                  size="sm"
                >
                  -
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => {
                    dispatch(DeleteItem(index));
                  }}
                  variant="danger"
                  size="sm"
                >
                  x
                </Button>
              </td>
            </tr>
          ))}
          {/* 합계 행 추가 */}
          <tr>
            <td colSpan="2" className="text-center">
              <strong>총 합계</strong>
            </td>
            <td>
              <strong>{totalCount}</strong>
            </td>
            <td>
              <strong>{totalPrice.toLocaleString()}원</strong>
            </td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
export default Cart;
