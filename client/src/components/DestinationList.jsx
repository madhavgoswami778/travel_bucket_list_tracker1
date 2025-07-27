import React, { useEffect, useState } from "react";
import axios from "axios";

function DestinationList() {
  const [destinations, setDestinations] = useState([]);
  const [newPlace, setNewPlace] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchDestinations = async () => {
    const res = await axios.get("http://localhost:5000/destinations");
    setDestinations(res.data);
  };

  const addDestination = async () => {
    if (!newPlace.trim()) return;
    await axios.post("http://localhost:5000/add", {
      name: newPlace,
      status: "Wishlist",
    });
    setNewPlace("");
    fetchDestinations();
  };

  const toggleStatus = async (id) => {
    await axios.patch(`http://localhost:5000/toggle/${id}`);
    fetchDestinations();
  };

  const fetchWeather = async () => {
    if (!city.trim()) return;
    const res = await axios.get(`http://localhost:5000/weather/${city}`);
    setWeather(res.data);
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <div className="space-y-6 mt-6">
      {/* Add New Destination */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newPlace}
          onChange={(e) => setNewPlace(e.target.value)}
          placeholder="Add a new destination"
          className="border p-2 rounded w-full"
        />
        <button onClick={addDestination} className="bg-green-500 text-white px-4 rounded">
          Add
        </button>
      </div>

      {/* Destination List */}
      <ul className="space-y-4">
        {destinations.map((d) => (
          <li
            key={d.id}
            className={`p-4 rounded shadow flex justify-between items-center ${
              d.status === "Visited" ? "bg-green-100" : "bg-yellow-100"
            }`}
          >
            <span>{d.name}</span>
            <button
              onClick={() => toggleStatus(d.id)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Mark as {d.status === "Visited" ? "Wishlist" : "Visited"}
            </button>
          </li>
        ))}
      </ul>

      {/* Weather Info */}
      <div className="mt-8 space-y-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="border p-2 rounded w-full"
        />
        <button onClick={fetchWeather} className="bg-indigo-500 text-white px-4 py-1 rounded">
          Get Weather
        </button>

        {weather && weather.main && (
          <div className="bg-gray-100 p-4 rounded mt-2">
            <h3 className="text-xl font-bold">{weather.name}</h3>
            <p>🌡 Temp: {weather.main.temp}°C</p>
            <p>🌤 Weather: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DestinationList;
