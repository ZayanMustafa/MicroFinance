import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserApplications() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount or filter change

  useEffect(() => {
    // Fetch data from the backend
    // fetch("https://api.example.com/applications")
    fetch() // Use local JSON file for testing
      .then((response) => response.json())
      .then((data) => {
        setApplications(data); // Set the fetched data to state
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((err) => {
        setError("Failed to fetch data.");
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  const getFilteredApplications = () => {
    if (filter === "ALL") return applications;
    return applications.filter((app) => app.status === filter);
  };

  const filteredApplications = getFilteredApplications();

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <Link to={"/"}>
      <h1 className="text-3xl font-bold text-center mb-8">User Applications</h1>
      </Link>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-6">
        {["ALL", "Accepted", "Pending", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 mx-2 rounded-lg font-medium text-white transition-colors duration-200 ${
              filter === status ? "bg-blue-600" : "bg-gray-400 hover:bg-gray-500"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app) => (
            <div
              key={app.id}
              className="card p-4 bg-white rounded-lg shadow-lg border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-2 text-center sm:text-left">{app.title}</h2>
              <p
                className={`text-sm font-medium text-center sm:text-left ${
                  app.status === "Accepted"
                    ? "text-green-600"
                    : app.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {app.status}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No applications found.
          </p>
        )}
      </div>
    </div>
  );
}

export default UserApplications;
