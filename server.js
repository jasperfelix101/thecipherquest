const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORTA = 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORTA, () => {
    console.log(`Server running on http://localhost:${PORTA}`);
});

// Sample level data
const levels = [
    {
        image: "https://media.discordapp.net/attachments/1140857387864047637/1298330670883537106/Zodiac-e1608226062664.jpg?ex=67192c29&is=6717daa9&hm=b6e7406d0b4166ef393b3b3a8b5a76d4b44d3069d2e03637a3ce7a085ecd82f1&=&format=webp",
        question: `Level 1: Three wheels spin: 6, 1, 3. Their positions align: 1, 17, 12. Reflect on B, and let A be constant. Can you decipher ttbqe ozyan vtmc `,
        answer: "areyouenjoying"
    },
    {
        image: "https://media.discordapp.net/attachments/1140857387864047637/1298342915352956948/hq720_1.jpg?ex=67193791&is=6717e611&hm=285035505e6e0200bab925bdef02058600dabe00b38cbea47a26f7879b7b4d61&=&format=webp",
        question: `Level 2: Hmm... 
                   <br> <a href="https://forms.gle/jvGC6PEAmkGoGrw16">Fill your level 1 answer here!</a>`,
        answer: "diddy"
    },
    {
        question: `Level 3: 1:1 6:7 4:2 11:5 4:1 8:8 1:1 14:2 3:1 14:7 1:3 .tiiny.site 
                   <br> <a href="https://forms.gle/4V1VXCN6SrxCi6At9">Fill your level 2 answer here!</a>`,
        answer: "5259613"
    },
    {
        question: `Level 4: Told you, anything and everything could be a clue. Guess what? It's right infront of you. 
                   <br> <a href="https://forms.gle/Nia3XUYsYwfoQ9Qf9">Fill your level 3 answer here!</a>`,
        answer: "rossulbricht"
    },
    {
        question: `Level 5: 
                   <br> <a href="https://forms.gle/pNoCeV3BZmdtWEuK9">Fill your level 4 answer here!</a>`,
        answer: "bribe"
    }
];

// Endpoint to get the current level question
app.get('/level/:level', (req, res) => {
    const level = parseInt(req.params.level);

    if (level < levels.length) {
        res.json({
            question: levels[level].question,
            image: levels[level].image || null
        });
    } else {
        res.status(404).json({ message: "No more levels!" });
    }
});

// Endpoint to verify answer
app.post('/check-answer', (req, res) => {
    const { level, answer } = req.body;
    
    if (levels[level] && levels[level].answer.toLowerCase() === answer.toLowerCase()) {
        res.json({ correct: true });
    } else {
        res.json({ correct: false });
    }
});

// Start the server
// const PORTA = process.env.PORTA || 3000;
// app.listen(PORTA, () => {
//     console.log(`Server running on port ${PORTA}`);
// });
