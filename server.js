const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Static files FIRST (CSS/JS/images)
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Specific HTML pages
app.get('/', (req, res) => res.sendFile(path.resolve('public/index.html')));
app.get('/varanasi.html', (req, res) => res.sendFile(path.resolve('varanasi.html')));
app.get('/uttarakhand.html', (req, res) => res.sendFile(path.resolve('uttarakhand.html')));
app.get('/mussoorie.html', (req, res) => res.sendFile(path.resolve('mussoorie.html')));

// Fake API
let experiences = [
    { id: 1, name: "Priya", destination: "Varanasi", story: "Ganga Aarti magic!", photo: "https://images.unsplash.com/photo-1571847140472-d097d676ab96?w=300" }
];

app.get('/api/experiences', (req, res) => res.json(experiences));
app.post('/api/experiences', (req, res) => {
    experiences.unshift({
        id: experiences.length + 1,
        name: req.body.name || "Guest",
        story: req.body.story || "Amazing!",
        photo: "https://images.unsplash.com/photo-1571847140472-d097d676ab96?w=300"
    });
    res.json({ success: true });
});

// 404 for other routes
app.use((req, res) => res.status(404).send('Page not found'));

module.exports = app;