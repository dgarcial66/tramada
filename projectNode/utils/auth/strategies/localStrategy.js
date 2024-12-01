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
        return done(
          { message: `${email} no esta registrado.`, statusCode: 401 },
          false
        );
      }

      const isMatch = await bcrypt.compare(password, user.password);

      console.log("QUE SOY ISMATCH: ", isMatch);
      if (!isMatch) {
        return done(
          {
            info: `La contraseña del email ${user.email} no es correcta`,
            statusCode: 401,
          },
          false
        );
      }

      delete user.password;

      return done(null, user);
    } catch (err) {
      return done(
        { message: "Error al autenticar el usuario.", statusCode: 401 },
        false
      );
    }
  }
);

module.exports = { localStrategy };
