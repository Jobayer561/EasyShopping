
export const DisplayPriceInTaka = (price) => {
  return `৳ ${Number(price).toLocaleString("en-BD")}`;
};