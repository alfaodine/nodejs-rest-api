const SERVER_ADDRESS = "http://localhost:4000";
const getFileURL = (relUrl) => {
  return SERVER_ADDRESS + "/avatars/" + relUrl;
};

module.exports = { getFileURL };
