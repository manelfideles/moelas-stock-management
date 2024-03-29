const { db, bucket } = require('../firebase-config');
var express = require('express');
var router = express.Router();
const { getDrinkList } = require('../utils');
const { v4 } = require('uuid');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('Nothing to see here 😎')
});

/* POST create or update drink/cocktail */
/* body = {
  'beverageType': 'drink'|'cocktail',
  'name': 'string'
  'quantity': '1+',
  'imageUrl': ''|'string',
  'drinks': {
    'drinkName1': 'quantity1',
    'drinkName2': 'quantity2',
    ...
  }
} */
router.post('/update', async (req, res, next) => {
  const data = req.body;
  console.log('here: ', data);
  const { beverageType } = data;
  const docRef = db
    .collection(beverageType + 's')
    .doc(data['name']);
  var response;

  if (beverageType == 'drink') {
    response = await docRef.set({
      'quantity': parseInt(data['quantity']),
      'imageUrl': data['imageUrl'] ? data['imageUrl'] : ''
    }, { merge: true })
  }
  else if (beverageType == 'cocktail') {
    data['drinks'].map(async drink => {
      await docRef.set(drink, { merge: true })
    })
  }

  res.status(200).send(
    `Successfully updated your ${beverageType} stock!`
  )

  /* if (response.writeTime) res.status(200).send(
    `Successfully added ${data['name']} to your ${beverageType} stock!`
  )
  else res.status(500).send('Something went wrong!'); */
});

/* POST delete drink/cocktail */
/* body = {
  'beverageType': 'drink'|'cocktail',
  'name': 'string'
}
 */
router.post('/delete', async (req, res, next) => {
  const data = req.body;
  const response = await db
    .collection(data['beverageType'] + 's')
    .doc(data['name'])
    .delete();
  if (response.writeTime) res.status(200).send(
    `Successfully deleted ${data['name']} from the ${data['beverageType']} catalog.`
  )
  else res.status(500).send('Something went wrong!');
})

router.post('/sell', async (req, res, next) => {
  const data = req.body;

  // check name
  const doc = await db
    .collection(data['beverageType'] + 's')
    .doc(data['name'])
    .get();
  if (!doc.exists) res.status(404).send('That cocktail does not exist!')
  // fetch cocktail recipe
  else {
    const drinkList = getDrinkList(doc)['drinks'];
    // check each drink's stock
    let drinkStock = [];
    for (let i = 0; i < drinkList.length; i++) {
      const drink = drinkList[i];
      const drinkInfo = await db
        .collection('drinks')
        .doc(drink['name'])
        .get();
      drinkStock.push({
        'name': drink['name'],
        'quantity': drinkInfo['_fieldsProto']['quantity']['integerValue']
      })
    }

    // decrement
    const hasEnoughStock = (drink, index) => drink['quantity'] - drinkList[index]['quantity'] > 0;
    const cocktailPossible = drinkStock.every(hasEnoughStock)
    // not enough stock to make this cocktail
    if (!cocktailPossible)
      res.status(400).send(
        'You do not have enough drink stock to make this cocktail.'
      )
    else {
      var response;
      drinkList.forEach(async (drink, index) => {
        response = await db
          .collection('drinks')
          .doc(drink['name'])
          .set({ 'quantity': parseInt(drinkStock[index]['quantity']) - drink['quantity'] }, { merge: true })
      })
      if (res.writeTime) res.status(200).send(`Successfully sold one ${data['name']}!`)
      else res.status(500).send('Something went wrong!');
    }
  }
})

module.exports = router;
