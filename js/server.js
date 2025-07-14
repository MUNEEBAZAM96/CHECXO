const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory
app.use(cors());

// Route to handle form submissions
app.post('/api/submit-form', async (req, res) => {
  try {
    const formData = {
      ...req.body,
      submissionDate: new Date().toISOString()
    };

    // Read existing submissions
    let submissions = [];
    try {
      const data = await fs.readFile('form-submissions.json', 'utf8');
      submissions = JSON.parse(data);
    } catch (error) {
      // If file doesn't exist or is empty, start with empty array
      submissions = [];
    }

    // Add new submission
    submissions.push(formData);

    // Write back to file
    await fs.writeFile('form-submissions.json', JSON.stringify(submissions, null, 2));

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error handling form submission:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 