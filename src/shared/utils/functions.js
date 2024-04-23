export const objectConvert = (item) => {
  return Object.values(item).join(" ");
};

export function secontTommss(seconds) {
  return [60]
    .reduceRight(
      (p, b) => (r) => [Math.floor(r / b)].concat(p(r % b)),
      (r) => [r]
    )(seconds)
    .map((a) => a.toString().padStart(2, "0"))
    .join(":");
}

export const isEmpty = (item) => {
  return ["", " ", [], [""], null, [{}]].includes(item);
};
