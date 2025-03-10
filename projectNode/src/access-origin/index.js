const ACCESS_ORIGIN = ["http://localhost:5173", "http://127.0.0.1:5173"];

const options = {
  origin: (origin, callback) => {
    if (ACCESS_ORIGIN.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback("No tiene acceso al recurso con nosotros.");
    }
  },
  method: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

module.exports = { options };
