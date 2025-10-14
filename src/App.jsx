import React, { useState, useEffect, useRef } from "react";

import VenueGrid from "./components/VenueGrid";
import Sidebar from "./components/Sidebar";
import Hearder from "./components/Hearder";
import { generateConfig } from "./utils/helper";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [outputString, setOutputString] = useState({});
  const [eventId, setEventId] = useState("");
  const [selectedSections, setSelectedSections] = useState([]);
  const [error, setError] = useState("");
  const isUserInputting = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pubapi.ticketmaster.com/sdk/static/manifest/v1/${eventId}`
        );
        if (!response.ok) {
          setData([]);
        }
        const data = await response.json();
        setError("");
        setData(data.manifestSections || []);
        setSelectedSections([]);
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
        // Add section if not selected
        return [...prev, { ...section, price: "", rowCount: "" }];
      }
    });
  };

  // Copy to clipboard
  const copyToClipboard = async (method) => {
    const outputString = generateConfig(inputs);
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
  const updateInput = (index, field, value) => {
    isUserInputting.current = true;
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);

    // Reset the flag after a brief delay
    setTimeout(() => {
      isUserInputting.current = false;
    }, 0);
  };

  const removeRow = (index) => {
    if (inputs.length) {
      const removedSection = inputs[index];

      // Remove from selected sections
      setSelectedSections((prev) =>
        prev.filter((section) => section.name !== removedSection.section)
      );
    }
  };

  // Reset all inputs
  const resetInputs = () => {
    setInputs([]);
    if (selectedSections) {
      setSelectedSections([]);
    }
  };

  const isSelected = (section) => {
    return selectedSections?.some((selected) => selected.name === section.name);
  };

  useEffect(() => {
    // Don't update if user is currently inputting
    if (isUserInputting.current) {
      return;
    }

    if (selectedSections.length > 0) {
      // Preserve existing input values when sections change
      const formattedInputs = selectedSections.map((section) => {
        const existingInput = inputs.find(
          (input) => input.section === section.name
        );
        return {
          section: section.name,
          price: existingInput?.price || "",
          rowCount: existingInput?.rowCount || "",
          originalSection: section,
        };
      });
      setInputs(formattedInputs);
    } else {
      setInputs([]);
    }
  }, [selectedSections]);

  useEffect(() => {
    const outputString = generateConfig(inputs);
    setOutputString(outputString);
  }, [inputs]);

  return (
    <>
      <div className="h-screen flex overflow-hidden">
        {/* sidebar */}
        <div className="hidden  md:block md:w-72 lg:w-96  sticky top-0  border z-20 overflow-y-auto">
          <Sidebar
            inputs={inputs}
            outputString={outputString}
            copyToClipboard={copyToClipboard}
            updateInput={updateInput}
            removeRow={removeRow}
            resetInputs={resetInputs}
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
          <div className="p-4 w-full overflow-auto">
            <VenueGrid
              data={data}
              selectedSections={selectedSections}
              onSectionClick={handleSectionClick}
              isSelected={isSelected}
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
