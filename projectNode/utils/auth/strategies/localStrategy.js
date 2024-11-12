const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const { UserService } = require("../../../service/userService.js");

const service = new UserService();

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
  },
  async (email, password, done) => {
    console.log("SOY PROPIEDADES: ", email, password);
    try {
      const [user] = await service.findForAuth(email);
      console.log("SOY USER IN LOCAL STRATE: ", user);

      if (!user) {
        done(`${email} no esta registrado.`, false);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      console.log("QUE SOY ISMATCH: ", isMatch);
      if (!isMatch) {
        done(`La contraseña del email ${user.email} no es correcta`, false);
      }

      delete user.password;

      done(null, user);
    } catch (err) {
      done("Error al autenticar el usuario.", false);
    }
  }
);

module.exports = { localStrategy };
