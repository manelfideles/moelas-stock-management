const { getDrinkList } = require('../utils')
const { db, storage } = require('../firebase-config');
var express = require('express');
var router = express.Router();

/* GET cocktails listing. */
router.get('/', async (req, res, next) => {
    const snapshot = await db.collection('cocktails').get();
    if (snapshot) {
        let cocktails = snapshot.docs.map((doc) => getDrinkList(doc))
        if (cocktails) { res.status(200).send(cocktails); return; }
    }
    res.status(500).send('Something went wrong.');
});

/* GET specific cocktail */
router.get('/:cocktailName', async (req, res, next) => {
    const cocktailName = req.params.cocktailName;
    const doc = await db.collection('cocktails').doc(cocktailName).get();
    if (!doc.exists) res.status(404).send('That cocktail does not exist!');
    else res.status(200).send(getDrinkList(doc))
});

module.exports = router;