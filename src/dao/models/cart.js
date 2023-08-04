

import mongoose from 'mongoose';
import productModel from '../models/product.js'; 

const cartsCollection = 'Carts';

const cartSchema = new mongoose.Schema({
  products: [productModel.schema], 
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel;




// import mongoose from 'mongoose'; este funciona bastante bien

// const cartsCollection = 'Carts';

// const cartSchema = new mongoose.Schema({
//   products: {type:Object, required: true, default:[]}
// });

// const cartModel = mongoose.model(cartsCollection, cartSchema);

// export default cartModel;








