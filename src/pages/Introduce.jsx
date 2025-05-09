import { useParams } from "react-router-dom";
import { use, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { AppContext } from "../App"; // context를 사용하기 위해 import
import { useDispatch, useSelector } from "react-redux";
import { AddToItem } from "./Store"; // 액션을 사용하기 위해 import
import { get } from "../../node_modules/immer/src/utils/common";

// let YellowBtn = styled.button`
//   background: ${(props) => props.bg};
//   color: ${(props) => (props.bg == "blue" ? "white" : "black")};
//   padding: 10px;
// `;
// // styled 속성을 복사해서 사용할 수 있음
// let CopyBtn = styled(YellowBtn)``;

function Introduce() {
  const dispatch = useDispatch();
  let { id } = useParams();

  // id를 숫자로 변환
  const shoeId = parseInt(id, 10); // id를 숫자로 변환합니다.

  // 최근 본 상품 2개 띄우기
  useEffect(() => {
    let watchedList = JSON.parse(localStorage.getItem("watch-list")) || [];

    // 중복된 id 제거하고, 새로운 id를 맨 앞에 추가
    const newId = id.toString(); // id를 string으로 변환

    // 이미 존재하는 id는 제거하고, 가장 앞에 추가
    if (!watchedList.includes(newId)) {
      watchedList.unshift(newId);
    }

    // 최근 본 상품 2개까지만 저장
    if (watchedList.length > 2) {
      watchedList = watchedList.slice(0, 2); // 2개까지만 저장
    }

    localStorage.setItem("watch-list", JSON.stringify(watchedList));
  }, [id]);

  const { stock, shoes } = useContext(AppContext); // 이렇게 받아야 함
  let [tap, setTap] = useState(0); //탭 상태를 숫자로 관리
  const [pagefade, setPageFade] = useState("");

  useEffect(() => {
    setPageFade("end");

    return () => {
      setPageFade(""); // pagefade가 사라짐
    };
  }, [tap]);

  function TabContent({ tap }) {
    let [fade, setFade] = useState(""); // fade 상태를 관리하기 위한 useState

    useEffect(() => {
      setFade("end");

      return () => {
        setFade(""); // fade가 사라짐
      };
    }, [tap]);

    return (
      <div className={`start ${fade}`}>
        {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tap]}
      </div>
    );
  }

  // 여기에서 shoeId가 유효한 값인지 체크하고, 그에 따라 안전하게 접근
  const selectedShoe = shoes[shoeId - 1]; // shoeId를 사용하여 0 기반 인덱스로 배열 접근

  if (!selectedShoe) {
    return <div>상품을 찾을 수 없습니다.</div>; // selectedShoe가 없으면 오류 메시지 표시
  }

  return (
    <div className="App">
      <div className={`container start ${pagefade}`}>
        <div className="row">
          <div className="col-md-6">
            {/* 이미지 URL 수정 */}
            <img
              src={`https://codingapple1.github.io/shop/shoes${selectedShoe.id}.jpg`}
              width="100%"
              alt={selectedShoe.title}
            />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{selectedShoe.title}</h4>
            <p>재고: {stock[shoeId - 1]}</p>
            <p>{selectedShoe.content}</p>
            <p>{selectedShoe.price.toLocaleString()}원</p>
            <button
              onClick={() => {
                dispatch(AddToItem(selectedShoe));
              }}
              className="btn btn-danger"
            >
              주문하기
            </button>
          </div>
        </div>
      </div>

      <Nav fill variant="tabs" defaultActiveKey="/link-0">
        <Nav.Item>
          <Nav.Link onClick={() => setTap(0)} eventKey="/link-0">
            상품 상세
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTap(1)} eventKey="link-1">
            후기
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTap(2)} eventKey="link-2">
            문의
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tap={tap} />
    </div>
  );
}

export default Introduce;
