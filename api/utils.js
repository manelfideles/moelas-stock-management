function getDrinkList(doc) {
    const drinks = Object
        .entries(doc['_fieldsProto'])
        .map((drink) => { return { 'name': drink[0], 'quantity': drink[1]['integerValue'] } })
    return {
        'name': doc.id,
        'drinks': drinks,
    }
}

exports.getDrinkList = getDrinkList;