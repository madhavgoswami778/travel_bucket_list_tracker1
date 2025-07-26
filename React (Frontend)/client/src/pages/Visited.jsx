import React, { useEffect, useState } from "react";
import axios from "axios";

function Visited() {
  const [destinations, setDestinations] = useState([]);

  const fetchVisited = async () => {
    const res = await axios.get("http://localhost:5000/destinations");
    setDestinations(res.data.filter((d) => d.status === "Visited"));
  };

  useEffect(() => {
    fetchVisited();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Visited Places ✅</h1>
      <ul className="space-y-4">
        {destinations.map((d) => (
          <li key={d.id} className="p-4 bg-green-100 rounded shadow">
            {d.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Visited;
