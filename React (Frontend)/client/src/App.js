import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Visited from "./pages/Visited";

function App() {
  return (
    <Router>
      <div className="p-6 max-w-4xl mx-auto">
        <nav className="flex gap-4 mb-6 text-blue-600">
          <a href="/" className="font-semibold">Home</a>
          <a href="/wishlist" className="font-semibold">Wishlist</a>
          <a href="/visited" className="font-semibold">Visited</a>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/visited" element={<Visited />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;