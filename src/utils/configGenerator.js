export const generateConfig = (inputs) => {
  const secConfig = inputs
    .filter((input) => input.section && input.price)
    .map((input) => {
      const price = input.price;
      if (input.rowCount) {
        return `${input.section}=${price}*${input.rowCount}`;
      }
      return `${input.section}=${price}`;
    })
    .join(",");

  const section = inputs
    .filter((input) => input.section)
    .map((input) => {
      return input.section;
    })
    .join(",");
  return { secConfig, section };
};
