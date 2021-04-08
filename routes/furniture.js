const express = require('express');
const router = express.Router();

const thingCtrl = require('../controllers/thing');
const things = require('../data');

const getThingImageUrl = (req, index) => `${req.protocol}://${req.get('host')}/images/oak_${index + 1}.jpg`;

const furnitureThings = things.map(thing => ({
    _id: thing._id,
    name: thing.name,
    price: thing.price,
    description: thing.description,
    varnish: thing.variants
}))

router.get('/', thingCtrl.getAllThings(furnitureThings, getThingImageUrl));
router.get('/:id', thingCtrl.getOneThing(furnitureThings, getThingImageUrl));
router.post('/order', thingCtrl.orderThings(furnitureThings));

module.exports = router;
