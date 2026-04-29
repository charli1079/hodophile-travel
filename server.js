const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// CREATE UPLOADS FOLDER
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

// SPECIFIC PAGES - IMPORTANT ORDER!
app.get('/varanasi.html', (req, res) => res.sendFile(path.join(__dirname, 'varanasi.html')));
app.get('/uttarakhand.html', (req, res) => res.sendFile(path.join(__dirname, 'uttarakhand.html')));

// API
let experiences = [];
app.get('/api/experiences', (req, res) => res.json(experiences));
app.post('/api/experiences', multer({dest: 'uploads/'}).single('photo'), (req, res) => {
    experiences.unshift({
        name: req.body.name,
        story: req.body.story,
        photo: req.file ? `/uploads/${req.file.filename}` : ''
    });
    res.json({success: true});
});

// FALLBACK LAST
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`Hodophile on port ${PORT}`));