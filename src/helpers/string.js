export const sentenceCase = (sentence = "") => {
  if (!sentence || typeof sentence !== "string") return "";
  return sentence
    .trim()
    .split(" ")
    .map((word) => `${word[0].toUpperCase()}${word.substring(1, word.length)}`)
    .join(" ");
};
