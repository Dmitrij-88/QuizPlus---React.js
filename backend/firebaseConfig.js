const admin = require('firebase-admin');
const serviceAccount = require('../cs363-group1-project-firebase-adminsdk-vzt0b-350051f937.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
