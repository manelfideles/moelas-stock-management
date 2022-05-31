const { db, storage } = require('../firebase-config');
var express = require('express');
const { app } = require('firebase-admin');
var router = express.Router();

const INTEGER = 'integerValue';
const STRING = 'stringValue';

function getJsonParam(json, paramName, paramType) {
  return json['_fieldsProto'][`${paramName}`][`${paramType}`];
}

/* GET drinks listing. */
router.get('/', async (req, res, next) => {
  const snapshot = await db.collection('drinks').get();
  let drinks = snapshot.docs.map((doc) => {
    return {
      'name': doc.id,
      'quantity': getJsonParam(doc, 'quantity', INTEGER),
      'imageUrl': getJsonParam(doc, 'imageUrl', STRING)
    }
  })
  res.status(200).send(drinks);
});

/* GET specific drink */
router.get('/:drinkName', async (req, res, next) => {
  const drinkName = req.params.drinkName;
  const snapshot = await db.collection('drinks').get();
  let drink = snapshot.docs.find((doc) => doc.id.toLowerCase() == drinkName.toLowerCase())
  if (drink)
    res.status(200).send({
      'name': drinkName,
      'quantity': getJsonParam(drink, 'quantity', INTEGER),
      'imageUrl': getJsonParam(drink, 'imageUrl', STRING),
    });
  else res.status(404).send('That drink does not exist!');
});

module.exports = router;

