import React from "react";
import Addingyourwork from "./components/Addingyourwork";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Addingyourwork />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
