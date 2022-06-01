const { db, storage } = require('../firebase-config');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('Nothing to see here 😎')
});

/* POST new drink or cocktail */
/* body = {
  'beverageType': 'drink'|'cocktail',
  'quantity': '1+'|'0',
  'imageUrl': ''|'string',
  'drinks': []|[{...}, {...}]
} */
router.post('/update', async (req, res, next) => {
  const data = req.body;
  const { beverageType } = data;
  const docRef = db
    .collection(beverageType + 's')
    .doc(data['name']);
  let response;

  if (beverageType == 'drink')
    response = await docRef.set({
      'quantity': parseInt(data['quantity']),
      'imageUrl': data['imageUrl'],
    })
  else if (beverageType == 'cocktail')
    response = await docRef.set(data['drinks'])

  if (response.writeTime) res.status(200).send(
    `Successfully added ${data['name']} to your ${beverageType} stock!`
  )
  else res.status(500).send('Something went wrong!');
});

// @TODO
router.post('/delete', async (req, res, next) => {
  res.status(200).send('Did absolutely nothing! 😁');
})

module.exports = router;
