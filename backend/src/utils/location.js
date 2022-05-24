const deleteCommas = (str) => {
  return str.replace(/,/g, "");
};

const deleteProvince = (str) => {
  return str.replace("provincia de", "");
};

const deleteSpaces = (str) => {
  return str.replace("  ", " ");
};

const normalizeStr = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const normalize = (str) => {
  const lower = str.toLowerCase();
  const normalized = normalizeStr(lower);
  const deletedCommas = deleteCommas(normalized);
  const deletedProvince = deleteProvince(deletedCommas);
  const deletedSpaces = deleteSpaces(deletedProvince);

  return deletedSpaces.trim();
};

module.exports = {
  normalize,
};
