const { db, storage } = require('../firebase-config');
var express = require('express');
var router = express.Router();

/* GET cocktails listing. */
router.get('/', async (req, res, next) => {
    const snapshot = await db.collection('cocktails').get();
    let cocktails = snapshot.docs.map((doc) => {
        const drinks = Object
            .entries(doc['_fieldsProto'])
            .map((drink) => { return { 'name': drink[0], 'quantity': drink[1]['integerValue'] } })
        return {
            'name': doc.id,
            'drinks': drinks,
        }
    })
    res.send(cocktails);
});

module.exports = router;