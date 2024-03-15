const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();

router.post('/', async (req, res) => {
    const quiz = new Quiz(req.body);
    try {
        const savedQuiz = await quiz.save();
        res.status(201).json(savedQuiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:quizId', async (req, res) => {
    console.log("")
    console.log("shdb")
    const { quizId } = req.params; 
    console.log(quizId)

    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            // If the quiz with the specified ID was not found, return a 404 Not Found response
            return res.status(404).json({ message: "Quiz not found" });
        }
        // If the quiz is found, return it in the response
        res.json(quiz);
    } catch (error) {
        console.log(error);
        // If there's an error during the database operation, return a 500 Internal Server Error response
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
