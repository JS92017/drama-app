import "./App.css";
import DramaList from "./components/dramaList/DramaList";
import Navbar from "./components/navbar/Navbar";
import Popularity from "./assets/Popularity.png";
import Live from "./assets/broadcast-live.png";
import Rating from "./assets/rating.png";
import { useState } from "react";

function App() {
  const [activeType, setActiveType] = useState("popular"); // 기본값을 "popular"로 설정하여 초기 로딩 시 인기순 드라마 목록이 보이게 함

  const handleNavClick = (type) => {
    // 이미 선택된 메뉴는 그대로 두고, 클릭한 메뉴만 활성화
    if (activeType !== type) {
      setActiveType(type); // 클릭된 항목만 활성화
    }
  };

  return (
    <div className="app">
      <Navbar onClickNav={handleNavClick} />

      {/* 조건부 렌더링 */}
      {activeType === "popular" && (
        <DramaList type="popular" title="인기순" emoji={Popularity} />
      )}
      {activeType === "on_the_air" && (
        <DramaList type="on_the_air" title="TV 방영중" emoji={Live} />
      )}
      {activeType === "top_rated" && (
        <DramaList type="top_rated" title="높은 평점" emoji={Rating} />
      )}
    </div>
  );
}

export default App;
