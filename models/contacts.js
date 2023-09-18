const fs = require("fs/promises");
const path = require("path");
const ContactsModel = require("../db/models/contacts");

const contactsPath = path.join(__dirname, ".", "contacts.json");
const listContacts = async () => {
  const fileData = await fs.readFile(contactsPath, (err) => {
    if (err) throw err;
  });
  return JSON.parse(fileData);
};

const getContactById = async (contactId) => {
  const contact = await ContactsModel.findById(contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  try {
    await ContactsModel.deleteOne({ _id: contactId });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const addContact = async (body) => {
  const contact = new ContactsModel(body);
  await contact.save();
  return contact;
};

const updateContact = async (contactId, body) => {
  const updatedContact = await ContactsModel.findByIdAndUpdate(
    contactId,
    {
      $set: {
        ...body,
      },
    },
    { returnOriginal: false }
  );

  return updatedContact || { message: "Not found" };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
