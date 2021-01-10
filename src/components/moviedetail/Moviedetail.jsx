import React, { useEffect, useState } from "react";
import {
  fetchCasts,
  fetchMovieDetail,
  fetchSimilarMovie,
} from "../../services";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

import "./Moviedetail.css";

export function MovieDetail({
  match,
  saldo,
  setSaldo,
  owner,
  setOwner,
  location,
}) {
  let params = match.params;
  let genres = [];
  const [detail, setDetail] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);

  function getHarga(rating) {
    if (rating <= 3 && rating >= 1) {
      return 3500;
    } else if (rating <= 6 && rating > 3) {
      return 8250;
    } else if (rating <= 8 && rating > 6) {
      return 16350;
    } else if (rating <= 10 && rating > 8) {
      return 21250;
    }
  }

  function getDot(price) {
    var num = price;
    var harga = num.toString();
    for (var i = harga.length; i > 0; i = i - 3) {
      harga = harga.slice(0, i) + "." + harga.slice(i, harga.length - 1);
      console.log(harga);
    }

    return harga;
  }

  useEffect(() => {
    console.log(location.owner);
    // setOwner(location.owner);
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
      <div className="col-md-3 col-sm-4" key={i}>
        <img
          className="img-fluid rounded-circle  ImgCastDetail"
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
          <p>Harga: Rp.{getDot(getHarga(item.rating))},00</p>
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
      <h1 className="JudulDetailMovie"> {detail.title}</h1>
      <div className="row mt-2">
        <div className="col text-center" style={{ width: "100%" }}>
          <img
            src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
            alt={detail.title}
            className="img-fluid"
          />
        </div>
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
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>PRICE</p>
          <p style={{ color: "#f4c10f" }}>
            Rp.{getHarga(detail.vote_average)},00
          </p>
        </div>

        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>BUY</p>
          <div className="ButtonBuyDetail">
            <button
              type="button"
              class="btn btn-warning text-center BuyButtonDetail"
              onClick={() => {
                if (
                  !owner.includes(detail.id) &&
                  saldo >= getHarga(detail.vote_average)
                ) {
                  setSaldo(saldo - getHarga(detail.vote_average));

                  var tempowner = [...owner];
                  tempowner.push(detail.id);
                  console.log(tempowner);
                  setOwner(tempowner);
                }
              }}
            >
              Buy
            </button>
          </div>

          {/* <p style={{ color: "#f4c10f" }}>Rp.{getHarga(detail.vote_average)}</p> */}
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
