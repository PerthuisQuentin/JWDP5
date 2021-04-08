const express = require('express');
const router = express.Router();

const thingCtrl = require('../controllers/thing');
const things = require('../data');

const getThingImageUrl = (req, index) => `${req.protocol}://${req.get('host')}/images/teddy_${index + 1}.jpg`;

const teddiesThings = things.map(thing => ({
    id: 'a',
    name: 'Bidule A',
    price: 15000,
    description: 'Un bidule très utile pour faire des trucs',
    colors: thing.variants
}))

router.get('/', thingCtrl.getAllThings(teddiesThings, getThingImageUrl));
router.get('/:id', thingCtrl.getOneThing(teddiesThings, getThingImageUrl));
router.post('/order', thingCtrl.orderThings(teddiesThings));

module.exports = router;
