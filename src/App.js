import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/home";

function App() {
  return (
    <>
      <HomePage />
      {/* <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
        </Layout>
      </Router> */}
    </>
  );
}

export default App;
