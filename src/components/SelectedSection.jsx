import React from "react";
import { getSectionColor } from "../utils/helper";
import { Trash, X } from "lucide-react";

const SelectedSection = ({ updateInput, removeRow, section }) => {
  const textColor = getSectionColor(section?.section);
  return (
    <tr className="">
      <td
        style={{ backgroundColor: textColor }}
        className={`border px-0 lg:px-4 text-center py-2.5 `}
      >
        {section.name}
      </td>

      {/* PRICE INPUT */}
      <td className="border p-0  w-24">
        <input
          type="number"
          value={section.price}
          onChange={(e) => updateInput(section.name, "price", e.target.value)}
          placeholder="$"
          className="w-full h-full px-2 py-2 text-center outline-none border-none  

[&::-webkit-outer-spin-button]:appearance-none
[&::-webkit-inner-spin-button]:appearance-none
[appearance:textfield]"
          title="Enter price"
        />
      </td>

      {/* ROW COUNT INPUT */}
      <td className="border p-0 lg:w-16">
        <input
          type="number"
          value={section.rowCount}
          onChange={(e) =>
            updateInput(section.name, "rowCount", e.target.value)
          }
          placeholder="-"
          className="w-full h-full px-2 py-2 text-center outline-none border-none  

[&::-webkit-outer-spin-button]:appearance-none
[&::-webkit-inner-spin-button]:appearance-none
[appearance:textfield]"
        />
      </td>

      {/* REMOVE BUTTON */}
      <td className="border text-center px-2 py-1 lg:w-16">
        <button
          onClick={() => removeRow(section.name)}
          className=" text-gray-500 hover:text-red-500 transition-colors"
        >
          <X className="w-4 lg:w-[18px]" />
        </button>
      </td>
    </tr>
  );
};

export default SelectedSection;
