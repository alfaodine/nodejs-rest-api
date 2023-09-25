const { saltRounds, ERROR_TYPES } = require("../contants/constants");
const UsersModel = require("../db/models/users");
const bcrypt = require("bcrypt");
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../contants/env");

const registerUser = async (body) => {
  const { email, password } = body;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const userData = {
    email,
    password: passwordHash,
  };
  const user = new UsersModel(userData);
  try {
    await user.save();
  } catch (error) {
    return { error: error.message };
  }

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await UsersModel.findOne({ email });
  const userHashedPassword = user?.password;
  const isValid = bcrypt.compare(password, userHashedPassword);

  if (!isValid) {
    const error = createError(ERROR_TYPES.UNAUTHORIZED, {
      message: "Email or password is wrong",
    });
    throw error;
  }

  const serializedUser = user.toObject();
  delete serializedUser.password;

  const token = jwt.sign({ id: serializedUser._id }, JWT_SECRET, {
    expiresIn: 3600,
  });

  const updatedUser = await UsersModel.findByIdAndUpdate(
    user.id,
    {
      $set: {
        token,
      },
    },
    { returnOriginal: false }
  );
  const serializedUpdatedUser = updatedUser.toObject();
  delete serializedUpdatedUser.password;
  return serializedUpdatedUser;
};

const logoutUser = async ({ _id }) => {
  const updatedUser = await UsersModel.findByIdAndUpdate(
    _id,
    {
      $set: {
        token: ''
      },
    },
    { returnOriginal: false }
  );
  return updatedUser;
};

const getUsertById = async (userId) => {
  const user = await UsersModel.findById(userId);
  return user || null;
};

const getCurrentUser = async ({ _id }) => {
    const currentUser = await UsersModel.findById(_id);
    return { email: currentUser.email, subscription: currentUser.subscription };
  };

module.exports = {
  registerUser,
  loginUser,
  getUsertById,
  logoutUser,
  getCurrentUser
};
