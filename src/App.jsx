import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Filters from "./components/Filters";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import RestaurantDetail from "./RestaurantDetail";
import { useState } from "react";

function App() {
  const [filters, setFilters] = useState({
    isOpen: false,
    price: "",
    category: "",
  });

  const updateFilters = (updatedFilters) => {
    setFilters((prev) => ({ ...prev, ...updatedFilters }));
  };

  return (
    <Router>
      <div className="container mx-auto p-5">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Filters filters={filters} setFilters={updateFilters} />
                <RestaurantCard filters={filters} />
              </>
            }
          />
          <Route path="/:id" element={<RestaurantDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
