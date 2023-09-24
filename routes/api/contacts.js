const express = require("express");
const contacts = require("../../models/contacts");
const {
  contactDataSchema,
  updateContactSchema,
  idSchema,
  favoriteSchema,
} = require("../../schemas/contacts");
const auth = require("./middlewares/auth");

const router = express.Router();

router.get("/", auth, async (req, res, next) => {
  try {
    const { page = 1, limit = 0, favorite } = req.query;
    const allContacts = await contacts.listContacts({
      page: +page,
      limit: +limit,
      favorite
    });
    res.json(allContacts);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:contactId", auth, async (req, res, next) => {
  const { error } = idSchema.validate(req.params);
  if (error) {
    res.status(400).send(error);
    return;
  }
  const constact = await contacts.getContactById(req.params?.contactId);
  if (constact) {
    res.json(constact);
  } else {
    res.status(404).send({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const { error } = contactDataSchema.validate(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }
  const updatedContacts = await contacts.addContact(req.body);
  res.status(201);
  res.json(updatedContacts);
});

router.delete("/:contactId", async (req, res, next) => {
  const { error } = idSchema.validate(req.params);
  if (error) {
    res.status(400).send(error);
    return;
  }
  const wasContantDeleted = await contacts.removeContact(req.params?.contactId);
  if (wasContantDeleted) {
    res.status(201).send({ message: "contact deleted" });
  } else {
    res.status(404).send({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error: wrongContactData } = updateContactSchema.validate(req.body);
  const { error: wrongContactId } = idSchema.validate(req.params);
  const error = wrongContactData || wrongContactId;
  if (error) {
    res.status(400).send(error);
    return;
  }
  if (error) {
    res.status(400).send(error);
    return;
  }
  const updatedContacts = await contacts.updateContact(
    req.params?.contactId,
    req.body
  );
  res.json(updatedContacts);
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  const { error: wrongContactData } = favoriteSchema.validate(req.body);
  const { error: wrongContactId } = idSchema.validate(req.params);
  const error = wrongContactData || wrongContactId;
  if (error) {
    res.status(400).send(error);
    return;
  }
  if (error) {
    res.status(400).send(error);
    return;
  }
  const updatedContacts = await contacts.updateContact(
    req.params?.contactId,
    req.body
  );
  res.json(updatedContacts);
});

module.exports = router;
