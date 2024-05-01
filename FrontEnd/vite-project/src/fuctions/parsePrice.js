function parsePrice(price) {
  if (!price) return 0;
  const stringPrice = price.toString()
  let [integerPart, decimalPart] = stringPrice.split(".");

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const priceFix = integerPart + "," + (decimalPart || "00");
  return priceFix;
}

export default parsePrice;

