import { useState } from "react";

const VenueCardHeader = ({ category, sections, onSectionClick }) => {
  const [price, setPrice] = useState("");
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center ">
        {/* <div className={`w-2 h-2 rounded-full mr-2`}></div> */}
        <h3 className="text-sm font-semibold text-gray-900">
          {category || ""} ({sections.length})
        </h3>
      </div>
      <input
        type="text"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-16 h-6 px-2  border rounded  text-sm  focus:outline-none focus:border-blue-400 transition-colors"
      />
      <button
        onClick={() => onSectionClick?.(sections, price)}
        className="text-sm font-semibold  text-gray-900 border border-gray-300 px-2  rounded hover:bg-gray-100 transition"
      >
        Select All
      </button>
    </div>
  );
};

export default VenueCardHeader;
