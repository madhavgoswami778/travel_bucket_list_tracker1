import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/destinations").then((res) => {
      setDestinations(res.data);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Travel Bucket List</h1>
      <ul>
        {destinations.map((dest) => (
          <li key={dest.id}>{dest.name} - {dest.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;