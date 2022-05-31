// secret key
const serviceAccount = require('./moelas-stock-management-firebase-adminsdk-rmdzn-87be9f3353.json');

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');


const app = initializeApp({
    credential: cert(serviceAccount),
});

module.exports.db = getFirestore(app);
module.exports.storage = getStorage(app);