import Star from "../../assets/star.png";
import "./DramaCard.css";

export default function DramaCard({ drama }) {
  return (
    <a
      href={`https://www.themoviedb.org/tv/${drama.id}?language=ko`}
      className="drama_card"
      target="_blank"
    >
      <img
        src={
          drama.poster_path
            ? `https://image.tmdb.org/t/p/w500${drama.poster_path}`
            : "/image.jpg"
        }
        alt="drama poster"
        className="drama_poster"
      />

      <div className="drama_details">
        <h3 className="drama_details_heading">{drama.name}</h3>
        <div className="align_center drama_date_rate">
          <p>{drama.first_air_date}</p>
          <p className="align_center">
            {drama.vote_average}
            <img src={Star} alt="rating icon" className="card_emoji" />
          </p>
        </div>
        <p className="drama_description">
          {drama.overview.slice(0, 150) + "..."}
        </p>
      </div>
    </a>
  );
}
