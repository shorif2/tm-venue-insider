import React, { useMemo } from "react";

const VenueGrid = ({ data, onSectionClick, isSelected }) => {
  // Categorize sections based on section names
  const categorizedSections = useMemo(() => {
    if (!data || data.length === 0) return {};

    // Categorize sections
    const categories = {
      "GA/PIT/Others": [],
      "100s": [],
      "200s": [],
      "300s": [],
      "400s": [],
      "500s": [],
      "600s": [],
      "700s": [],
    };

    data.forEach((section) => {
      const name = section.name?.toLowerCase() || "";

      // Only categorize sections with specific numbering patterns
      if (/^1\d\d/.test(name)) {
        categories["100s"].push(section);
      } else if (/^2\d\d/.test(name)) {
        categories["200s"].push(section);
      } else if (/^3\d\d/.test(name)) {
        categories["300s"].push(section);
      } else if (/^4\d\d/.test(name)) {
        categories["400s"].push(section);
      } else if (/^5\d\d/.test(name)) {
        categories["500s"].push(section);
      } else if (/^6\d\d/.test(name)) {
        categories["600s"].push(section);
      } else if (/^7\d\d/.test(name)) {
        categories["700s"].push(section);
      } else {
        categories["GA/PIT/Others"].push(section);
      }
    });

    // Remove empty categories
    return Object.fromEntries(
      Object.entries(categories).filter(([_, sections]) => sections.length > 0)
    );
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="  px-6 pt-20 text-center text-gray-500 ">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No venue sections available
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Enter an Event ID and fetch data to view venue sections.
        </p>
      </div>
    );
  }

  // Define category colors matching the image
  const getCategoryColor = (category) => {
    const colors = {
      "GA/PIT/Others": "bg-[#B8E6FE]",
      "100s": "bg-[#C3E1AF]",
      "200s": "bg-[#E0C8EE]",
      "300s": "bg-[#A7F6D2]",
      "400s": "bg-[#DDF783]",
      "500s": "bg-[#FEC2CC]",
      "600s": "bg-[#FBDE9D]",
      "700s": "bg-[#FEC2CC]",
    };
    return colors[category] || "bg-gray-600";
  };

  return (
    <div className="p-4 flex-1 min-w-0 ">
      {/* Horizontal Category Panels */}
      <div className="flex flex-wrap  gap-4 overflow-x-auto pb-2 ">
        {Object.entries(categorizedSections).map(([category, sections]) => (
          <div
            key={category}
            className="bg-gray-50 rounded-lg p-3 max-w-64  flex-shrink-0 flex-grow border border-gray-200 "
          >
            {/* Category Header */}
            <div className="flex items-center mb-2">
              <div
                className={`w-2 h-2 rounded-full ${getCategoryColor(
                  category
                )} mr-2`}
              ></div>
              <h3 className="text-sm font-semibold text-gray-900">
                {category} ({sections.length})
              </h3>
            </div>

            {/* Section Grid */}
            <div className="grid grid-cols-4 gap-2">
              {sections.map((section, index) => (
                <button
                  key={`${category}-${index}`}
                  onClick={() => onSectionClick?.(section)}
                  className={`border ${getCategoryColor(
                    category
                  )} hover:opacity-80 transition-all duration-200 rounded px-3 py-2 text-xs font-medium min-h-[24px] flex items-center justify-center ${
                    isSelected(section)
                      ? "ring-2 ring-yellow-400 ring-offset-1"
                      : ""
                  }`}
                  title={`${section?.numSeats + " " + "Seats" || "Unnamed"}`}
                >
                  {section.name || "Unnamed"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueGrid;
