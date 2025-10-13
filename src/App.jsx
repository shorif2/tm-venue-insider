import React, { useState, useEffect, useRef } from "react";

import VenueGrid from "./components/VenueGrid";
import Sidebar from "./components/Sidebar";
import EventIdForm from "./components/EventIdForm";
import { generateConfig } from "./utils/configGenerator";

function App() {
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [outputString, setOutputString] = useState({});
  const [eventId, setEventId] = useState("");
  const [selectedSections, setSelectedSections] = useState([]);
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

        setData(data.manifestSections || []);
        setSelectedSections([]); // clear selections
      } catch (error) {
        console.error("Error fetching data:", error);
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

  //generate sting
  useEffect(() => {
    const outputString = generateConfig(inputs);
    setOutputString(outputString);
  }, [inputs]);

  return (
    <div className="min-h-screen flex ">
      <div className="w-96 h-screen sticky top-0 border z-20 overflow-y-auto ">
        <Sidebar
          inputs={inputs}
          outputString={outputString}
          copyToClipboard={copyToClipboard}
          updateInput={updateInput}
          removeRow={removeRow}
          resetInputs={resetInputs}
        />
      </div>
      <div className="flex-1">
        <EventIdForm
          loading={loading}
          eventId={eventId}
          secCount={data?.length}
          setEventId={setEventId}
        />

        <VenueGrid
          data={data}
          selectedSections={selectedSections}
          onSectionClick={handleSectionClick}
          isSelected={isSelected}
        />
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
