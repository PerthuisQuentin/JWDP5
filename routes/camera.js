const express = require('express');
const router = express.Router();

const thingCtrl = require('../controllers/thing');
const things = require('../data');

const getThingImageUrl = (req, index) => `${req.protocol}://${req.get('host')}/images/vcam_${index + 1}.jpg`;

const cameraThings = things.map(thing => ({
    _id: thing._id,
    name: thing.name,
    price: thing.price,
    description: thing.description,
    lenses: thing.variants
}))

router.get('/', thingCtrl.getAllThings(cameraThings, getThingImageUrl));
router.get('/:id', thingCtrl.getOneThing(cameraThings, getThingImageUrl));
router.post('/order', thingCtrl.orderThings(cameraThings));

module.exports = router;
