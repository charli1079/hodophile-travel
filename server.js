const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Specific pages FIRST
app.get('/varanasi.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'varanasi.html'));
// Add AFTER varanasi.html route:
app.get('/uttarakhand.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'uttarakhand.html'));
});

});

// API Routes
let experiences = [{id:1,name:"Priya",destination:"Varanasi",story:"Amazing!",createdAt:new Date().toISOString()}];

app.get('/api/experiences', (req, res) => res.json(experiences));
app.post('/api/experiences', multer({dest:'uploads/'}).single('photo'), (req, res) => {
    experiences.unshift({name:req.body.name,destination:req.body.destination,story:req.body.story});
    res.json({success:true});
});

// Create uploads
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

// SPA fallback LAST (only client routes)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`🌍 Hodophile on ${PORT}`));