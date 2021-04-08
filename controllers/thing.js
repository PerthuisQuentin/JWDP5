const uuid = require('uuid/v1');

exports.getAllThings = (things, getThingImageUrl) => (req, res) => {
 
  res.status(200).json(things.map((thing, index) => ({
    ...thing,
    imageUrl: getThingImageUrl(req, index),
  })));
  
};

exports.getOneThing = (things, getThingImageUrl) => (req, res) => {
  const thingIndex = things.findIndex(thing => thing._id === req.params.id);

  if (thingIndex === -1) return res.status(404).send(new Error('Thing not found!'));

  res.status(200).json({
    ...things[thingIndex],
    imageUrl: getThingImageUrl(req, thingIndex),
  });
};

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */
exports.orderThings = things => (req, res) => {
  if (!req.body.contact ||
      !req.body.contact.firstName ||
      !req.body.contact.lastName ||
      !req.body.contact.address ||
      !req.body.contact.city ||
      !req.body.contact.email ||
      !req.body.products ) {
    return res.status(400).send(new Error('Bad request!'));
  }

  if (!Array.isArray(req.body.products) || req.body.products.length === 0) res.status(400).send(new Error('products must be an array of product _id'));

  const missingThing = req.body.products.find(productId => !things.find(thing => thing._id === productId));
  
  if (missingThing) return res.status(400).json(new Error(`Bad request, thing not found: ${missingThing._id}`));

  return res.status(201).json({
    contact: req.body.contact,
    products: req.body.products.map(id => things.find(thing =>thing._id === id)),
    orderId:  uuid()
  });
};
