import "./DramaList.css";
import Popularity from "../../assets/Popularity.png";
import DramaCard from "./DramaCard";
import { useEffect, useState } from "react";
import _ from "lodash";

export default function DramaList({ type, title, emoji }) {
  const [dramas, setDramas] = useState([]);
  const [filterDramas, setFilterDramas] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가

  // 검색어에 맞는 드라마 데이터를 가져오는 함수
  const fetchDrama = async (query = "") => {
    let url = "";
    if (query) {
      // 검색어가 있을 경우, search API 호출
      url = `https://api.themoviedb.org/3/search/tv?api_key=b25793cf7ff09731b36564546c39d47b&language=ko&query=${query}`;
    } else {
      // 검색어가 없을 경우, type에 맞는 드라마 리스트 호출
      url = `https://api.themoviedb.org/3/tv/${type}?api_key=b25793cf7ff09731b36564546c39d47b&language=ko`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setDramas(data.results);
    setFilterDramas(data.results);
  };

  // 컴포넌트 마운트 시 기본 데이터 불러오기
  useEffect(() => {
    fetchDrama(); // 기본적으로 검색어 없이 해당 type의 드라마 목록 불러오기
  }, [type]);

  // 검색어 필터링
  useEffect(() => {
    if (searchQuery) {
      fetchDrama(searchQuery); // 검색어로 드라마 목록 필터링
    } else {
      fetchDrama(); // 검색어가 없으면 기본 목록 보여주기
    }
  }, [searchQuery]);

  const handleFilter = (rate) => {
    if (minRating === rate) {
      setMinRating(0);
      setFilterDramas(dramas);
    } else {
      setMinRating(rate);
      const filtered = dramas.filter((drama) => drama.vote_average >= rate);
      setFilterDramas(filtered);
    }
  };

  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });

  useEffect(() => {
    if (sort.by !== "default") {
      const sortedDramas = _.orderBy(filterDramas, [sort.by], [sort.order]);
      setFilterDramas(sortedDramas);
    }
  }, [sort]);

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="drama_list" id={`${type}`}>
      <header className="align_center drama_list_header">
        <h2 className="align_center drama_list_heading">
          {title}{" "}
          <img
            src={`${emoji}`}
            alt="Popularity emoji"
            className="navbar_emoji"
          />
        </h2>

        <div className="align_center drama_list_fs">
          <div className="search-container">
            <input
              type="text"
              placeholder="검색어 입력..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // 검색어 입력 시 업데이트
            />
          </div>

          <ul className="align_center drama_filter">
            <li
              className={
                minRating === 8
                  ? "drama_filter_item active"
                  : "drama_filter_item"
              }
              onClick={() => handleFilter(8)}
            >
              +8 <img src="/star.png" alt="Star" className="star_image" />
            </li>
            <li
              className={
                minRating === 7
                  ? "drama_filter_item active"
                  : "drama_filter_item"
              }
              onClick={() => handleFilter(7)}
            >
              +7 <img src="/star.png" alt="Star" className="star_image" />
            </li>
            <li
              className={
                minRating === 6
                  ? "drama_filter_item active"
                  : "drama_filter_item"
              }
              onClick={() => handleFilter(6)}
            >
              +6 <img src="/star.png" alt="Star" className="star_image" />
            </li>
          </ul>

          <select
            name="by"
            id="by"
            onChange={handleSort}
            className="drama_sorting"
          >
            <option value="default">기본순</option>
            <option value="first_air_date">날짜</option>
            <option value="vote_average">평점</option>
          </select>
          <select
            name="order"
            id="order"
            onChange={handleSort}
            className="drama_sorting"
          >
            <option value="asc">오름차순</option>
            <option value="desc">내림차순</option>
          </select>
        </div>
      </header>

      <div className="drama_cards">
        {filterDramas.length > 0 ? (
          filterDramas.map((drama) => (
            <DramaCard key={drama.id} drama={drama} />
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </section>
  );
}
