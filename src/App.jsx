import React from "react";
import { Home } from "./components/home/Home";
import { MovieDetail } from "./components/moviedetail/Moviedetail";
import "./App.css";
import { Switch, Route } from "react-router-dom";

export function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={MovieDetail} />
      </Switch>
    </main>
  );
}

export default App;
