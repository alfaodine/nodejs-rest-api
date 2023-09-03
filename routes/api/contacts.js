const express = require('express')
const contacts = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  const allContacts = await contacts.listContacts();
  res.json(allContacts)
})

router.get('/:contactId', async (req, res, next) => {
  const constact = await contacts.getContactById(req.params?.contactId);
  if (constact) {
    res.json(constact)
  } else {
    res.status(404).send({"message": "Not found"});
  }
  
  
})

router.post('/', async (req, res, next) => {
  if (req.body?.name && req.body?.email && req.body?.phone ) {
    const updatedContacts = await contacts.addContact(req.body);
    res.status(201);
    res.json(updatedContacts);
  } else {
    res.status(400).send({"message": "missing required name field"});
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const wasContantDeleted = await contacts.removeContact(req.params?.contactId);
  if (wasContantDeleted) {
    res.status(201).send({"message": "contact deleted"})
  } else {
    res.status(404).send({"message": "Not found"});
  }
})

router.put('/:contactId', async (req, res, next) => {
  if (req.body?.name || req.body?.email || req.body?.phone ) {
    const updatedContacts = await contacts.updateContact(req.params?.contactId, req.body);
    res.json(updatedContacts)
  } else {
    res.status(400).send({"message": "missing fields"});
  }
})

module.exports = router
