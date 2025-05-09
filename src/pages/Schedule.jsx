import Calendar from "react-calendar";
import { Outlet } from "react-router-dom";

function Schedule() {
  return (
    <div className="App">
      <h2>캘린더 페이지입니다</h2>
      {/* <Outlet></Outlet> */}
    </div>
  );
}

export default Schedule; // ✅ 이 줄이 꼭 필요해요!
