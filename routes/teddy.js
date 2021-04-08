const express = require('express');
const router = express.Router();

const thingCtrl = require('../controllers/thing');
const things = require('../data');

const getThingImageUrl = (req, index) => `${req.protocol}://${req.get('host')}/images/teddy_${index + 1}.jpg`;

const teddiesThings = things.map(thing => ({
    _id: thing._id,
    name: thing.name,
    price: thing.price,
    description: thing.description,
    colors: thing.variants
}))

router.get('/', thingCtrl.getAllThings(teddiesThings, getThingImageUrl));
router.get('/:id', thingCtrl.getOneThing(teddiesThings, getThingImageUrl));
router.post('/order', thingCtrl.orderThings(teddiesThings));

module.exports = router;
