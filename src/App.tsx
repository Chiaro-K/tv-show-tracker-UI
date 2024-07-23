import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import ShowsList from "./pages/shows";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/shows" Component={ShowsList} />
      </Routes>
    </Router>
  );
}
export default App;
