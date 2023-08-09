
import mongoose from 'mongoose';// este funciona bastante bien

const cartsCollection = 'Carts';

const cartSchema = new mongoose.Schema({
  products: {type:Object, required: true, default:[]}
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel;