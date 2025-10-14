import { Copy, RotateCcw, SquareMousePointer, Telescope } from "lucide-react";
import SelectedSection from "./SelectedSection";

const Sidebar = ({
  inputs,
  outputString,
  updateInput,
  removeRow,
  copyToClipboard,
  resetInputs,
}) => {
  return (
    <div className="h-full flex flex-col p-2 lg:p-4">
      <h1 className="inline-flex justify-center items-center text-center gap-2 text-xl font-bold text-gray-900">
        <Telescope className="" /> TM Venue Insider
      </h1>
      <div className="flex justify-between items-center pt-4">
        <div className="font-medium text-gray-700 my-4">
          Sec Config {inputs.length > 0 && `(${inputs.length})`}
        </div>
        <button
          onClick={resetInputs}
          disabled={inputs.length === 0}
          className={`inline-flex items-center gap-2 border px-2 py-0.5 rounded bg-red-200 text-sm font-medium cursor-pointer hover:text-white`}
          title="Reset all"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>
      {/* external */}
      <div className="relative mb-3">
        <textarea
          value={outputString.secConfig}
          placeholder="Section config will be displayed here..."
          readOnly
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
      <div className="relative mb-3">
        <textarea
          value={outputString.section}
          placeholder="Section will be displayed here..."
          readOnly
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
        {inputs.length > 0 ? (
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
              {inputs.map((input, index) => (
                <SelectedSection
                  key={index}
                  index={index}
                  input={input}
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
