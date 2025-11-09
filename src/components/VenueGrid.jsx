import { getCategoryColor, useCategorizedSections } from "../utils/helper";
import { Tooltip } from "react-tooltip";
import EmptySection from "./EmptySection";
import Error from "./Error";
import Masonry from "react-masonry-css";
import RectangleLoader from "./RectangleLoader";

const VenueGrid = ({ data, onSectionClick, isSelected, error, loading }) => {
  const categorizedSections = useCategorizedSections(data);
  if (loading) return <RectangleLoader />;
  if (error) return <Error error={error} />;
  if (!data || data.length === 0) return <EmptySection />;

  const breakpointColumnsObj = {
    default: 4,
    1500: 5,
    1280: 3,
    1024: 3,
    768: 2,
    425: 1,
    0: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {Object.entries(categorizedSections).map(([category, sections]) => (
        <div
          key={category}
          className=" fade-in bg-gray-50 rounded-lg p-3 border border-gray-200 break-inside-avoid"
        >
          {/* Category Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center ">
              <div
                className={`w-2 h-2 rounded-full ${getCategoryColor(
                  category
                )} mr-2`}
              ></div>
              <h3 className="text-sm font-semibold text-gray-900">
                {category} ({sections.length})
              </h3>
            </div>
            <button
              onClick={() => onSectionClick?.(sections)}
              className="text-sm font-semibold  text-gray-900 border border-gray-300 px-2  rounded hover:bg-gray-100 transition"
            >
              Select All
            </button>
          </div>

          {/* Section Grid */}
          <div className="grid grid-cols-4 gap-2">
            {sections.map((section, index) => (
              <button
                data-tooltip-id="my-tooltip"
                key={`${category}-${index}`}
                onClick={() => onSectionClick?.(section)}
                className={`border ${getCategoryColor(
                  category
                )}  hover:scale-110 transition-all duration-200 rounded px-3 py-2 text-xs font-medium min-h-[24px] flex items-center justify-center ${
                  isSelected(section)
                    ? "ring-2 ring-yellow-400 ring-offset-1"
                    : ""
                }`}
                // title={`${section?.numSeats + " " + "Seats" || "Unnamed"}`}
              >
                {section.name || "Unnamed"}
              </button>
            ))}
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default VenueGrid;
