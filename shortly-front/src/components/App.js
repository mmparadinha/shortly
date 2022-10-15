import React from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInPage from "./access/LogInPage";
import SignUpPage from "./access/SignUpPage";
import Home from "./homepage/Home";

function App() {

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<LogInPage />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;