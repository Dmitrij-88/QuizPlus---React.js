const admin = require('firebase-admin');
const db = require('../firebaseConfig');

// Signup
exports.signupUser = async (req, res) => {
  const { email, password, fName, surname } = req.body;
  
  try {
    // Create user with Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: `${fName} ${surname}`,
    });

    // Save additional user information in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      fName,
      surname,
      email,
    });

    // Generate a custom token
    const token = await admin.auth().createCustomToken(userRecord.uid);

    // Send back the token and user data
    res.status(201).json({ token, uid: userRecord.uid, email: userRecord.email, fName, surname });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Firebase Auth does not provide a login endpoint. Use Firebase client SDK for login.
    res.status(400).json({ error: 'Use Firebase client SDK for login' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
