import React from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInPage from "./access/LogInPage";
import SignUpPage from "./access/SignUpPage";
import Home from "./homepage/Home";
import RankPage from "./ranking/RankPage";
import PrivatePages from "./PrivatePages";

function App() {

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/ranking" element={<RankPage />} />
          <Route element={<PrivatePages/>}>
              <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;