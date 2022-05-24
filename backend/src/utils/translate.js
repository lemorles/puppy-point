const translateDay = (day) => {
  switch (day) {
    case "monday":
      return "lunes";
    case "tuesday":
      return "martes";
    case "wednesday":
      return "miércoles";
    case "thursday":
      return "jueves";
    case "friday":
      return "viernes";
    case "saturday":
      return "sábado";
    case "sunday":
      return "domingo";
    default:
      break;
  }
};

const translateShift = (shift) => {
  switch (shift) {
    case "morning":
      return "mañana";
    case "afternoon":
      return "tarde";
    case "evening":
      return "noche";
    default:
      break;
  }
};

module.exports = {
  translateDay,
  translateShift,
};
