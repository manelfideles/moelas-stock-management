const { db, storage } = require('../firebase-config');
var express = require('express');
var router = express.Router();

/* GET drinks listing. */
router.get('/', async (req, res, next) => {
  const snapshot = await db.collection('drinks').get();
  // console.log(snapshot.docs);
  let drinks = snapshot.docs.map((doc) => {
    return {
      'name': doc.id,
      'quantity': doc['_fieldsProto']['quantity']['integerValue'],
      'imageUrl': doc['_fieldsProto']['image_url']['stringValue']
    }
  })
  res.send(drinks);
});

module.exports = router;

