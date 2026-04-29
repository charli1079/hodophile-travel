const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

// Vercel middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Specific HTML pages
app.get('/varanasi.html', (req, res) => res.sendFile(path.resolve('varanasi.html')));
app.get('/uttarakhand.html', (req, res) => res.sendFile(path.resolve('uttarakhand.html')));
app.get('/mussoorie.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'mussoorie.html'));
});

// Multer uploads
const upload = multer({ dest: 'uploads/' });

// API - Experiences
let experiences = [
    { id: 1, name: "Priya Sharma", destination: "Varanasi", story: "Spiritual bliss!", photo: "" }
];

app.get('/api/experiences', (req, res) => res.json(experiences));

app.post('/api/experiences', upload.single('photo'), (req, res) => {
    const newExp = {
        id: experiences.length + 1,
        name: req.body.name,
        destination: req.body.destination,
        story: req.body.story,
        photo: req.file ? `/uploads/${req.file.filename}` : ''
    };
    experiences.unshift(newExp);
    res.json({ success: true });
});

// Fallback to index
app.get('*', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});

module.exports = app;