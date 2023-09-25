const express = require("express");
const { registrationSchema } = require("../../schemas/users");
const { registerUser, loginUser, logoutUser, getCurrentUser } = require("../../models/users");
const auth = require("./middlewares/auth");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }
  const respone = await registerUser(req.body);
  if (respone?.error) {
    res.status(409).send(respone?.error);
    return;
  }
  res.status(201);
  res.json(respone);
});

router.post("/login", async (req, res, next) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }
  try {
    const respone = await loginUser(req.body);
    res.status(201);
    res.json(respone);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/logout", auth, async (req, res, next) => {
  try {
    await logoutUser(req.user);
    res.status(204);
    res.json();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/current", auth, async (req, res, next) => {
    try {
      const currentUser = await getCurrentUser(req.user);
      res.status(200);
      res.json(currentUser);
    } catch (error) {
      res.status(400).send(error);
    }
  });

module.exports = router;
