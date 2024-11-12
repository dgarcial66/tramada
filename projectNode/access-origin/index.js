const ACCESS_ORIGIN = ["http://localhost:5173"];

const options = {
  origin: (origin, callback) => {
    if (ACCESS_ORIGIN.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback("No tiene acceso al recurso con nosotros.");
    }
  },
};

module.exports = { options };
