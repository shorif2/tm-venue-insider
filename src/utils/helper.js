import { useMemo } from "react";

export const getCategoryColor = (category) => {
  const colors = {
    "GA/PIT/Others": "bg-[#B8E6FE]",
    "100s": "bg-[#C3E1AF]",
    "200s": "bg-[#E0C8EE]",
    "300s": "bg-[#A7F6D2]",
    "400s": "bg-[#DDF783]",
    "500s": "bg-[#FEC2CC]",
    "600s": "bg-[#FBDE9D]",
    "700s": "bg-[#FEC2CC]",
    "Lower-1": "bg-[#FEC2CC]",
    "Lower-2": "bg-[#FBDE9D]",
  };
  return colors[category] || "bg-orange-200";
};

export const useCategorizedSections = (data) => {
  return useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return {};

    const categories = {};
    const names = data.map((s) => s.name?.toUpperCase().trim() || "");

    // Detect all valid double-letter sections (AA, BB, CC, etc.)
    const validDoubleLetters = new Set(
      names.filter((name) => /^[A-Z]{2}$/.test(name) && name[0] === name[1])
    );

    for (const section of data) {
      const name = section.name?.toUpperCase().trim() || "";
      let key;

      // 3-digit numeric sections
      const numMatch = name.match(/^(\d{3})/);
      if (numMatch) {
        key = `${numMatch[1][0]}00s`;
      }
      // 1-2 digit numeric sections with optional letters/ranges like 1A, 4B-BX
      else if (
        /^\d{1,2}[A-Z]{1,2}(-[A-Z]+)?$/.test(name) ||
        /^\d{1,2}$/.test(name)
      ) {
        key = "Lower-2";
      }
      // Double letters that are valid (AA, BB, CC, etc.)
      else if (validDoubleLetters.has(name)) {
        key = "Lower-1";
      }
      // Single letter that has a corresponding valid double letter
      else if (
        (/^[A-Z]$/.test(name) && validDoubleLetters.has(name + name)) ||
        /^[A-Z]$/.test(name)
      ) {
        key = "Lower-1";
      }
      // Everything else
      else {
        key = "GA/PIT/Others";
      }

      if (!categories[key]) categories[key] = [];
      categories[key].push(section);
    }

    // Sort each category numerically/alphabetically
    Object.keys(categories).forEach((key) => {
      categories[key].sort((a, b) => {
        const aNum = parseInt(a.name, 10);
        const bNum = parseInt(b.name, 10);

        if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;

        return a.name.localeCompare(b.name, undefined, { numeric: true });
      });
    });

    // Define display order
    const order = [
      "GA/PIT/Others",
      "Lower-1",
      "Lower-2",
      "100s",
      "200s",
      "300s",
      "400s",
      "500s",
      "600s",
      "700s",
      "800s",
      "900s",
    ];

    const orderedCategories = {};
    for (const key of order) {
      if (categories[key]) orderedCategories[key] = categories[key];
    }

    // Add any uncategorized categories dynamically
    for (const key of Object.keys(categories)) {
      if (!orderedCategories[key]) orderedCategories[key] = categories[key];
    }

    return orderedCategories;
  }, [data]);
};

export const generateConfig = (inputs) => {
  const secConfig = inputs
    .filter((input) => input.name && input.price)
    .map((input) => {
      const price = input.price;
      if (input.rowCount) {
        return `${input.name}=${price}*${input.rowCount}`;
      }
      return `${input.name}=${price}`;
    })
    .join(",");

  const section = inputs
    .filter((input) => input.name)
    .map((input) => {
      return input.name;
    })
    .join(",");
  return { secConfig, section };
};

export const getSectionColor = (section) => {
  const name = section?.toLowerCase() || "";
  let color;

  if (/^1\d\d/.test(name)) color = "#C3E1AF";
  else if (/^2\d\d/.test(name)) color = "#E0C8EE";
  else if (/^3\d\d/.test(name)) color = "#A7F6D2";
  else if (/^4\d\d/.test(name)) color = "#DDF783";
  else if (/^5\d\d/.test(name)) color = "#FEC2CC";
  else if (/^6\d\d/.test(name)) color = "#FBDE9D";
  else if (/^7\d\d/.test(name)) color = "#FEC2CC";
  else if (
    /^0\d/.test(name) ||
    /^1\d/.test(name) ||
    /^2\d/.test(name) ||
    /^3\d/.test(name)
  )
    color = "#FEC2CC";
  else {
    color = "#B8E6FE";
  }
  return color;
};
