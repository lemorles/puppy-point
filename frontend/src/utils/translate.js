export const translateSize = (size) => {
  switch (size) {
    case "small":
      return "Pequeño";
    case "medium":
      return "Mediano";
    case "large":
      return "Grande";
    case "giant":
      return "Extra grande";
    default:
      break;
  }
};

export const translateDay = (day) => {
  switch (day) {
    case "monday":
      return "Lunes";
    case "tuesday":
      return "Martes";
    case "wednesday":
      return "Miércoles";
    case "thursday":
      return "Jueves";
    case "friday":
      return "Viernes";
    case "saturday":
      return "Sábado";
    case "sunday":
      return "Domingo";
    default:
      break;
  }
};

export const translateShift = (shift) => {
  switch (shift) {
    case "morning":
      return "Mañana";
    case "afternoon":
      return "Tarde";
    case "evening":
      return "Noche";
    default:
      break;
  }
};

export const dayReName = (info) => {
  const array = info.split("-");
  if (array[0] === "Monday") {
    if (array[1] === "Morning") {
      return "Lunes por la Mañana";
    } else if (array[1] === "Afternoon") {
      return "Lunes por la Tarde";
    } else if (array[1] === "Evening") {
      return "Lunes por la Noche";
    }
  } else if (array[0] === "Tuesday") {
    if (array[1] === "Morning") {
      return "Martes por la Mañana";
    } else if (array[1] === "Afternoon") {
      return "Martes por la Tarde";
    } else if (array[1] === "Evening") {
      return "Martes por la Noche";
    }
  } else if (array[0] === "Wednesday") {
    if (array[1] === "Morning") {
      return "Miercoles por la Mañana";
    } else if (array[1] === "Afternoon") {
      return "Miercoles por la Tarde";
    } else if (array[1] === "Evening") {
      return "Miercoles por la Noche";
    }
  } else if (array[0] === "Thursday") {
    if (array[1] === "Morning") {
      return "Jueves por la Mañana";
    } else if (array[1] === "Afternoon") {
      return "Jueves por la Tarde";
    } else if (array[1] === "Evening") {
      return "Jueves por la Noche";
    }
  } else if (array[0] === "Friday") {
    if (array[1] === "Morning") {
      return "Viernes por la Mañana";
    } else if (array[1] === "Afternoon") {
      return "Viernes por la Tarde";
    } else if (array[1] === "Evening") {
      return "Viernes por la Noche";
    }
  } else if (array[0] === "Saturday") {
    if (array[1] === "Morning") {
      return "Sábado por la Mañana";
    } else if (array[1] === "Afternoon") {
      return "Sábado por la Tarde";
    } else if (array[1] === "Evening") {
      return "Sábado por la Noche";
    }
  } else if (array[0] === "Sunday") {
    if (array[1] === "Morning") {
      return "Domingo por la Mañana";
    } else if (array[1] === "Afternoon") {
      return "Domingo por la Tarde";
    } else if (array[1] === "Evening") {
      return "Domingo por la Noche";
    }
  }
};

export const statusTranslate = (status) => {
  switch (status) {
    case "rejected":
      return "rechazado";
    case "approved":
      return "aprobado";
    case "pending":
      return "pendiente";
    default:
      break;
  }
};
