import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router"; // Corrected import
import MapSelector from "./MapSelector";

const Coverage = () => {
  const districts = useLoaderData(); // District data
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [filteredDistricts, setFilteredDistricts] = useState(districts);

  useEffect(() => {
    if (!search) {
      setFilteredDistricts(districts);
      return;
    }
    const lower = search.toLowerCase();
    const filtered = districts.filter(d =>
      d.district.toLowerCase().includes(lower)
    );
    setFilteredDistricts(filtered);

    // Auto-select if only one result matches
    if (filtered.length === 1) {
      setSelectedDistrict(filtered[0]);
    }
  }, [search, districts]);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h2 className="text-4xl font-extrabold mt-10 mb-10 text-center text-primary">
        We are available in 64 districts
      </h2>

      <input
        type="text"
        placeholder="Search your district..."
        className="input input-bordered w-full "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <MapSelector
        districts={filteredDistricts}
        selectedDistrict={selectedDistrict}
        onSelect={(district) => setSelectedDistrict(district)}
      />

      {selectedDistrict && (
        <div className="bg-base-100 p-4 rounded shadow">
          <h3 className="text-xl font-semibold text-primary">
            {selectedDistrict.city} ({selectedDistrict.district})
          </h3>
          <p><strong>Region:</strong> {selectedDistrict.region}</p>
          <p><strong>Covered Areas:</strong> {selectedDistrict.covered_area.join(", ")}</p>
          <a
            href={selectedDistrict.flowchart}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-2 inline-block"
          >
            View Flowchart
          </a>
        </div>
      )}
    </div>
  );
};

export default Coverage;
