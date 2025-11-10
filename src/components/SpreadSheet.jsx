import { useRef } from "react";
import { HotTable } from "@handsontable/react-wrapper";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";

registerAllModules();

const SpreadSheet = ({ data, setSelectedSections }) => {
  const hotRef = useRef(null);

  const handleAfterChange = (changes, source) => {
    if (source === "loadData" || !changes) return;

    setSelectedSections((prevData) => {
      const updated = [...prevData];
      changes.forEach(([row, prop, oldValue, newValue]) => {
        updated[row][prop] = newValue;
      });

      const lastRow = updated[updated.length - 1];
      const isLastRowFilled =
        lastRow.name !== "" || lastRow.price !== "" || lastRow.rowCount !== "";

      if (isLastRowFilled) {
        updated.push({ name: "", price: "", rowCount: "" });
      }
      return updated;
    });
  };

  return (
    <HotTable
      themeName="ht-theme-main"
      ref={hotRef}
      startRows={5}
      data={data}
      rowHeaders={true}
      colHeaders={["Section", "Price", "Rows"]}
      columns={[
        { data: "name", type: "text" },
        { data: "price", type: "numeric" },
        { data: "rows", type: "numeric" },
      ]}
      minSpareCols={1}
      stretchH="all"
      width="100%"
      height="auto"
      licenseKey="non-commercial-and-evaluation"
      afterChange={handleAfterChange}
    />
  );
};

export default SpreadSheet;
