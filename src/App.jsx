import { useState, useEffect } from "react";
import VenueGrid from "./components/VenueGrid";
import Sidebar from "./components/Sidebar";
import Hearder from "./components/Hearder";
import { generateConfig } from "./utils/helper";
import { Analytics, track } from "@vercel/analytics/react";
import { ArrowRightLeft } from "lucide-react";
export const defaultData = [
  { name: "", price: "", rows: "" },
  { name: "", price: "", rows: "" },
  { name: "", price: "", rows: "" },
  { name: "", price: "", rows: "" },
];
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [outputString, setOutputString] = useState({});
  const [eventId, setEventId] = useState("");
  const [selectedSections, setSelectedSections] = useState(defaultData);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setData([]);
        const response = await fetch(
          `https://pubapi.ticketmaster.com/sdk/static/manifest/v1/${eventId}`
        );

        if (!response.ok) {
          setData([]);
          return;
        }
        const data = await response.json();
        setError("");
        setData(data.manifestSections || []);
        setSelectedSections(defaultData);
        track("fetch_data", { endpoint: "api/manifest", success: true });
      } catch (error) {
        setError("Error fetching data: Please input a valid venue ID");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchData();
  }, [eventId]);

  const handleSectionClick = (section) => {
    setSelectedSections((prev) => {
      let updated = [...prev];

      // Helper function for adding an individual section
      const addOrToggleSection = (sec) => {
        const isAlreadySelected = updated.some(
          (selected) => selected.name === sec.name
        );

        if (isAlreadySelected) {
          // Remove if already selected
          updated = updated.filter((selected) => selected.name !== sec.name);
        } else {
          // Find first empty row
          const emptyIndex = updated.findIndex(
            (item) => !item.name && !item.price && !item.rows
          );

          if (emptyIndex !== -1) {
            // Replace the first empty row
            updated[emptyIndex] = { ...sec, price: "", rows: "" };
          } else {
            // Add new section
            updated.push({ ...sec, price: "", rows: "" });
          }
        }
      };

      // 🔄 Handle either an array or a single object
      if (Array.isArray(section)) {
        section.forEach((sec) => addOrToggleSection(sec));
      } else {
        addOrToggleSection(section);
      }

      // ✅ Always ensure there's at least one empty row
      const hasEmptyRow = updated.some(
        (item) => !item.name && !item.price && !item.rows
      );
      if (!hasEmptyRow) {
        updated.push({ name: "", price: "", rows: "" });
      }

      return updated;
    });
  };

  // Copy to clipboard
  const copyToClipboard = async (method) => {
    const outputString = generateConfig(selectedSections);
    try {
      if (method === "secConfig") {
        await navigator.clipboard.writeText(outputString.secConfig);
      }

      if (method === "section") {
        await navigator.clipboard.writeText(outputString.section);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const isSelected = (section) => {
    return selectedSections?.some((selected) => selected.name === section.name);
  };

  const handleEditSec = (sections) => {
    if (!sections) return;

    const sectionArr = sections
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setSelectedSections((prev) => {
      // Build the new section list
      const updatedSections = sectionArr.map((secName) => {
        // Check if this section already exists
        const existing = prev.find((sec) => sec.name === secName);

        // Keep old if exists, else add a new one
        return (
          existing || {
            name: secName,
            price: "",
            rowCount: "",
          }
        );
      });

      return updatedSections;
    });
  };

  const handleEditConfig = (sections) => {
    if (!sections) return;

    const sectionArr = sections
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((item) => {
        const [secPart, valuePart] = item.split("=");
        const [price, rowCount] = valuePart ? valuePart.split("*") : ["", ""];

        return {
          name: secPart || "",
          price: price || "",
          rowCount: rowCount || "",
        };
      });

    setSelectedSections(sectionArr);
  };

  useEffect(() => {
    const outputString = generateConfig(selectedSections);
    setOutputString(outputString);
  }, [selectedSections]);

  return (
    <>
      <div className="relative h-screen flex overflow-hidden">
        {/* sidebar */}
        <div
          className={`hidden  md:block  md:w-72 lg:w-96 ${
            order && "order-2 transform transition-all duration-500 ease-in-out"
          }  sticky top-0  border z-20 overflow-y-auto `}
        >
          <h2
            className={`absolute right-0 mx-4 my-1.5  text-gray-500 hover:text-gray-300 cursor-pointer ${
              order && "left-0"
            }`}
            title="Change to Left/Right"
            onClick={() => setOrder(!order)}
          >
            <ArrowRightLeft className="w-[18px]" />
          </h2>
          <Sidebar
            outputString={outputString}
            selectedSections={selectedSections}
            setSelectedSections={setSelectedSections}
            copyToClipboard={copyToClipboard}
            onEditSection={handleEditSec}
            onEditConfig={handleEditConfig}
          />
        </div>
        {/* main content  */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Hearder */}
          <div className="w-full sticky top-0 z-20 shadow-sm bg-white p-4">
            <Hearder
              loading={loading}
              eventId={eventId}
              secCount={data?.length}
              setEventId={setEventId}
            />{" "}
          </div>
          {/* Venue grid */}
          <div className="py-4 pr-4 w-full overflow-auto">
            <VenueGrid
              data={data}
              selectedSections={selectedSections}
              onSectionClick={handleSectionClick}
              isSelected={isSelected}
              loading={loading}
              error={error}
            />
            <div>
              {eventId && (
                <img
                  className="grayscale"
                  src={`https://mapsapi.tmol.io/maps/geometry/3/event/${eventId}/staticImage?type=png&systemId=HOST`}
                  alt="Map"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Analytics />
    </>
  );
}

export default App;
