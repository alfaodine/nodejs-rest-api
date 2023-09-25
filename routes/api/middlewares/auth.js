const passport = require("passport");
const createError = require("../../../utils/createError");
const { Strategy, ExtractJwt } = require("passport-jwt");
const ERROR_TYPES = require("../../../contants/constants");
const { JWT_SECRET } = require("../../../contants/env");
const { getUsertById } = require("../../../models/users");

const jwtStrategy = new Strategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken(),
    ]),
  },
  async (payload, done) => {
    try {
      const user = await getUsertById(payload.id);
      if (user) {
        return done(null, user);
      } else {
        const err = createError(ERROR_TYPES.UNAUTHORIZED, {
          message: "Unauthorized",
        });
        return done(err, null);
      }
    } catch (err) {
      return done(err, null);
    }
  }
);

passport.use(jwtStrategy);

const auth = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error) {
      return next(error);
    }

    if (!user || !bearerToken?.includes(user?.token)) {
      const error = createError(ERROR_TYPES.UNAUTHORIZED, {
        message: "Unauthorized",
      });
      next(error);
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth;
