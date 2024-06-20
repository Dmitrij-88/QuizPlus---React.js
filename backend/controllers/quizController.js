const db = require('../firebaseConfig');


// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizCollectionRef = db.collection('quizzes');
    const snapshot = await quizCollectionRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No quizzes found' });
    }

    const quizzes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error getting quizzes:', error);
    res.status(500).json({ error: 'Failed to get quizzes' });
  }
};

exports.getQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await db.collection('quizzes').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

// Create a new quiz
exports.createQuiz = async (req, res) => {
  const { questions } = req.body;

  // Validate request data
  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: 'Questions are required.' });
  }

  try {
    const newQuizRef = await db.collection('quizzes').add({ questions, createdAt: new Date() });
    const newQuizSnapshot = await newQuizRef.get();
    const newQuizData = newQuizSnapshot.data();

    res.status(201).json({ id: newQuizRef.id, ...newQuizData });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

// Update a quiz
exports.updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { title, questions } = req.body;

  if (!Array.isArray(questions)) {
    return res.status(400).json({ error: 'Questions are required.' });
  }

  try {
    const quizRef = db.collection('quizzes').doc(id);
    const updatedQuiz = await quizRef.get();

    if (!updatedQuiz.exists) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    await quizRef.update({ title, questions, updatedAt: new Date() });
    const updatedQuizData = (await quizRef.get()).data();

    res.status(200).json({ id: quizRef.id, ...updatedQuizData });
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ error: 'Failed to update quiz' });
  }
};

// Delete a quiz
exports.deleteQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    const quizRef = db.collection('quizzes').doc(id);
    const quiz = await quizRef.get();

    if (!quiz.exists) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    await quizRef.delete();
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};