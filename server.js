const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

// Static HTML pages
app.get('/varanasi.html', (req, res) => res.sendFile(path.resolve('varanasi.html')));
app.get('/uttarakhand.html', (req, res) => res.sendFile(path.resolve('uttarakhand.html')));
app.get('/mussoorie.html', (req, res) => res.sendFile(path.resolve('mussoorie.html')));

// Fake API (no file uploads - Vercel compatible)
let experiences = [
    { id: 1, name: "Priya Sharma", destination: "Varanasi", story: "Spiritual experience!", photo: "https://images.unsplash.com/photo-1571847140472-d097d676ab96?w=300" },
    { id: 2, name: "Rahul K.", destination: "Uttarakhand", story: "Char Dham perfect!", photo: "https://images.unsplash.com/photo-1598564133496-77a8ef8898c7?w=300" }
];

app.get('/api/experiences', (req, res) => res.json(experiences));

app.post('/api/experiences', (req, res) => {
    // Fake save (no multer - Vercel readonly)
    const fakeExp = {
        id: experiences.length + 1,
        name: req.body.name || "Anonymous",
        destination: req.body.destination || "Varanasi",
        story: req.body.story || "Great trip!",
        photo: "https://images.unsplash.com/photo-1571847140472-d097d676ab96?w=300"
    };
    experiences.unshift(fakeExp);
    res.json({ success: true });
});

// Fallback
app.get('*', (req, res) => res.sendFile(path.resolve('public/index.html')));

module.exports = app;