import { Copy, RotateCcw, Telescope, Trash } from "lucide-react";

const Sidebar = ({
  inputs,
  outputString,
  updateInput,
  removeRow,
  copyToClipboard,
  resetInputs,
}) => {
  return (
    <div className="p-4">
      <div className="">
        <h1 className="inline-flex justify-center items-center text-center gap-2 text-xl font-bold text-gray-900">
          <Telescope className="" /> TM Venue Insider
        </h1>
      </div>
      <div className="flex justify-between items-center pt-4">
        <div className="font-medium text-gray-700 my-4">
          Sec Config {inputs.length > 0 && `(${inputs.length})`}
        </div>
        <button
          onClick={resetInputs}
          disabled={inputs.length === 0}
          className={`inline-flex items-center gap-2 border px-2 py-0.5 rounded bg-red-300 text-sm font-medium cursor-pointer hover:text-white`}
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

      {inputs.length > 0 ? (
        <div className="overflow-x-auto ">
          <table className="min-w-full border border-gray-200 text-sm text-left">
            <thead className="bg-gray-100 text-gray-600  select-none">
              <tr>
                <th className="px-3 py-2 border text-center">Section</th>
                <th className="px-3 py-2 border text-center">Price ($)</th>
                <th className="px-3 py-2 border text-center">Rows</th>
                <th className="px-3 py-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {inputs.map((input, index) => (
                <tr key={index} className=" odd:bg-white even:bg-gray-50">
                  <td className="border min-w-max text-center px-6 py-2.5 font-medium">
                    {input.section}
                  </td>

                  {/* PRICE INPUT */}
                  <td className="border p-0">
                    <input
                      type="number"
                      value={input.price}
                      onChange={(e) =>
                        updateInput(index, "price", e.target.value)
                      }
                      placeholder="price"
                      className="w-full h-full px-2 py-2 text-center outline-none border-none 
                
                [&::-webkit-outer-spin-button]:appearance-none
                [&::-webkit-inner-spin-button]:appearance-none
                [appearance:textfield]"
                      title="Enter price"
                    />
                  </td>

                  {/* ROW COUNT INPUT */}
                  <td className="border p-0">
                    <input
                      type="number"
                      value={input.rowCount}
                      onChange={(e) =>
                        updateInput(index, "rowCount", e.target.value)
                      }
                      placeholder="rows"
                      className="w-full h-full px-2 py-2 text-center outline-none border-none text-xs 
                focus:ring-1 focus:ring-blue-400
                [&::-webkit-outer-spin-button]:appearance-none
                [&::-webkit-inner-spin-button]:appearance-none
                [appearance:textfield]"
                    />
                  </td>

                  {/* REMOVE BUTTON */}
                  <td className="border text-center px-2 py-1">
                    <button
                      onClick={() => removeRow(index)}
                      className=" text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash width={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <svg
            className="mx-auto h-8 w-8 text-gray-400 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
            />
          </svg>
          <p className="text-xs">
            Click on sections in the venue grid below to start generating
            strings
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
