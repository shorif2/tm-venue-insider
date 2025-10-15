import { Copy, RotateCcw, SquareMousePointer, Telescope } from "lucide-react";
import SelectedSection from "./SelectedSection";
import { useState } from "react";

const Sidebar = ({
  outputString,
  updateInput,
  removeRow,
  copyToClipboard,
  selectedSections,
  setSelectedSections,
  onEditSection,
  onEditConfig,
}) => {
  const [isTyping, setIstyping] = useState(false);
  const [sec, setSec] = useState("");
  const [config, setConfig] = useState("");

  const handleFocus = () => {
    setSec(outputString.section);
    setConfig(outputString.secConfig);
    setIstyping(true);
  };

  const onBlue = () => {
    onEditSection(sec);
    setSec("");
    setConfig("");
    setIstyping(false);
  };

  return (
    <div className="h-full flex flex-col p-2 lg:p-4">
      <h1 className="inline-flex justify-center items-center text-center gap-2 text-xl font-bold text-gray-900">
        <Telescope className="" /> TM Venue Insider
      </h1>

      <div className="flex justify-between items-center pt-4">
        <div className="font-medium text-gray-700 my-4">
          Sec Config{" "}
          {selectedSections.length > 0 && `(${selectedSections.length})`}
        </div>
        <button
          onClick={() => setSelectedSections([])}
          disabled={selectedSections.length === 0}
          className={`inline-flex items-center gap-2 border px-2 py-0.5 rounded bg-red-200 text-sm font-medium cursor-pointer hover:text-white`}
          title="Reset all"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>
      {/* sec config */}
      <div className="relative mb-3">
        <textarea
          value={isTyping ? config : outputString.secConfig}
          placeholder="Section config will be displayed here..."
          onFocus={handleFocus}
          onBlur={onBlue}
          onChange={(e) => {
            onEditConfig(e.target.value);
            setConfig(e.target.value);
          }}
          className="w-full h-24 px-2 py-1.5 pr-10  border rounded text-gray-500  text-sm  focus:outline-none focus:border-blue-400 transition-colors bg-white"
        />
        <div className="absolute right-2 top-1 flex gap-2">
          <button
            onClick={() => copyToClipboard("secConfig")}
            disabled={!outputString}
            className={`cursor-pointer p-2 hover:text-green-500`}
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* seat Config */}
      <div className="relative mb-3">
        <textarea
          value={isTyping ? sec : outputString.section}
          onFocus={handleFocus}
          onBlur={onBlue}
          onChange={(e) => {
            setSec(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.target.blur();
            }
          }}
          placeholder="Section will be displayed here..."
          className="w-full px-2  pt-1.5 pr-10 bg-white border rounded text-gray-500  text-sm  focus:outline-none focus:border-blue-400 transition-colors"
        />
        <div className="absolute right-2 top-0 flex gap-2">
          <button
            onClick={() => copyToClipboard("section")}
            disabled={!outputString}
            className={`cursor-pointer p-2 hover:text-green-500`}
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div
        className="flex-1 min-h-0 overflow-y-auto "
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#d1d5db transparent",
        }}
      >
        {selectedSections.length > 0 ? (
          <table className="min-w-full border-collapse text-xs text-left">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 border text-center">Section</th>
                <th className="px-3 py-2 border text-center">Price</th>
                <th className="px-3 py-2 border text-center">Rows</th>
                <th className="px-3 py-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedSections.map((section, index) => (
                <SelectedSection
                  key={index}
                  index={index}
                  section={section}
                  updateInput={updateInput}
                  removeRow={removeRow}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <SquareMousePointer className="mx-auto h-6 w-8 mb-2" />
            <p className="text-xs">
              Click on sections in the venue grid below to start generating
              strings
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
