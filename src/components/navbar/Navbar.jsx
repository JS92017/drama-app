import "./Navbar.css";
import Popularity from "../../assets/Popularity.png";
import Live from "../../assets/broadcast-live.png";
import Rating from "../../assets/rating.png";

export default function Navbar({ onClickNav }) {
  return (
    <nav className="navbar">
      <h1>나의 시리즈 </h1>

      <div className="navbar_links">
        <a
          href="#popular"
          onClick={() => onClickNav("popular")} // 클릭 시 "popular" 타입으로 설정
        >
          인기순
          <img
            className="navbar_emoji"
            src={Popularity}
            alt="Popularity emoji"
          />
        </a>
        <a
          href="#on_the_air"
          onClick={() => onClickNav("on_the_air")} // 클릭 시 "on_the_air" 타입으로 설정
        >
          TV 방영중
          <img className="navbar_emoji" src={Live} alt="broadcast emoji" />
        </a>
        <a
          href="#top_rated"
          onClick={() => onClickNav("top_rated")} // 클릭 시 "top_rated" 타입으로 설정
        >
          높은 평점
          <img className="navbar_emoji" src={Rating} alt="rating emoji" />
        </a>
      </div>
    </nav>
  );
}
