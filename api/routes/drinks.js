const { db, storage } = require('../firebase-config');
var express = require('express');
const { app } = require('firebase-admin');
var router = express.Router();

/* GET drinks listing. */
router.get('/', async (req, res, next) => {
  const snapshot = await db.collection('drinks').get();
  // console.log(snapshot.docs);
  let drinks = snapshot.docs.map((doc) => {
    // console.log(doc.id, doc['_fieldsProto']);
    return {
      'name': doc.id,
      'quantity': doc['_fieldsProto']['quantity']['integerValue'],
      'imageUrl': doc['_fieldsProto']['imageUrl']['stringValue']
    }
  })
  res.send(drinks);
});

module.exports = router;

