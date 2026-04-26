const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files FIRST
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// SPA fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create uploads folder
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads', { recursive: true });
}

// Multer for photo uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Experiences data
let experiences = [
    {
        id: 1,
        name: "Priya Sharma",
        destination: "Ladakh",
        story: "Breathtaking Himalayan adventure with Hodophile!",
        photo: "https://images.unsplash.com/photo-1571847140472-d097d676ab96?w=400",
        createdAt: new Date().toISOString()
    }
];

// API Routes
app.get('/api/experiences', (req, res) => res.json(experiences));

app.post('/api/experiences', upload.single('photo'), (req, res) => {
    const newExp = {
        id: experiences.length + 1,
        name: req.body.name,
        email: req.body.email || '',
        destination: req.body.destination,
        story: req.body.story,
        photo: req.file ? `/uploads/${req.file.filename}` : '',
        createdAt: new Date().toISOString()
    };
    experiences.unshift(newExp);
    res.json({ success: true, experience: newExp });
});

app.listen(PORT, () => {
    console.log(`🌍 Hodophile LIVE on port ${PORT}`);
});
