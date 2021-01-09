import React, { useEffect, useState } from "react";
import {
  fetchGenre,
  fetchMovieByGenre,
  fetchMovies,
  fetchPersons,
  fetchTopratedMovie,
} from "../../services";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { Link } from "react-router-dom";

import ReactStars from "react-rating-stars-component";

export function Home() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [persons, setPersons] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      let tempMovies = await fetchMovies();
      let tempGenres = await fetchGenre();
      let tempMovieByGenre = await fetchMovieByGenre(28);
      let tempPersons = await fetchPersons();
      let tempTopRated = await fetchTopratedMovie();
      //   console.log(tempMovies);
      setNowPlaying(tempMovies);
      setGenres(tempGenres);
      setMovieByGenre(await fetchMovieByGenre(28));
      setPersons(tempPersons);
      setTopRated(tempTopRated);
    };
    fetchAPI();
  }, []);

  const handleGenreClick = async (genre_id) => {
    setMovieByGenre(await fetchMovieByGenre(genre_id));
  };

  const movies = nowPlaying.slice(0, 1).map((item, index) => {
    return (
      <div key={index}>
        <div className="carousel-center">
          <img
            className="GambarPosterUtama"
            src={item.backPoster}
            alt={item.title}
          />
        </div>
        <div className="carousel-center kuningplaydiv">
          <i className="far fa-play-circle kuningplay"></i>
        </div>

        <div className="carousel-caption JudulPosterUtama">{item.title}</div>
      </div>
    );
  });

  const genreList = genres.map((item, index) => {
    return (
      <li className="list-inline-item" key={index}>
        <button
          type="button"
          className="btn btn-outline-info"
          onClick={() => {
            handleGenreClick(item.id);
          }}
        >
          {item.name}
        </button>
      </li>
    );
  });

  // const HargaFilm = movieByGenre.map((item,index) => {
  //   if({item.rating} <=3 && {item.rating} >= 1){
  //     return <p>Rp. 3.500</p>
  //   }
  //   else if({item.rating} <=4 && {item.rating} >= 6){
  //     return <p>Rp. 3.500</p>

  //   }
  // })

  const movieList = movieByGenre.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title} />
          </Link>
        </div>
        <div className="mt-3">
          <p className="JudulMovies">{item.title}</p>
          <p>Rated: {item.rating}</p>
          <p></p>
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

  const trendingPersons = persons.slice(0, 4).map((p, i) => {
    return (
      <div className="col-md-3 text-center" key={i}>
        <img
          className="img-fluid rounded-circle"
          src={p.profileImg}
          alt={p.name}
        ></img>
        <p className="font-weight-bold text-center">{p.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}
        >
          Trending for {p.known}
        </p>
      </div>
    );
  });

  const topRatedList = topRated.slice(0, 4).map((item, index) => {
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
    <div className="container homepage">
      <div className="row mt-2">
        <div className="col posterutama">{movies}</div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genreList}</ul>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="float-right">
            <i className="far fa-arrow-alt-circle-right"></i>
          </div>
        </div>
      </div>

      <div className="row mt-3">{movieList}</div>

      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" className="JudulTrendingPerson">
            TRENDING PERSONS ON THIS WEEK
          </p>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="float-right">
            <i className="far fa-arrow-alt-circle-right"></i>
          </div>
        </div>
      </div>

      <div className="row mt-3">{trendingPersons}</div>

      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" className="JudulTrendingPerson">
            Top Rated Movies
          </p>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="float-right">
            <i className="far fa-arrow-alt-circle-right"></i>
          </div>
        </div>
      </div>
      <div className="row mt-3">{topRatedList}</div>

      <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>

      <div className="row mt-3 mb-5">
        <div className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
          <h3>ABOUT ME</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
            dolores praesentium dolorem quod magnam mollitia distinctio vero
            dolorum? Eum quibusdam nihil rem sunt recusandae quaerat voluptas
            ducimus veritatis distinctio sed.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
            qui quia enim, quibusdam pariatur ratione suscipit? Beatae officia
            fugiat eligendi placeat tempora cumque error dolorum laborum ab,
            expedita vitae. Dolores.
          </p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="/" style={{ color: "#f4c10f" }}>
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" style={{ color: "#f4c10f" }}>
                <i className="fab fa-youtube"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" style={{ color: "#f4c10f" }}>
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" style={{ color: "#f4c10f" }}>
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-4 col-sm-6" style={{ color: "#5a606b" }}>
          <h3>KEEP IN TOUCH</h3>
          <ul className="list-unstyled">
            <li>
              <p>
                <strong>
                  <i className="fas fa-map-marker-alt">
                    Address: Jakarta, Indonesia
                  </i>
                </strong>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
