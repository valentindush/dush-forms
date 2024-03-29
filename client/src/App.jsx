import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Create from "./pages/create";
import ViewForm from "./pages/ViewForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />

        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/form/:url" element={<ViewForm />} />
      </Routes>
    </Router>
  );
}

export default App;
