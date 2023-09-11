const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, ".", "contacts.json");
const listContacts = async () => {
  const fileData = await fs.readFile(contactsPath, (err) => {
    if (err) throw err;
  });
  return JSON.parse(fileData);
};

const getContactById = async (contactId) => {
  const fileData = await fs.readFile(contactsPath, (err) => {
    if (err) throw err;
  });
  const contacts = JSON.parse(fileData);
  const requestedContact = contacts.find((contact) => contact.id === contactId);

  return requestedContact || null;
};

const removeContact = async (contactId) => {
  const fileData = await fs.readFile(contactsPath, (err) => {
    if (err) throw err;
  });
  const contacts = JSON.parse(fileData);
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return contacts.length > updatedContacts.length;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const fileData = await fs.readFile(contactsPath, (err) => {
    if (err) throw err;
  });
  const contacts = JSON.parse(fileData);
  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const fileData = await fs.readFile(contactsPath, (err) => {
    if (err) throw err;
  });
  const contacts = JSON.parse(fileData);
  let isContactFound = false;
  const updatedContacts = contacts.map((contact) => {
    if (contact.id === contactId) {
      isContactFound = true;
      return {
        ...contact,
        ...(name && { name }),
        ...(email && { email }),
        ...(phone && { phone }),
      };
    }
    return contact;
  });
  if (!isContactFound) return { message: "Not found" };

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return updatedContacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
