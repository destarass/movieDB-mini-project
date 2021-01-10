import React, { useState } from "react";
import { Home } from "./components/home/Home";
import { MovieDetail } from "./components/moviedetail/Moviedetail";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import NavbarPage from "./components/NavbarPage";

export function App() {
  const [saldo, setSaldo] = useState(100000);
  const [owner, setOwner] = useState([]);

  return (
    <main>
      <NavbarPage saldo={saldo} owner={owner} />
      <Switch>
        <Route
          path="/"
          render={(props) => (
            <Home
              saldo={saldo}
              setSaldo={setSaldo}
              owner={owner}
              setOwner={setOwner}
              {...props}
            />
          )}
          exact
        />
        <Route
          path="/movie/:id"
          render={(props) => (
            <MovieDetail
              saldo={saldo}
              setSaldo={setSaldo}
              owner={owner}
              setOwner={setOwner}
              {...props}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default App;
