const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');

router.post('/submit/:quizId', async (req, res) => {
    console.log("Quiz result");
    const { answers, userId } = req.body;
    console.log("quiz2"); // Include userId in the request body
    const { quizId } = req.params;
     console.log(quizId);
    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
  console.log("1");
        let score = 0;
        answers.forEach(answer => {
            const question = quiz.questions.id(answer.questionId);
            if (question) {
                const correctOption = question.answerOptions.find(option => option.isCorrect === true);
                if (correctOption && correctOption._id.toString() === answer.answerGiven) {
                    score++; // Increment score for each correct answer
                }
            }
        });
        console.log("3");
        // Create a QuizResult associated with the user
        const result = await QuizResult.create({
            quiz: quizId,
            user: userId, // Associate the result with the user
            answers,
            score,
        });
        console.log("3");
        res.status(201).json({ score, resultId: result._id, message: "Quiz submitted successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
