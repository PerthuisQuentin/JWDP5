const express = require('express');
const router = express.Router();

const thingCtrl = require('../controllers/thing');
const things = require('../data');

const getThingImageUrl = (req, index) => `${req.protocol}://${req.get('host')}/images/vcam_${index + 1}.jpg`;

const cameraThings = things.map(thing => ({
    id: 'a',
    name: 'Bidule A',
    price: 15000,
    description: 'Un bidule très utile pour faire des trucs',
    lenses: thing.variants
}))

router.get('/', thingCtrl.getAllThings(cameraThings, getThingImageUrl));
router.get('/:id', thingCtrl.getOneThing(cameraThings, getThingImageUrl));
router.post('/order', thingCtrl.orderThings(cameraThings));

module.exports = router;
