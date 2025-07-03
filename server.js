const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const CONTACTS_FILE = path.join(__dirname, 'contacts.json');

// Serve static frontend files from CHECXO directory
app.use(express.static(path.join(__dirname, '../CHECXO')));

app.use(cors());
app.use(bodyParser.json());

// Helper: Read contacts from file
function readContacts() {
  if (!fs.existsSync(CONTACTS_FILE)) return [];
  const data = fs.readFileSync(CONTACTS_FILE, 'utf-8');
  return data ? JSON.parse(data) : [];
}

// Helper: Write contacts to file
function writeContacts(contacts) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
}

// POST /api/contacts - receive new contact form submission
app.post('/api/contacts', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const contacts = readContacts();
  const newContact = {
    id: Date.now(),
    name,
    email,
    message,
    date: new Date().toISOString()
  };
  contacts.push(newContact);
  writeContacts(contacts);
  res.status(201).json({ success: true });
});

// DELETE /api/contacts/:id - delete a contact request by id
app.delete('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({ error: 'Invalid id' });
  const contacts = readContacts();
  const idx = contacts.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  contacts.splice(idx, 1);
  writeContacts(contacts);
  res.json({ success: true });
});

// GET /api/contacts - get all contact requests
app.get('/api/contacts', (req, res) => {
  const contacts = readContacts();
  res.json(contacts);
});

// Fallback: serve index.html for any unknown non-API route (for SPA/deep linking support)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../CHECXO/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 