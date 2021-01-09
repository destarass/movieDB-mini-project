import React, { useEffect, useState } from "react";
import {
  fetchCasts,
  fetchMovieDetail,
  fetchSimilarMovie,
} from "../../services";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

export function MovieDetail({ match }) {
  let params = match.params;
  let genres = [];
  const [detail, setDetail] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
      setCasts(await fetchCasts(params.id));
      setSimilarMovie(await fetchSimilarMovie(params.id));
    };
    fetchAPI();
  }, [params.id]);

  genres = detail.genres;

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <button type="button" className="btn btn-outline-info">
            {g.name}
          </button>
        </li>
      );
    });
  }

  const castList = casts.slice(0, 4).map((c, i) => {
    return (
      <div className="col-md-3 col-sm-6" key={i}>
        <img
          className="img-fluid rounded-circle"
          src={c.img}
          alt={c.name}
        ></img>
        <p className="font-weight-bold text-center">{c.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}
        >
          {c.character}
        </p>
      </div>
    );
  });

  const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
    console.log(item.poster);
    return (
      <div className="col-md-3 " key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p className="JudulMovies">{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            className="Bintang_Rating"
            count={item.rating}
            size={20}
            color={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col text-center" style={{ width: "100%" }}>
          <img
            src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
            alt={detail.title}
            className="img-fluid"
          />
        </div>
        <div className="carousel-caption JudulPosterUtama">{detail.title}</div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" className="JudulTrendingPerson">
            GENRE
          </p>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genres && genresList}</ul>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <div className="tex-center">
            <ReactStars
              className="Bintang_Rating"
              count={detail.vote_average}
              size={20}
              color={"#f4c10f"}
            ></ReactStars>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bold" }}>
            {detail.overview}
          </p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RELEASE DATE</p>
          <p style={{ color: "#f4c10f" }}>{detail.release_date}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RUN TIME</p>
          <p style={{ color: "#f4c10f" }}>{detail.runtime}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>BUDGET</p>
          <p style={{ color: "#f4c10f" }}> ${detail.budget}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>HOMEPAGE</p>
          <p style={{ color: "#f4c10f" }}>{detail.homepage}</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" className="JudulTrendingPerson">
            CAST
          </p>
        </div>
      </div>

      <div className="row mt-3">{castList}</div>

      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" className="JudulTrendingPerson">
            SIMILAR MOVIE
          </p>
        </div>
      </div>
      <div className="row mt-3">{similarMovieList}</div>
    </div>
  );
}
