import React, { useState, useEffect } from "react";

import VenueGrid from "./components/VenueGrid";
import Sidebar from "./components/Sidebar";
import Hearder from "./components/Hearder";
import { generateConfig } from "./utils/helper";
import { Analytics } from "@vercel/analytics/react";
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
        }
        const data = await response.json();
        setError("");
        setData(data.manifestSections || []);
        setSelectedSections(defaultData);
      } catch (error) {
        setError("Error fetching data: Please input a valid venue ID");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchData(); // only run when eventId exists
  }, [eventId]);

  const handleSectionClick = (section) => {
    setSelectedSections((prev) => {
      const isAlreadySelected = prev.some(
        (selected) => selected.name === section.name
      );
      if (isAlreadySelected) {
        // Remove section if already selected
        return prev.filter((selected) => selected.name !== section.name);
      } else {
        const newSelect = [{ ...section, price: "", rows: "" }, ...prev];
        return newSelect;
      }
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

  // Update input field
  const updateInput = (secName, field, value) => {
    setSelectedSections((prevSections) =>
      prevSections.map((sec) =>
        sec.name === secName ? { ...sec, [field]: value } : sec
      )
    );
  };

  const removeRow = (secName) => {
    if (selectedSections.length) {
      // Remove from selected sections
      setSelectedSections((prev) =>
        prev.filter((section) => section.name !== secName)
      );
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
      <div className="h-screen flex overflow-hidden">
        {/* sidebar */}
        <div className="hidden  md:block md:w-72 lg:w-96  sticky top-0  border z-20 overflow-y-auto">
          <Sidebar
            outputString={outputString}
            selectedSections={selectedSections}
            setSelectedSections={setSelectedSections}
            copyToClipboard={copyToClipboard}
            updateInput={updateInput}
            removeRow={removeRow}
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
          </div>
        </div>
      </div>
      <Analytics />
    </>
  );
}

export default App;
