const express = require('express');
const router = express.Router();

const thingCtrl = require('../controllers/thing');
const things = require('../data');

const getThingImageUrl = (req, index) => `${req.protocol}://${req.get('host')}/images/oak_${index + 1}.jpg`;

const furnitureThings = things.map(thing => ({
    id: 'a',
    name: 'Bidule A',
    price: 15000,
    description: 'Un bidule très utile pour faire des trucs',
    varnish: thing.variants
}))

router.get('/', thingCtrl.getAllThings(furnitureThings, getThingImageUrl));
router.get('/:id', thingCtrl.getOneThing(furnitureThings, getThingImageUrl));
router.post('/order', thingCtrl.orderThings(furnitureThings));

module.exports = router;
