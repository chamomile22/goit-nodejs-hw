const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const filepath = path.resolve("db", "contacts.json");

async function listContacts() {
	const data = await fs.readFile(filepath, "utf-8");
	return JSON.parse(data);
}

async function getContactById(contactId) {
	const contacts = await listContacts();
	const contactById = contacts.find((contact) => contact.id === contactId);

	if (!contactById) null;

	return contactById;
}

async function addContact(name, email, phone) {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};
	contacts.push(newContact);

	await fs.writeFile(filepath, JSON.stringify(contacts, null, 2));
	return newContact;
}

async function removeContact(contactId) {
	const contacts = await listContacts();
	const index = contacts.findIndex((contact) => contact.id === contactId);

	if (index === -1) null;

	const result = contacts.splice(index, 1)[0];
	await fs.writeFile(filepath, JSON.stringify(contacts, null, 2));

	return result;
}

module.exports = {
	listContacts,
	getContactById,
	addContact,
	removeContact,
};
