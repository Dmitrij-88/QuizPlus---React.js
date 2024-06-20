const express = require('express');
const { getAllQuizzes, getQuiz, createQuiz, updateQuiz, deleteQuiz } = require('../controllers/quizController');

const router = express.Router();

router.get('/getAll', getAllQuizzes);
router.get('/:id', getQuiz);
router.post('/createQuiz', createQuiz);
router.patch('/update/:id', updateQuiz);
router.delete('/:id', deleteQuiz);

module.exports = router;
