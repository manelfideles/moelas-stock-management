// secret key
const serviceAccount = require('your-firebase-key-here.json');

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');


const app = initializeApp({
    credential: cert(serviceAccount),
    storageBucket: 'moelas-stock-management.appspot.com'
});

const storage = getStorage(app);

module.exports.db = getFirestore(app);
module.exports.bucket = storage.bucket();
