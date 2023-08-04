import mongoose from 'mongoose';

const cartsCollection = 'Carts';

const cartSchema = new mongoose.Schema({
  products: {type:Object, required: true, default:[]}
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel;








