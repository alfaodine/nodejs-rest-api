const path = require("path");
const saltRounds = 10;

const ERROR_TYPES = {
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
};

const STATIC_DIR = path.join(process.cwd(), "public");
const UPLOAD_DIR = path.join(process.cwd(), "public", "avatars");
const TEMP_DIR = path.join(process.cwd(), "tmp");
module.exports = { saltRounds, ERROR_TYPES, UPLOAD_DIR, STATIC_DIR, TEMP_DIR };
