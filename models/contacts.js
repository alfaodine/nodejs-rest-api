const ContactsModel = require("../db/models/contacts");

const listContacts = async ({ page, limit, favorite, userId }) => {
  const skip = (page - 1) * limit;
  const contactsQuery = ContactsModel.find({owner: userId})
  if (favorite) {
    contactsQuery.where("favorite").equals(favorite);
  }
  contactsQuery.skip(skip).limit(limit);
  return contactsQuery;
};

const getContactById = async (contactId, userId) => {
  const contact = await ContactsModel.findOne({ _id: contactId, owner: userId });
  return contact || null;
};

const removeContact = async (contactId, userId) => {
  try {
    await ContactsModel.deleteOne({ _id: contactId, owner: userId });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const addContact = async (body, userId) => {
  const contact = new ContactsModel({...body, owner: userId});
  await contact.save();
  return contact;
};

const updateContact = async (contactId, body, userId) => {
  const updatedContact = await ContactsModel.findOneAndUpdate(
    { _id: contactId, owner: userId },
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
